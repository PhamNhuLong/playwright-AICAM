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

    this.securityOverviewLink = page.locator('a[href="/an-ninh"], a[href*="an-ninh"]').first();
  }

  public async isLoaded(): Promise<boolean> {
    return await test.step('Verify Dashboard page components and URL pattern', async () => {
      const isBannerVisible = await this.systemBanner.isVisible({ timeout: 10000 }).catch(() => false);
      const isBranchVisible = await this.branchMapSection.isVisible({ timeout: 5000 }).catch(() => false);
      const currentUrl = this.getUrl();
      const isUrlMatched = currentUrl.includes('/an-ninh');

      return (isBannerVisible || isBranchVisible) && isUrlMatched;
    });
  }
}
