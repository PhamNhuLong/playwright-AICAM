import { test, expect } from '../../fixtures/base.fixture';
import { envConfig } from '../../utils/env.config';

test.describe('AICAM Dashboard Feature Tests', () => {
  test('DASHBOARD_TC_001: Màn hình chính tải thành công sau khi đăng nhập hợp lệ @Smoke', async ({
    loginPage,
    dashboardPage,
    page,
  }) => {
    const { username, password } = envConfig.credentials.validUser;

    await test.step('Step 1: Navigate to login page, enter credentials, and submit', async () => {
      await loginPage.goto();
      await loginPage.login(username, password);
    });

    await test.step('Step 2: Verify Dashboard components and URL pattern', async () => {
      await expect(page).toHaveURL(/.*\/an-ninh.*/, { timeout: 15000 });
      const isDashboardLoaded = await dashboardPage.isLoaded();
      expect(isDashboardLoaded).toBeTruthy();
      await dashboardPage.captureScreenshot('Passed: Main Dashboard Overview Loaded');
    });
  });
});
