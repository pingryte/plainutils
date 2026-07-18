import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('command palette opens from the keyboard and navigates', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Search tools, Command K' })).toBeVisible();
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
  await expect(page.getByRole('dialog', { name: 'Find a tool' })).toBeVisible();
  await page.getByPlaceholder('Search tools or workflows…').fill('JSON Formatter');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/tools\/json-formatter$/);
});

test('JSON formatter renders a collapsible tree', async ({ page }) => {
  await page.goto('/tools/json-formatter');
  await page.getByLabel('Input JSON').fill('{"person":{"name":"Ada"},"active":true}');
  await page.getByRole('button', { name: 'Format', exact: true }).click();
  await page.getByRole('button', { name: 'Tree', exact: true }).click();
  await expect(page.getByLabel('JSON tree')).toContainText('Ada');
});

test('pipeline chains transformations', async ({ page }) => {
  await page.goto('/workspace');
  await page.getByLabel('Pipeline input').fill('{"hello":"world"}');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByLabel('Transformation 1').selectOption('json-format');
  await page.getByRole('button', { name: 'Run pipeline' }).click();
  await expect(page.getByLabel('Final output')).toHaveValue(/\n  "hello": "world"\n/);
});

for (const route of ['/', '/tools', '/workspace', '/tools/json-formatter']) {
  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
    expect(results.violations.filter((item) => ['critical', 'serious'].includes(item.impact))).toEqual([]);
  });
}
