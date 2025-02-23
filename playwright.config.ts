import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  globalSetup: require.resolve('./globalSetup'), // Ensures login runs before tests
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    headless: false,  // Ensure you see the UI behavior
    browserName: 'chromium', // Limit to one browser
    launchOptions: { args: ['--disable-popup-blocking'] }, // Prevent popups
    trace: 'on-first-retry',
    storageState: 'auth.json', // Reuse authentication session
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});