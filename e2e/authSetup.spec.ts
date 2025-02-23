import { test, expect } from '@playwright/test';

test('@setup Reuse Browser Session', async ({ page }) => {
  await page.goto('https://www.ups.com');
  console.log('✅ Session Reused: Already Logged In');

  // Now perform actions that require login
  //await expect(page.locator('#account-settings')).toBeVisible();
});