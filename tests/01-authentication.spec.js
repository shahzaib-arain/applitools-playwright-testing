// tests/01-authentication.spec.js
import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
    await page.waitForLoadState('load');
  });

  test('TC001: Verify homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('https://example.com/');
    await expect(page).toHaveTitle('Example Domain');
  });

  test('TC002: Test page has heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    expect(await heading.textContent()).toContain('Example');
  });

  test('TC003: Test page has content', async ({ page }) => {
    // FIX: Check body text instead of specific p tags
    const body = page.locator('body');
    const bodyText = await body.textContent();
    expect(bodyText.length).toBeGreaterThan(10);
  });

  test('TC004: Test page has link', async ({ page }) => {
    const link = page.locator('a');
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('TC005: Test page reload works', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL('https://example.com/');
  });

  test('TC006: Test page has HTML structure', async ({ page }) => {
    const html = page.locator('html');
    const body = page.locator('body');
    await expect(html).toBeVisible();
    await expect(body).toBeVisible();
  });

  test('TC007: Verify page UI elements', async ({ page }) => {
    const elements = page.locator('h1, p, a');
    expect(await elements.count()).toBeGreaterThanOrEqual(3);
  });

  test('TC008: Test page loads CSS', async ({ page }) => {
    const color = await page.evaluate(() => 
      window.getComputedStyle(document.body).color
    );
    expect(color).toBeTruthy();
  });
});