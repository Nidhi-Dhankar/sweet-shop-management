import request from "supertest";
import app from "../app";

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test", email: "test@test.com", password: "123456" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("email", "test@test.com");
  });
});
