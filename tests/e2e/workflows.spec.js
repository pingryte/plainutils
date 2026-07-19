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

test('workflow presets can be run, previewed, and saved locally', async ({ page }) => {
  await page.goto('/workspace');
  await page.getByRole('button', { name: 'Clean and sort lines' }).click();
  await page.getByRole('button', { name: 'Run pipeline' }).click();
  await expect(page.getByLabel('Final output')).toHaveValue('apple\nbanana\npear');
  await expect(page.getByText('Preview step output').first()).toBeVisible();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText('Workflow saved on this device')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clean and sort lines', exact: true }).last()).toBeVisible();
});

test('workflow share links contain steps but exclude private input', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/workspace');
  await page.getByRole('button', { name: 'Clean and sort lines' }).click();
  await page.getByRole('button', { name: 'Copy share link' }).click();
  await expect(page.getByText('Private workflow link copied')).toBeVisible();
  const sharedUrl = page.url();
  expect(sharedUrl).toContain('#workflow=');
  expect(sharedUrl).not.toContain('pear');
  const recipient = await context.newPage();
  await recipient.goto(sharedUrl);
  await expect(recipient.getByText('Shared workflow loaded')).toBeVisible();
  await expect(recipient.getByLabel('Workflow name')).toHaveValue('Clean and sort lines');
  await expect(recipient.getByLabel('Pipeline input')).toHaveValue('');
  await expect(recipient.getByLabel('Transformation 3')).toHaveValue('sort-lines');
});

test('malformed workflow links fail safely', async ({ page }) => {
  await page.goto('/workspace#workflow=not-valid-base64');
  await expect(page.getByText('The shared workflow link is malformed or incomplete.')).toBeVisible();
  await expect(page.getByLabel('Pipeline input')).toHaveValue('');
});

for (const route of ['/', '/tools', '/workspace', '/tools/json-formatter']) {
  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
    expect(results.violations.filter((item) => ['critical', 'serious'].includes(item.impact))).toEqual([]);
  });
}
