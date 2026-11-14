/**
 * TestDataGenerator
 * Utility to generate unique, traceable, and randomized test data for automation execution.
 * Format standard: [prefix]_[testName]_[timestamp]_[random]
 */
export class TestDataGenerator {
  public static getTimestamp(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `${yyyy}${mm}${dd}_${hh}${min}${ss}`;
  }

  public static getRandomString(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public static generateUsername(prefix: string = 'user'): string {
    return `${prefix}_${this.getTimestamp()}_${this.getRandomString(4)}`.toLowerCase();
  }

  public static generateEmail(prefix: string = 'test'): string {
    return `${prefix}_${this.getTimestamp()}_${this.getRandomString(4)}@aicam.test.vn`;
  }

  public static generateValidPassword(): string {
    // Password Policy: Requires Uppercase + Lowercase + Number + Special Character
    const randomSuffix = this.getRandomString(4);
    return `Aicam@${randomSuffix}2026`;
  }

  public static generatePhone(): string {
    const randomNineDigits = Math.floor(100000000 + Math.random() * 900000000);
    return `09${randomNineDigits.toString().substring(0, 8)}`;
  }
}

