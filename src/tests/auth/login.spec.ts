import { test, expect } from '../../fixtures/base.fixture';
import { envConfig } from '../../utils/env.config';
import { Logger } from '../../utils/logger';
import * as testData from '../../../test-data/users.json';

test.describe('AICAM Authentication — Login Feature Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Precondition: Navigate to AICAM Login Page', async () => {
      Logger.info('Initializing and navigating to AICAM Login page', 'LoginSpec');
      await loginPage.goto();
    });
  });

  test('AICAM_LOGIN_TC_001: Đăng nhập thành công với thông tin hợp lệ (Happy Path) @Smoke @CriticalPath', async ({
    loginPage,
    dashboardPage,
    page,
  }) => {
    const { username, password } = envConfig.credentials.validUser;

    await test.step('Step 1: Enter valid credentials and submit login form', async () => {
      await loginPage.login(username, password);
    });

    await test.step('Step 2: Verify redirect to dashboard and security overview', async () => {
      await expect(page).toHaveURL(/.*\/an-ninh.*/, { timeout: 15000 });
      const isDashboardLoaded = await dashboardPage.isLoaded();
      expect(isDashboardLoaded).toBeTruthy();
      await dashboardPage.captureScreenshot('Passed: Dashboard Loaded Successfully');
    });
  });

  test('AICAM_LOGIN_TC_002: Bỏ trống Tên đăng nhập @Regression @Negative', async ({
    loginPage,
  }) => {
    const password = envConfig.credentials.validUser.password;

    await test.step('Step 1: Leave username empty, fill password, and submit', async () => {
      await loginPage.fillPassword(password);
      await loginPage.clickLogin();
    });

    await test.step('Step 2: Verify required username validation message', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain(testData.expectedMessages.emptyFields);
      await loginPage.captureScreenshot('Passed: Empty Username Validation Displayed');
    });
  });

  test('AICAM_LOGIN_TC_003: Bỏ trống Mật khẩu @Regression @Negative', async ({
    loginPage,
  }) => {
    const username = envConfig.credentials.validUser.username;

    await test.step('Step 1: Fill username, leave password empty, and submit', async () => {
      await loginPage.fillUsername(username);
      await loginPage.clickLogin();
    });

    await test.step('Step 2: Verify required password validation message', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain(testData.expectedMessages.emptyFields);
      await loginPage.captureScreenshot('Passed: Empty Password Validation Displayed');
    });
  });

  test('AICAM_LOGIN_TC_004: Bỏ trống đồng thời cả Tên đăng nhập và Mật khẩu @Regression @Negative', async ({
    loginPage,
  }) => {
    await test.step('Step 1: Submit form without entering username or password', async () => {
      await loginPage.clickLogin();
    });

    await test.step('Step 2: Verify empty fields validation message is displayed', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain(testData.expectedMessages.emptyFields);
      await loginPage.captureScreenshot('Passed: Empty Fields Validation Displayed');
    });
  });

  test('AICAM_LOGIN_TC_005: Nhập Tên đăng nhập chỉ chứa khoảng trắng @Regression @Negative @Boundary', async ({
    loginPage,
  }) => {
    const whitespaceUsername = '   ';
    const password = envConfig.credentials.validUser.password;

    await test.step('Step 1: Fill username with whitespaces, enter password, and submit', async () => {
      await loginPage.fillUsername(whitespaceUsername);
      await loginPage.fillPassword(password);
      await loginPage.clickLogin();
    });

    await test.step('Step 2: Verify system rejects whitespace-only username', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      const isErrorHandled = errorMsg.includes('Missing credentials') || errorMsg.includes('không được để trống');
      expect(isErrorHandled).toBeTruthy();
      await loginPage.captureScreenshot('Passed: Whitespace Username Rejection Displayed');
    });
  });

  test('AICAM_LOGIN_TC_006: Kiểm tra phân biệt chữ hoa / chữ thường của Tên đăng nhập @Regression @Negative', async ({
    loginPage,
  }) => {
    const username = envConfig.credentials.validUser.username.toLowerCase();
    const password = envConfig.credentials.validUser.password;

    await test.step('Step 1: Fill lowercase username and valid password, then submit', async () => {
      await loginPage.fillUsername(username);
      await loginPage.fillPassword(password);
      await loginPage.clickLogin();
    });

    await test.step('Step 2: Verify rejection message for case mismatch', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain(testData.expectedMessages.nonExistentAccount);
      await loginPage.captureScreenshot('Passed: Case Sensitivity Rejection Displayed');
    });
  });

  test('AICAM_LOGIN_TC_007: Đăng nhập với tài khoản không tồn tại trong hệ thống @Regression @Negative', async ({
    loginPage,
  }) => {
    const { username } = testData.nonExistentUser;
    const password = envConfig.credentials.validUser.password;

    await test.step('Step 1: Fill non-existent username and password, then submit', async () => {
      await loginPage.fillUsername(username);
      await loginPage.fillPassword(password);
      await loginPage.clickLogin();
    });

    await test.step('Step 2: Verify rejection message for non-existent account', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain(testData.expectedMessages.nonExistentAccount);
      await loginPage.captureScreenshot('Passed: Non-existent Account Rejection Displayed');
    });
  });

  test('AICAM_LOGIN_TC_008: Đăng nhập đúng Tên đăng nhập nhưng sai Mật khẩu @Smoke @Negative', async ({
    loginPage,
  }) => {
    const username = envConfig.credentials.validUser.username;
    const password = testData.wrongPasswordUser.password;

    await test.step('Step 1: Fill correct username with incorrect password, then submit', async () => {
      await loginPage.fillUsername(username);
      await loginPage.fillPassword(password);
      await loginPage.clickLogin();
    });

    await test.step('Step 2: Verify invalid credentials error message', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain(testData.expectedMessages.invalidCredentials);
      await loginPage.captureScreenshot('Passed: Invalid Credentials Error Displayed');
    });
  });

  test('AICAM_LOGIN_TC_017: Kiểm tra phòng chống SQL Injection tại ô Tên đăng nhập @Security', async ({
    loginPage,
    page,
  }) => {
    const sqlInjectionPayload = "' OR '1'='1' --";
    const password = envConfig.credentials.validUser.password;

    await test.step('Step 1: Submit SQL injection payload in username field', async () => {
      await loginPage.fillUsername(sqlInjectionPayload);
      await loginPage.fillPassword(password);
      await loginPage.clickLogin();
    });

    await test.step('Step 2: Verify authentication bypass is prevented securely', async () => {
      await expect(page).not.toHaveURL(/.*\/an-ninh.*/);
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain(testData.expectedMessages.invalidCredentials);
      await loginPage.captureScreenshot('Passed: SQL Injection Handled Securely');
    });
  });

  test('AICAM_LOGIN_TC_020: Kiểm tra mật khẩu được ẩn ký tự theo chuẩn bảo mật @Regression', async ({
    loginPage,
  }) => {
    await test.step('Step 1: Enter password into Password input field', async () => {
      await loginPage.fillPassword('DummyPassword123');
    });

    await test.step('Step 2: Verify Password field attribute type is "password"', async () => {
      const isMasked = await loginPage.isPasswordInputMasked();
      expect(isMasked).toBeTruthy();
      await loginPage.captureScreenshot('Passed: Password Masking Verified');
    });
  });

  test('AICAM_LOGIN_TC_021: Chống Double-click / Spam nút Đăng nhập liên tiếp @Regression @Security', async ({
    loginPage,
    page,
  }) => {
    const { username, password } = envConfig.credentials.validUser;

    await test.step('Step 1: Fill credentials and double-click login button', async () => {
      await loginPage.fillUsername(username);
      await loginPage.fillPassword(password);
      await loginPage.doubleClickLogin();
    });

    await test.step('Step 2: Verify system stability without server crash or unhandled error', async () => {
      await page.waitForLoadState('networkidle');
      await expect(page).not.toHaveTitle(/500|Error|Exception/i);
      const currentUrl = page.url();
      expect(currentUrl.includes('/an-ninh') || currentUrl.includes(':2188')).toBeTruthy();
      await loginPage.captureScreenshot('Passed: Double Click Handled Gracefully');
    });
  });

  test('AICAM_LOGIN_TC_022: Điều hướng bằng phím Tab và phím Enter @Regression @A11y', async ({
    loginPage,
    dashboardPage,
    page,
  }) => {
    const { username, password } = envConfig.credentials.validUser;

    await test.step('Step 1: Fill and submit form using keyboard Tab and Enter keys', async () => {
      await test.step(`Focus on Username Input [Locator: ${loginPage.usernameInput.toString()}]`, async () => {
        await loginPage.usernameInput.focus();
      });
      await test.step(`Type username and press Tab`, async () => {
        await page.keyboard.type(username);
        await page.keyboard.press('Tab');
      });
      await test.step(`Type password and press Enter to submit`, async () => {
        await page.keyboard.type(password);
        await page.keyboard.press('Enter');
      });
    });

    await test.step('Step 2: Verify successful login and URL redirection', async () => {
      await expect(page).toHaveURL(/.*\/an-ninh.*/, { timeout: 15000 });
      await dashboardPage.captureScreenshot('Passed: Keyboard Navigation Login Succeeded');
    });
  });

  test('AICAM_LOGIN_TC_025: Kiểm tra trạng thái form sau khi đăng nhập thất bại @Regression', async ({
    loginPage,
  }) => {
    const nonExistentUsername = 'ghost_user_999';

    await test.step('Step 1: Submit non-existent account credentials', async () => {
      await loginPage.fillUsername(nonExistentUsername);
      await loginPage.fillPassword('WrongPassword@123');
      await loginPage.clickLogin();
    });

    await test.step('Step 2: Verify error message display, username retention, and password clearance', async () => {
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBeTruthy();

      const retainedUsername = await loginPage.getUsernameInputValue();
      expect(retainedUsername).toBe(nonExistentUsername);

      const clearedPassword = await loginPage.getPasswordInputValue();
      expect(clearedPassword).toBe('');

      await loginPage.captureScreenshot('Passed: Form State Verified After Failure');
    });
  });
});
