import { Page, Locator, test } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // ── Exact Verified Locators from AICAM DOM ─────────────────────────────────
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly emptyFieldsAlert: Locator;
  readonly authErrorAlert: Locator;
  readonly anyVisibleAlert: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator('input#UserName');
    this.passwordInput = page.locator('input#PassWord');
    this.loginButton = page.locator('button#btnLogin');

    // Specific alert containers from AICAM form DOM
    this.emptyFieldsAlert = page.locator('#user_empty:not([hidden]) p.user_empty, #user_empty:not([hidden])');
    this.authErrorAlert = page.locator('#error-pass:not([hidden]) p, #error-pass:not([hidden])');
    this.anyVisibleAlert = page.locator('#user_empty:not([hidden]) p, #error-pass:not([hidden]) p, .alert-danger:not([hidden]) p');
    this.forgotPasswordLink = page.locator('a#forgot-pass');
  }

  // ── Page Actions ───────────────────────────────────────────────────────────
  public async goto(): Promise<void> {
    await this.navigate('/');
  }

  public async fillUsername(username: string): Promise<void> {
    await this.fillElement(this.usernameInput, username, 'Username Input');
  }

  public async fillPassword(password: string): Promise<void> {
    await this.fillElement(this.passwordInput, password, 'Password Input');
  }

  public async clickLogin(): Promise<void> {
    await this.clickElement(this.loginButton, 'Login Button');
  }

  public async login(username: string, password: string): Promise<void> {
    if (username !== '') {
      await this.fillUsername(username);
    }
    if (password !== '') {
      await this.fillPassword(password);
    }
    await this.clickLogin();
  }

  public async pressEnterOnPassword(): Promise<void> {
    const locatorStr = this.formatLocator(this.passwordInput);
    await test.step(`Press "Enter" key on "Password Input" [Locator: ${locatorStr}]`, async () => {
      await this.passwordInput.press('Enter');
    });
  }

  public async doubleClickLogin(): Promise<void> {
    const locatorStr = this.formatLocator(this.loginButton);
    await test.step(`Double click on "Login Button" [Locator: ${locatorStr}]`, async () => {
      await this.loginButton.dblclick();
    });
  }

  public async getErrorMessage(): Promise<string> {
    const locatorStr = this.formatLocator(this.anyVisibleAlert.first());
    return await test.step(`Retrieve error message from alert [Locator: ${locatorStr}]`, async () => {
      try {
        await this.anyVisibleAlert.first().waitFor({ state: 'visible', timeout: 5000 });
        const text = await this.anyVisibleAlert.first().textContent();
        return (text || '').trim();
      } catch {
        return '';
      }
    });
  }

  public async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.anyVisibleAlert.first(), 'Visible Error Alert Message', 3000);
  }

  public async getUsernameInputValue(): Promise<string> {
    const locatorStr = this.formatLocator(this.usernameInput);
    return await test.step(`Retrieve current input value of "Username Input" [Locator: ${locatorStr}]`, async () => {
      return await this.usernameInput.inputValue();
    });
  }

  public async getPasswordInputValue(): Promise<string> {
    const locatorStr = this.formatLocator(this.passwordInput);
    return await test.step(`Retrieve current input value of "Password Input" [Locator: ${locatorStr}]`, async () => {
      return await this.passwordInput.inputValue();
    });
  }

  public async isPasswordInputMasked(): Promise<boolean> {
    const locatorStr = this.formatLocator(this.passwordInput);
    return await test.step(`Verify "Password Input" is masked with type="password" [Locator: ${locatorStr}]`, async () => {
      const inputType = await this.passwordInput.getAttribute('type');
      return inputType === 'password';
    });
  }
}
