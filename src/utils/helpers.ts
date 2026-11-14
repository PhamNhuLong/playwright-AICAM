import { Page, Locator } from '@playwright/test';
import { Logger } from './logger';

export class Helpers {
  /**
   * Safely captures a full page screenshot and attaches it to the current test context if available.
   */
  public static async captureScreenshot(page: Page, name: string): Promise<Buffer> {
    const filename = `${name.replace(/[^a-zA-Z0-9_-]/g, '_')}_${Date.now()}.png`;
    Logger.info(`Capturing screenshot: ${filename}`, 'Helpers');
    return await page.screenshot({ path: `test-results/${filename}`, fullPage: true });
  }

  /**
   * Waits for network idle state without using fixed sleep.
   */
  public static async waitForNetworkIdle(page: Page, timeout: number = 10000): Promise<void> {
    try {
      await page.waitForLoadState('networkidle', { timeout });
    } catch {
      Logger.warn('Network did not become idle within timeout, proceeding with execution', 'Helpers');
    }
  }

  /**
   * Clear an input element and fill it with new text.
   */
  public static async clearAndFill(locator: Locator, text: string): Promise<void> {
    await locator.click();
    await locator.fill('');
    await locator.fill(text);
  }
}

