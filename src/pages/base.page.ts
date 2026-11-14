import { Page, Locator, test } from '@playwright/test';
import { Logger } from '../utils/logger';

export abstract class BasePage {
  constructor(public readonly page: Page) {}

  /**
   * Format locator string for readable Allure reporting.
   */
  protected formatLocator(locator: Locator): string {
    return locator.toString();
  }

  /**
   * Mask sensitive parameter values (passwords, tokens).
   */
  protected maskSensitiveValue(value: string, description: string): string {
    const isSensitive = /pass|secret|token|key|pwd/i.test(description);
    return isSensitive ? '••••••••' : value;
  }

  /**
   * Navigate to a relative path or full URL with test step logging.
   */
  public async navigate(path: string = ''): Promise<void> {
    await test.step(`Navigate to URL: "${path || '/'}"`, async () => {
      Logger.info(`Navigating to URL: ${path || '/'}`, this.constructor.name);
      await this.page.goto(path);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Click an element with auto-wait, locator details, and structured logging.
   */
  public async clickElement(locator: Locator, description: string): Promise<void> {
    const locatorStr = this.formatLocator(locator);
    await test.step(`Click on "${description}" [Locator: ${locatorStr}]`, async () => {
      Logger.info(`Clicking on: ${description} [${locatorStr}]`, this.constructor.name);
      await locator.waitFor({ state: 'visible' });
      await locator.click();
    });
  }

  /**
   * Fill text into an input element with parameter value, locator details, and structured logging.
   */
  public async fillElement(locator: Locator, value: string, description: string): Promise<void> {
    const locatorStr = this.formatLocator(locator);
    const displayValue = this.maskSensitiveValue(value, description);
    await test.step(`Fill "${displayValue}" into "${description}" [Locator: ${locatorStr}]`, async () => {
      Logger.info(`Filling "${description}" with value: ${displayValue} [${locatorStr}]`, this.constructor.name);
      await locator.waitFor({ state: 'visible' });
      await locator.fill(value);
    });
  }

  /**
   * Retrieve visible text from an element with locator details.
   */
  public async getText(locator: Locator, description: string): Promise<string> {
    const locatorStr = this.formatLocator(locator);
    return await test.step(`Retrieve text from "${description}" [Locator: ${locatorStr}]`, async () => {
      Logger.info(`Getting text from: ${description} [${locatorStr}]`, this.constructor.name);
      await locator.waitFor({ state: 'visible' });
      const text = await locator.textContent();
      return (text || '').trim();
    });
  }

  /**
   * Check if an element is visible within a specific timeout.
   */
  public async isVisible(locator: Locator, description: string, timeout: number = 5000): Promise<boolean> {
    const locatorStr = this.formatLocator(locator);
    return await test.step(`Check visibility of "${description}" [Locator: ${locatorStr}]`, async () => {
      Logger.info(`Checking visibility of: ${description} [${locatorStr}]`, this.constructor.name);
      try {
        await locator.waitFor({ state: 'visible', timeout });
        return true;
      } catch {
        return false;
      }
    });
  }

  /**
   * Capture a screenshot and attach directly into the current Allure test step.
   */
  public async captureScreenshot(stepDescription: string = 'Current State Screenshot'): Promise<Buffer> {
    return await test.step(`Attach Screenshot: "${stepDescription}"`, async () => {
      Logger.info(`Capturing screenshot: ${stepDescription}`, this.constructor.name);
      const screenshot = await this.page.screenshot({ fullPage: false });
      await test.info().attach(stepDescription, {
        body: screenshot,
        contentType: 'image/png',
      });
      return screenshot;
    });
  }

  /**
   * Get current page URL.
   */
  public getUrl(): string {
    return this.page.url();
  }

  /**
   * Get current page title.
   */
  public async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
