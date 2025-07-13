// Simple logger utility
export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(`ℹ️ [INFO] ${message}`, ...args);
  },

  error: (message: string, ...args: unknown[]) => {
    console.error(`❌ [ERROR] ${message}`, ...args);
  },

  warn: (message: string, ...args: unknown[]) => {
    console.warn(`⚠️ [WARN] ${message}`, ...args);
  },

  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`🐛 [DEBUG] ${message}`, ...args);
    }
  },

  api: (method: string, endpoint: string, status: number, data?: unknown) => {
    const statusEmoji = status >= 400 ? '❌' : status >= 300 ? '⚠️' : '✅';
    console.log(`${statusEmoji} [API] ${method} ${endpoint} - ${status}`, data);
  },
};

export default logger;
