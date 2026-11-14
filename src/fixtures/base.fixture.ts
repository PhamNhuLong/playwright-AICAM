import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

// Declare custom test fixtures
type CustomFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

// Extend base test with POM fixtures and automatic passed screenshot capture
export const test = baseTest.extend<CustomFixtures & { autoPassedScreenshot: void }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  autoPassedScreenshot: [
    async ({ page }, use, testInfo) => {
      await use();
      // If test passes and no screenshot has been attached yet, capture final state
      if (testInfo.status === 'passed') {
        const hasScreenshot = testInfo.attachments.some((a) =>
          a.contentType.startsWith('image/')
        );
        if (!hasScreenshot) {
          const screenshot = await page.screenshot({ fullPage: false });
          await testInfo.attach('Passed: Final State Screenshot', {
            body: screenshot,
            contentType: 'image/png',
          });
        }
      }
    },
    { auto: true },
  ],
});

export { expect };
