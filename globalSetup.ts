import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: false });

  // Create a new browser context
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    permissions: ['geolocation'],
    timezoneId: 'America/Los_Angeles',
    locale: 'en-US',
  });

  const page = await context.newPage();
  await page.goto('https://www.ups.com', { waitUntil: 'load' });

  console.log('✅ Browser opened and navigated to UPS website.');

  // Wait for manual login (optional, if login is required)
  await page.waitForTimeout(10000); // Adjust as needed

  // Save authentication state for reuse
  await context.storageState({ path: 'auth.json' });
  console.log('✅ Authentication state saved to auth.json');

  await browser.close();
}

export default globalSetup;
