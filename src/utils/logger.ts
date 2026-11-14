export enum LogLevel {
  INFO = 'INFO',
  STEP = 'STEP',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Logger {
  private static formatMessage(level: LogLevel, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const prefix = context ? `[${timestamp}] [${level}] [${context}]` : `[${timestamp}] [${level}]`;
    return `${prefix} ${message}`;
  }

  public static info(message: string, context?: string): void {
    process.stdout.write(`${this.formatMessage(LogLevel.INFO, message, context)}\n`);
  }

  public static step(stepNumber: number | string, message: string, context?: string): void {
    process.stdout.write(`${this.formatMessage(LogLevel.STEP, `Step ${stepNumber}: ${message}`, context)}\n`);
  }

  public static warn(message: string, context?: string): void {
    process.stderr.write(`${this.formatMessage(LogLevel.WARN, message, context)}\n`);
  }

  public static error(message: string, error?: unknown, context?: string): void {
    const errorDetails = error instanceof Error ? ` - ${error.stack || error.message}` : '';
    process.stderr.write(`${this.formatMessage(LogLevel.ERROR, `${message}${errorDetails}`, context)}\n`);
  }
}

