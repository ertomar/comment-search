import { describe, it, expect } from "vitest";
import { api } from "./api";

describe("API Client", () => {
  it("should be an axios instance", () => {
    expect(api).toBeDefined();
    expect(api.get).toBeDefined();
    expect(api.post).toBeDefined();
  });

  it("should have the correct baseURL", () => {
    expect(api.defaults.baseURL).toBeDefined();
    // Should either be from env or the default JSONPlaceholder URL
    expect(
      api.defaults.baseURL === "https://jsonplaceholder.typicode.com" ||
        api.defaults.baseURL === import.meta.env.VITE_API_URL
    ).toBe(true);
  });
});
