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


let verificationCode: string | null = null; // Global variable to store the extracted code

test.only('Get the Signup authentication code from Email', async ({ page }) => { 
  await page.goto('https://mail.tm/en/');
  console.log(await page.title());
  console.log('✅ Browser opened and navigated to Email website.');

  await page.waitForTimeout(10000);

  // Click on the Account button
  await page.locator('button[title="Account"]').click();
  await page.locator('button:has-text("Login")').click();

  await page.waitForTimeout(10000);
  await page.fill('input[name="address"]', 'DeploymentMasterUPS@edny.net');
  await page.fill('input[name="password"]', 'UPSups$001'); 
  await page.locator('button:has-text("Login")').click();

  // Wait for login to complete
  await page.waitForTimeout(30000);
  await page.waitForSelector('a.group.block.transition');

  console.log('✅ Logged in successfully!');

  // Select all email elements
  const emailElements = await page.locator('a.group.block.transition').all();
  console.log(`Total emails found: ${emailElements.length}`);

  // Iterate through emails
  for (let i = 0; i < emailElements.length; i++) {
    const emailElement = emailElements[i];

    // Locate the correct subject div
    const subjectLocator = emailElement.locator('div.truncate.text-sm.leading-5.text-gray-900');
    const subject = await subjectLocator.textContent();

    console.log(`Checking email ${i + 1}: ${subject}`);

    if (!subject) {
      console.log(`Skipping email ${i + 1} as subject is null`);
      continue;
    }

    // Check for verification email
    if (subject.includes('UPS') && subject.includes('Verification Code')) {
      console.log(`✅ Found target email: ${subject}`);
      await emailElement.click();

      // Extract the verification code using regex
      const match = subject.match(/\[(\d+)\]/);
      
      console.log(`🔹 Full regex match: ${match}`);

      if (match) {
        verificationCode = match[1]; // Save the extracted verification code
        console.log(`🔹 Extracted Verification Code: ${verificationCode}`);
      } else {
        console.log('❌ Failed to extract verification code.');
      }

      break;
    }
  }

  // Wait to see the opened email
  await page.waitForTimeout(5000);
});

// Example of using verificationCode in another test
test.only('Use the extracted verification code', async () => {
  console.log(`🔹 Using Verification Code: ${verificationCode}`);
});