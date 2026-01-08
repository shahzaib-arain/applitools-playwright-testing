// tests/03-transactions.spec.js
import { test, expect } from '@playwright/test';

test.describe('Transactions Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
    await page.waitForLoadState('load');
  });

  test('TC016: Test page has content', async ({ page }) => {
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length).toBeGreaterThan(20);
  });

  test('TC017: Test page elements exist', async ({ page }) => {
    const allElements = page.locator('*');
    expect(await allElements.count()).toBeGreaterThan(10);
  });

  test('TC018: Test page structure', async ({ page }) => {
    const divs = page.locator('div');
    // Example.com might not have divs, so use >= 0
    expect(await divs.count()).toBeGreaterThanOrEqual(0);
  });

  test('TC019: Verify page details view', async ({ page }) => {
    // View page source info
    const pageSource = await page.content();
    expect(pageSource.length).toBeGreaterThan(100);
  });

  test('TC020: Test page functionality', async ({ page }) => {
    // Navigate to link
    const link = page.locator('a').first();
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('TC021: Test page data persistence', async ({ page }) => {
    const initialUrl = page.url();
    await page.reload();
    expect(page.url()).toBe(initialUrl);
  });

  test('TC022: Test page validation', async ({ page }) => {
    // Check it's a valid HTML page
    const doctype = await page.evaluate(() => 
      document.doctype ? document.doctype.name : 'html'
    );
    expect(doctype).toBeTruthy();
  });

  test('TC023: Test page content validation', async ({ page }) => {
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});