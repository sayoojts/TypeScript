import { chromium } from '@playwright/test';
import fs from 'fs';

const AUTH_FILE = 'auth.json';
const USER_DATA_DIR = './user-data'; // Stores session data

async function globalSetup() {
  if (fs.existsSync(AUTH_FILE)) {
    console.log('✅ auth.json exists. Browser session will continue.');
    return;
  }

  console.log('🔄 Launching browser for authentication...');
  const browser = await chromium.launchPersistentContext(USER_DATA_DIR, { headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.ups.com', { waitUntil: 'load' });

  // Perform login steps here if required

  await page.context().storageState({ path: AUTH_FILE }); // Save session state
  console.log('✅ Authentication state saved. Browser will remain open.');

  // Don't close the browser to allow tests to continue from this session
}

export default globalSetup;
