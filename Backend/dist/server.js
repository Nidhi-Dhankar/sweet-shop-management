"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
// Validate required environment variables
const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingEnvVars.length > 0) {
    console.error("Missing required environment variables:", missingEnvVars.join(", "));
    console.error("Please create a .env file with these variables.");
    process.exit(1);
}
app_1.default.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API Health: http://localhost:${PORT}/api/health`);
});
//# sourceMappingURL=server.js.map