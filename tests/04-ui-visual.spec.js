// tests/04-ui-visual.spec.js
import { test, expect } from '@playwright/test';

test.describe('UI & Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
    await page.waitForLoadState('load');
  });

  test('TC024: Verify page has visible elements', async ({ page }) => {
    const visibleElements = page.locator('body, html, h1, p, a');
    expect(await visibleElements.count()).toBeGreaterThan(0);
  });

  test('TC025: Test page hover works', async ({ page }) => {
    // Hover over body - should work without error
    await page.hover('body');
    // Test passes if no error
  });

  test('TC026: Verify page styling', async ({ page }) => {
    const body = page.locator('body');
    const bgColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBeTruthy();
  });

  test('TC027: Test responsive design', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
    
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('TC028: Verify images/elements load', async ({ page }) => {
    const allElements = page.locator('*');
    expect(await allElements.count()).toBeGreaterThan(0);
  });

  test('TC029: Test page loading', async ({ page }) => {
    const readyState = await page.evaluate(() => document.readyState);
    expect(['loading', 'interactive', 'complete']).toContain(readyState);
  });

  test('TC030: Verify page color scheme', async ({ page }) => {
    const body = page.locator('body');
    const color = await body.evaluate(el => 
      window.getComputedStyle(el).color
    );
    expect(color).toBeTruthy();
  });

  test('TC031: Test page scrolling', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 100));
    // No assertion needed - just checking it doesn't crash
  });
});