import { Page, Locator, test } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly systemBanner: Locator;
  readonly branchMapSection: Locator;
  readonly securityOverviewLink: Locator;

  constructor(page: Page) {
    super(page);

    this.systemBanner = page.getByRole('link', { name: 'Hệ thống giám sát an ninh giao thông' })
      .or(page.locator('banner, header'))
      .first();

    this.branchMapSection = page.getByText('Sơ đồ chi nhánh')
      .or(page.getByText('CẢNH BÁO REAL-TIME'))
      .first();

    this.securityOverviewLink = page.locator('a[href*="an-ninh"], a[href="/an-ninh"]').first();
  }

  public async isLoaded(): Promise<boolean> {
    return await test.step('Verify Dashboard page components and URL pattern', async () => {
      // Ensure DOM is ready before querying elements
      await this.page.waitForLoadState('domcontentloaded');

      const isUrlMatched = this.getUrl().includes('/an-ninh');

      // Check visibility with resilient timeouts for international CI environments
      const isBannerVisible = await this.systemBanner.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
      const isBranchVisible = await this.branchMapSection.waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false);
      const isSecLinkVisible = await this.securityOverviewLink.waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false);

      return isUrlMatched && (isBannerVisible || isBranchVisible || isSecLinkVisible);
    });
  }
}
