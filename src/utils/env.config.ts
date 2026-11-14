import * as dotenv from 'dotenv';
import * as path from 'path';

// Ensure .env is loaded
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const envConfig = {
  baseUrl: process.env.BASE_URL || 'https://aicam.example.com',
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '15000', 10),
  headless: process.env.HEADLESS !== 'false',
  credentials: {
    validUser: {
      username: process.env.VALID_USERNAME || 'aicam_user01',
      password: process.env.VALID_PASSWORD || 'P@ssw0rd2026',
    },
    lockedUser: {
      username: process.env.LOCKED_USERNAME || 'aicam_user_locked',
      password: process.env.LOCKED_PASSWORD || 'P@ssw0rd2026',
    },
    nonExistentUser: {
      username: process.env.NON_EXISTENT_USERNAME || 'ghost_user_999',
      password: 'P@ssw0rd2026',
    },
  },
} as const;

export type EnvConfig = typeof envConfig;

