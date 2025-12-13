"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("Auth Routes", () => {
    it("should register a new user", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/auth/register")
            .send({ name: "Test", email: "test@test.com", password: "123456" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("email", "test@test.com");
    });
});
//# sourceMappingURL=auth.test.js.map