import { test as base } from './base.fixture';
import { test } from '@playwright/test';
import { envConfig } from '../utils/env.config';
import { Logger } from '../utils/logger';

export const testWithAuth = base.extend<{ authenticatedPage: void }>({
  authenticatedPage: async ({ page, loginPage }, use) => {
    await test.step('Fixture Precondition: Perform UI authentication', async () => {
      Logger.info('Performing pre-test authentication via UI', 'AuthFixture');
      await loginPage.goto();
      await loginPage.login(
        envConfig.credentials.validUser.username,
        envConfig.credentials.validUser.password
      );
      await page.waitForURL(/.*(dashboard|main|home|an-ninh).*/, { timeout: 10000 }).catch(() => {
        Logger.warn('Page did not navigate to expected URL pattern, checking loaded state', 'AuthFixture');
      });
    });
    await use();
  },
});
