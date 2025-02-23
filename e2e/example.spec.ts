import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

let 
browser: Browser;
let context: BrowserContext;
let page: Page;
let verificationCode: string | null = null; // Global variable to store the extracted code
let emailValue: string | null = null;

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
/*
test('@setup Open Browser, Handle Cookies, and Log In', async () => {
  await page.goto('https://www.ups.com', { waitUntil: 'load' });
  console.log('✅ Browser opened and navigated to UPS website.');
  await page.waitForTimeout(5000);
});
*/

test('Get temp Email Id', async () => {
    // Navigate to Mailinator
  //https://emailtemp.org/en
  
  await page.goto('https://emailtemp.org/en');
  await page.waitForTimeout(5000);
  emailValue = await page.locator('#trsh_mail').inputValue();
  console.log("Email value:", emailValue);
  //*[@class='message-item']/div/div[2]
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
  
    await page.waitForTimeout(10000);
    await page.waitForSelector('#signUpName', { timeout: 5000 });
    await page.fill('#signUpName', 'James Smith');
    await page.fill('#signUpEmail', emailValue!);
    // await page.fill('#signUpEmail', 'upsusr009@noneteam377726.testinator.com');
    await page.fill('#signUpUserId', 'dpymstupsednn');
    await page.fill('#signUpPassword', 'DPYMSTdpymst!001');
    await page.check('label.ups-form_label.ups-checkbox-custom-label');
    console.log('✅ Form filled.');
 

  // Click Sign Up Button
  
    await page.waitForTimeout(5000);
    await page.click('button.ups-cta_primary:has-text("Sign Up")');
    console.log('✅ Clicked "Sign Up".');
  } catch (error) {
    console.log('⚠️ "Sign Up" button not found.', error);
  }

  //await page.waitForTimeout(60000);

  await page.waitForTimeout(10000);
});




/*test('Get the Signup authentication code from Email', async ({ page }) => { 
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
});*/

test('Retrieve UPS Verification Code from Temp Mail', async () => {
  // Navigate to Mailinator
  //https://emailtemp.org/en
  /*
  await page.goto('https://emailtemp.org/en');
  const emailValue = await page.locator('#trsh_mail').inputValue();
  console.log("Email value:", emailValue);
  
  */
  await page.goto('https://emailtemp.org/en');
  console.log('✅ Navigated to Temp Mail website.');

  // Click on the Login button
  /*
  await page.locator('span.x-menu-link-text:has-text("LOGIN")').first().click();
  await page.waitForTimeout(3000);
  console.log('✅ Clicked on Login button');

  // Enter username and password
  await page.fill('#many_login_email', 'deploymentmasterups@edny.net');
  await page.fill('#many_login_password', 'UPSups$001');
  await page.waitForTimeout(3000);
  // Click Login button
  await page.locator('a.btn.btn-default.submit:has-text("Log in")').click();
  console.log('✅ Logged in successfully');

  // Wait for inbox page to load
  await page.waitForTimeout(5000);
  */
  // Select all email elements
  //const emailElements = await page.locator('a:has(div.truncate.text-sm)').all();
  const emailElements = await page.locator('//*[@class="message-item"]/div/div[2]').all();

  console.log(`📩 Total emails found: ${emailElements.length}`);

  //let verificationCode: string | null = null;

  // Iterate through emails
  for (let i = 0; i < emailElements.length; i++) {
    const emailElement = emailElements[i];

    // Get subject text
    //const subject = await emailElement.locator('div.truncate.text-sm').textContent();
    const subject = await emailElement.textContent();
    console.log(`📩 Checking email ${i + 1}: ${subject}`);

    if (subject && subject.match(/UPS:\s*\[(\d+)\]\s*is Your Verification Code/)) {
      console.log(`✅ Found verification email: ${subject}`);
      await emailElement.click();
      await page.waitForTimeout(3000);

      // Extract verification code using regex
      const match = subject.match(/\[(\d+)\]/);
      if (match) {
        verificationCode = match[1];
        console.log(`🔹 Extracted Verification Code: ${verificationCode}`);
      } else {
        console.log('❌ Failed to extract verification code.');
      }
      break;
    }
  }

  expect(verificationCode).not.toBeNull();
});

test('Enter the code to complete signup', async () => {
  await page.goto('https://www.ups.com/eva/emailVerificationAndLogin?loc=en_US')
  await page.waitForTimeout(5000);
  // Enter the verification code

  const finalVerificationCode = verificationCode ?? ''; 
  await page.locator('#verify_code').fill(finalVerificationCode);
  console.log(`✍ Entered Verification Code: ${finalVerificationCode}`);

  // Click the "Verify My Email" button
  await page.locator('#emailVerificationAndLogin').click();
  console.log('✅ Clicked on "Verify My Email" button');

  // Wait for navigation or confirmation of verification
  await page.waitForTimeout(10000); // Adjust if needed

  await page.locator('//button[text()="Set Up Later"]').click();
  await page.waitForTimeout(2000);
  await page.locator('//button[text()="Continue"]').click();
  await page.waitForTimeout(5000);
  await page.locator('button#user-profile').click();
  await page.locator('//a[text()="Account Dashboard"]').click();
  await page.waitForTimeout(2000);
  await page.locator('button#profile_tab_tab_1').click();
  await page.locator('button.ups-cta.ups-cta-tertiary.mb-3').click();
  await page.locator('button.ups-cta.ups-cta_tertiary').click();
  //await page.locator('button.ups-cta.ups-cta_primary').click();
  await page.waitForTimeout(60000);


});


