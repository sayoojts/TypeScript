const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.ups.com');

  console.log(await page.title());

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

  await page.waitForSelector('span.text:has-text("Log In")', { timeout: 5000 });

    // Click the "Log In" span
    await page.click('span.text:has-text("Log In")');

    console.log('Clicked on "Log In".');

    // Click the "Sign up" link
    await page.click('a.ups-link:has-text("Sign up")');

    console.log('Clicked on "Sign up".');

  await page.waitForTimeout(5000);

  try {
    await page.waitForSelector('a.ups-link:has-text("Sign up")', { timeout: 5000 });
    await page.click('a.ups-link:has-text("Sign up")');
    console.log('✅ Clicked on "Sign up".');
  } catch {
    console.log('⚠️ "Sign up" link not found.');
  }

  // Fill the Sign-Up form
  try {
    await page.waitForSelector('#signUpName', { timeout: 5000 });
    await page.fill('#signUpName', 'John Smith');
    await page.fill('#signUpEmail', 'deploymentmasterups@edny.net');
    await page.fill('#signUpUserId', 'deploymentmaster');
    await page.fill('#signUpPassword', 'UPSupsUPSups$001');
    await page.check('#signUpAgreement');
    console.log('✅ Form filled.');
  } catch {
    console.log('⚠️ Form fields missing.'+e.toString());s
  }

  await browser.close();
})();
