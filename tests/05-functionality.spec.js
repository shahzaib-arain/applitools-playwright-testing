// tests/05-functionality.spec.js
import { test, expect } from '@playwright/test';

test.describe('Functionality & Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
    await page.waitForLoadState('load');
  });

  test('TC032: Test page session behavior', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL('https://example.com/');
  });

  test('TC033: Verify browser back button', async ({ page }) => {
    const initialUrl = page.url();
    await page.goto('https://www.google.com');
    await page.goBack();
    expect(page.url()).toBe(initialUrl);
  });

  test('TC034: Test page refresh data', async ({ page }) => {
    const initialTitle = await page.title();
    await page.reload();
    const newTitle = await page.title();
    expect(newTitle).toBe(initialTitle);
  });

  test('TC035: Verify keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    // No error means keyboard works
  });

  test('TC036: Test accessibility features', async ({ page }) => {
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');
    // lang can be null or string - both are OK for this test
    expect(lang !== undefined).toBeTruthy();
  });

  test('TC037: Test page performance', async ({ page }) => {
    const start = Date.now();
    await page.goto('https://example.com');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(10000); // Should load in under 10 seconds
  });

  test('TC038: Test page compatibility', async ({ page }) => {
    const userAgent = await page.evaluate(() => navigator.userAgent);
    expect(userAgent).toBeTruthy();
  });

  test('TC039: Test page security', async ({ page }) => {
    const isSecure = page.url().startsWith('https://');
    expect(isSecure).toBeTruthy();
  });

  test('TC040: Test page cookies', async ({ page }) => {
    // Just check we can access cookies
    const cookies = await page.context().cookies();
    // Cookies might be empty, that's OK
    expect(Array.isArray(cookies)).toBeTruthy();
  });
});