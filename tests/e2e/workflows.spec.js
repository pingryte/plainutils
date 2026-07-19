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
  await page.getByRole('button', { name: 'Clean and sort text lines' }).click();
  await page.getByRole('button', { name: 'Run pipeline' }).click();
  await expect(page.getByLabel('Final output')).toHaveValue('apple\nbanana\npear');
  await expect(page.getByText('Preview step output').first()).toBeVisible();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText('Workflow saved on this device')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clean and sort text lines', exact: true }).last()).toBeVisible();
});

test('workflow share links contain steps but exclude private input', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/workspace');
  await page.getByRole('button', { name: 'Clean and sort text lines' }).click();
  await page.getByRole('button', { name: 'Copy share link' }).click();
  await expect(page.getByText('Private workflow link copied')).toBeVisible();
  const sharedUrl = page.url();
  expect(sharedUrl).toContain('#workflow=');
  expect(sharedUrl).not.toContain('pear');
  const recipient = await context.newPage();
  await recipient.goto(sharedUrl);
  await expect(recipient.getByText('Shared workflow loaded')).toBeVisible();
  await expect(recipient.getByLabel('Workflow name')).toHaveValue('Clean and sort text lines');
  await expect(recipient.getByLabel('Pipeline input')).toHaveValue('');
  await expect(recipient.getByLabel('Transformation 3')).toHaveValue('sort-lines');
});

test('malformed workflow links fail safely', async ({ page }) => {
  await page.goto('/workspace#workflow=not-valid-base64');
  await expect(page.getByText('The shared workflow link is malformed or incomplete.')).toBeVisible();
  await expect(page.getByLabel('Pipeline input')).toHaveValue('');
});

test('workflow gallery filters recipes and opens an example', async ({ page }) => {
  await page.goto('/workflows');
  await expect(page.getByRole('heading', { name: 'Workflow Recipes' })).toBeVisible();
  await page.getByPlaceholder('Search recipes by task or format…').fill('JWT');
  await expect(page.getByRole('link', { name: 'Inspect a JWT payload' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Clean and encode JSON' })).toHaveCount(0);
  await page.getByRole('link', { name: 'Inspect a JWT payload' }).click();
  await expect(page).toHaveURL(/\/workflows\/inspect-jwt-payload$/);
  await page.getByRole('button', { name: 'Open in Workspace' }).click();
  await expect(page).toHaveURL(/\/workspace#workflow=/);
  await expect(page.getByText('Shared workflow loaded')).toBeVisible();
  await expect(page.getByLabel('Pipeline input')).toHaveValue(/eyJhbGci/);
});

test('CSV viewer parses, filters, sorts, and converts quoted data', async ({ page }) => {
  await page.goto('/tools/csv-viewer');
  await page.getByLabel('CSV or TSV input').fill('name,notes,score\nAda,"Uses commas, safely",10\nGrace,"Line one\nLine two",9');
  await page.getByRole('button', { name: 'Parse data' }).click();
  await expect(page.getByRole('table', { name: 'CSV data preview' })).toContainText('Uses commas, safely');
  await page.getByLabel('Filter all visible columns').fill('Grace');
  await expect(page.getByRole('table', { name: 'CSV data preview' })).toContainText('Line one');
  await expect(page.getByRole('table', { name: 'CSV data preview' })).not.toContainText('Ada');
  await page.getByRole('button', { name: 'Sort by score' }).click();
  await page.getByRole('button', { name: 'Create JSON' }).click();
  await expect(page.getByLabel('Conversion output')).toHaveValue(/"name": "Grace"/);
});

test('Markdown Studio renders GFM, builds a TOC, and sanitizes HTML', async ({ page }) => {
  await page.goto('/tools/markdown-preview');
  await page.getByRole('textbox', { name: 'Markdown', exact: true }).fill('# Safe title\n\n| Name | Value |\n| --- | --- |\n| Tool | Works |\n\n<img src=x onerror="window.__unsafe=true"><script>window.__unsafe=true</script>');
  await expect(page.getByLabel('Rendered Markdown preview').getByRole('heading', { name: 'Safe title' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Generated table of contents' }).getByRole('link', { name: 'Safe title' })).toBeVisible();
  await expect(page.getByLabel('Rendered Markdown preview').getByRole('table')).toContainText('Works');
  expect(await page.getByLabel('Rendered Markdown preview').evaluate((element) => element.innerHTML)).not.toMatch(/onerror|script/i);
  expect(await page.evaluate(() => window.__unsafe)).toBeUndefined();
});

test('Markdown Studio replaces literal text and recovers its local draft', async ({ page }) => {
  await page.goto('/tools/markdown-preview');
  await page.getByRole('textbox', { name: 'Markdown', exact: true }).fill('Hello [name]. Hello [name].');
  await page.getByLabel(/Find/).fill('[name]');
  await page.getByLabel('Replace with').fill('Ada');
  await page.getByRole('button', { name: 'Replace all' }).click();
  await expect(page.getByRole('textbox', { name: 'Markdown', exact: true })).toHaveValue('Hello Ada. Hello Ada.');
  await expect(page.getByText('Draft saved on this device')).toBeVisible();
  await page.reload();
  await expect(page.getByRole('textbox', { name: 'Markdown', exact: true })).toHaveValue('Hello Ada. Hello Ada.');
});

for (const route of ['/', '/about', '/privacy', '/contact', '/tools', '/workflows', '/workflows/clean-encode-json', '/workspace', '/tools/json-formatter', '/tools/csv-viewer', '/tools/markdown-preview']) {
  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
    expect(results.violations.filter((item) => ['critical', 'serious'].includes(item.impact))).toEqual([]);
  });
}
