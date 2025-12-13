"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
// src/utils/logger.ts
const log = (message) => {
    console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
};
exports.log = log;
//# sourceMappingURL=logger.js.map