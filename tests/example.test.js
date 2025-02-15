const { test, expect } = require('@playwright/test');

// Test Case 1: Open Browser, Handle Cookies, and Log In
test('Open Browser, Handle Cookies, and Log In', async ({ page }) => {
  // Navigate to the UPS website
  await page.goto('https://www.ups.com');
  console.log('Browser opened and navigated to UPS website.');

  // Handle the cookie consent pop-up
  
  try {
    // Wait for the privacy popup to appear
    await page.waitForSelector('.privacy_prompt_content', { timeout: 5000 });

    // Click the label associated with the "Opt-In to Essential Cookies Only" radio button
    await page.click('label[for="privacy_pref_optout"]');

    // Wait for the "Confirm Selection" button to be enabled
    await page.waitForSelector('#consent_prompt_submit:not([disabled])', { timeout: 5000 });

    // Click the "Confirm Selection" button
    await page.click('#consent_prompt_submit');

    console.log('Cookie consent handled: Opted-in to essential cookies.');
  } catch (error) {
    console.log('Cookie consent pop-up did not appear or could not be handled.', error);
  }

  // Log in
  try {
    // Wait for the "Log In" span to appear
    await page.waitForSelector('span.text:has-text("Log In")', { timeout: 5000 });

    // Click the "Log In" span
    await page.click('span.text:has-text("Log In")');

    console.log('Clicked on "Log In".');
  } catch (error) {
    console.log('"Log In" span did not appear or could not be clicked.', error);
  }

  // Wait for 5 seconds to observe the result (optional)
  await page.waitForTimeout(5000);
});

// Test Case 2: Sign Up Process
test('Sign Up Process', async ({ page }) => {
  // Navigate to the UPS website
  await page.goto('https://www.ups.com');
  console.log('Browser opened and navigated to UPS website.');

  // Handle the cookie consent pop-up (if needed)
  try {
    // Wait for the privacy popup to appear
    await page.waitForSelector('.privacy_prompt_content', { timeout: 5000 });

    // Click the label associated with the "Opt-In to Essential Cookies Only" radio button
    await page.click('label[for="privacy_pref_optout"]');

    // Wait for the "Confirm Selection" button to be enabled
    await page.waitForSelector('#consent_prompt_submit:not([disabled])', { timeout: 5000 });

    // Click the "Confirm Selection" button
    await page.click('#consent_prompt_submit');

    console.log('Cookie consent handled: Opted-in to essential cookies.');
  } catch (error) {
    console.log('Cookie consent pop-up did not appear or could not be handled.', error);
  }

  // Navigate to the Sign Up page
  try {
    // Wait for the "Sign up" link to appear
    await page.waitForSelector('a.ups-link:has-text("Sign up")', { timeout: 5000 });

    // Click the "Sign up" link
    await page.click('a.ups-link:has-text("Sign up")');

    console.log('Clicked on "Sign up".');
  } catch (error) {
    console.log('"Sign up" link did not appear or could not be clicked.', error);
  }

  // Fill in the sign-up form
  try {
    // Wait for the form to load
    await page.waitForSelector('#signUpName', { timeout: 5000 });

    // Fill in the "Name" field
    await page.fill('#signUpName', 'John Smith');

    // Fill in the "Email" field
    await page.fill('#signUpEmail', 'deploymentmasterups@edny.net');

    // Fill in the "User ID" field
    await page.fill('#signUpUserId', 'deploymentmaster');

    // Fill in the "Password" field
    await page.fill('#signUpPassword', 'UPSupsUPSups$001');

    // Check the agreement checkbox
    await page.check('#signUpAgreement');

    console.log('Form filled and agreement checkbox checked.');
  } catch (error) {
    console.log('Form fields did not appear or could not be filled.', error);
  }

  // Wait for 10 seconds
  await page.waitForTimeout(10000);

  // Click the "Sign Up" button
  try {
    await page.click('button.ups-cta_primary:has-text("Sign Up")');
    console.log('Clicked on "Sign Up" button.');
  } catch (error) {
    console.log('"Sign Up" button did not appear or could not be clicked.', error);
  }

  // Wait for 5 seconds to observe the result (optional)
  await page.waitForTimeout(5000);
});