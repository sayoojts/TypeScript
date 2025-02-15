import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    permissions: ['geolocation'],
    timezoneId: 'America/Los_Angeles',
    locale: 'en-US',
  });
  page = await context.newPage();
});

test.afterAll(async () => {
  await browser.close();
});

test('@setup Open Browser, Handle Cookies, and Log In', async () => {
  await page.goto('https://www.ups.com', { waitUntil: 'load' });
  console.log('✅ Browser opened and navigated to UPS website.');
  await page.waitForTimeout(5000);
});

test('Sign Up Process', async () => {
  await page.goto('https://www.ups.com');
  console.log('✅ Browser opened and navigated to UPS website.');

  // Handle the cookie consent pop-up
  try {
    await page.waitForSelector('.privacy_prompt_content', { timeout: 5000 });
    await page.click('label[for="privacy_pref_optout"]');
    await page.waitForSelector('#consent_prompt_submit:not([disabled])', { timeout: 5000 });
    await page.click('#consent_prompt_submit');
    console.log('✅ Cookie consent handled.');
  } catch {
    console.log('⚠️ No cookie consent pop-up detected.');
  }

  // Navigate to Log In page
  await page.waitForTimeout(5000);
  try {
    await page.waitForSelector('text=Log In', { timeout: 5000 });
    await page.click('text=Log In');
    console.log('✅ Clicked on "Log In".');

    // Wait for and click the "Sign Up" link
    await page.waitForTimeout(5000);
    await page.waitForSelector('a.ups-link:has-text("Sign up")', { timeout: 5000 });
    await page.click('a.ups-link:has-text("Sign up")');
    console.log('✅ Clicked on "Sign up".');
  } catch (error) {
    console.log('⚠️ "Log In" or "Sign Up" link not found.', error);
  }

  // Fill the Sign-Up form
  try {
    await page.waitForTimeout(20000);
    await page.waitForSelector('#signUpName', { timeout: 5000 });
    await page.fill('#signUpName', 'John Smith');
    await page.fill('#signUpEmail', 'deploymentmasterups@edny.net');
    await page.fill('#signUpUserId', 'dpymstupsedny');
    await page.fill('#signUpPassword', 'DPYMSTdpymst!001');
    await page.check('label.ups-form_label.ups-checkbox-custom-label');
    console.log('✅ Form filled.');
  } catch (error) {
    console.log('⚠️ Form fields missing.', error);
  }

  // Click Sign Up Button
  try {
    await page.waitForTimeout(10000);
    await page.click('button.ups-cta_primary:has-text("Sign Up")');
    console.log('✅ Clicked "Sign Up".');
  } catch (error) {
    console.log('⚠️ "Sign Up" button not found.', error);
  }

  await page.waitForTimeout(60000);

  await page.waitForTimeout(5000);
});