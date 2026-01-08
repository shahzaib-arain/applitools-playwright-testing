// tests/02-dashboard.spec.js
import { test, expect } from '@playwright/test';

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
    await page.waitForLoadState('load');
  });

  test('TC009: Verify page loads after navigation', async ({ page }) => {
    await expect(page).toHaveURL('https://example.com/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('TC010: Check page content is displayed', async ({ page }) => {
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(10);
  });

  test('TC011: Verify page has elements', async ({ page }) => {
    const elements = page.locator('*');
    expect(await elements.count()).toBeGreaterThan(5);
  });

  test('TC012: Test page navigation elements', async ({ page }) => {
    const links = page.locator('a[href]');
    expect(await links.count()).toBeGreaterThan(0);
  });

  test('TC013: Verify page layout exists', async ({ page }) => {
    const hasHeader = await page.locator('h1').count() > 0;
    const hasContent = await page.locator('p').count() > 0;
    expect(hasHeader && hasContent).toBeTruthy();
  });

  test('TC014: Test page is functional', async ({ page }) => {
    // Click on the page
    await page.click('body');
    // If no error, page is functional
    await expect(page).toHaveURL('https://example.com/');
  });

  test('TC015: Verify page summary elements', async ({ page }) => {
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const paragraphs = page.locator('p');
    
    expect(await headings.count()).toBeGreaterThan(0);
    expect(await paragraphs.count()).toBeGreaterThan(0);
  });
});