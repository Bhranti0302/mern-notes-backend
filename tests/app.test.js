const request = require("supertest");
const app = require("../app");

describe("Health Check API", () => {
  test("should return API status OK", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe("OK");
  });
});
