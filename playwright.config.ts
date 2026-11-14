import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables (.env first, then override with .env.local if present)
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '.env.local'), override: true });

export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Control parallel workers */
  workers: process.env.CI ? 2 : 2,
  /* Reporter to use */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: true,
        environmentInfo: {
          Framework: 'Playwright TypeScript',
          Platform: process.platform,
          NodeVersion: process.version,
          BaseURL: process.env.BASE_URL || 'https://aicam.example.com',
        },
      },
    ],
  ],
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://aicam.example.com',

    /* Desktop Viewport standard 1920x1080 */
    viewport: { width: 1920, height: 1080 },

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Capture screenshot only on failure (passed screenshots handled in last step / fixtures) */
    screenshot: 'only-on-failure',

    /* Record video execution for all test runs to attach to reports */
    video: 'on',

    /* Action & navigation timeouts */
    actionTimeout: 15000,
    navigationTimeout: 30000,

    /* Headless mode: defaults to headless in CI, configurable via env */
    headless: process.env.HEADLESS !== 'false',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     viewport: { width: 1920, height: 1080 },
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1920, height: 1080 },
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results',
});

