// src/utils/logger.ts
export const log = (message: string) => {
  console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
};
