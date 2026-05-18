import { describe, it, expect, afterAll } from "vitest";
import http from "node:http";
import { server } from "../src/index";

function request(path: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:${process.env.PORT || 3000}${path}`, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode!, body }));
    });
    req.on("error", reject);
  });
}

afterAll(() => {
  server.close();
});

describe("HTTP Server", () => {
  it("should respond with status 200", async () => {
    const { status } = await request("/");
    expect(status).toBe(200);
  });

  it('should respond with "ok"', async () => {
    const { body } = await request("/");
    expect(body).toBe("ok");
  });

  it("should set Content-Type to text/plain", async () => {
    const res = await new Promise<http.IncomingMessage>((resolve, reject) => {
      const req = http.get(`http://localhost:${process.env.PORT || 3000}/`, resolve);
      req.on("error", reject);
    });
    res.resume(); // drain the response
    expect(res.headers["content-type"]).toBe("text/plain");
  });
});
