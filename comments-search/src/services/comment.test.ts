import { describe, it, expect, vi, beforeEach } from "vitest";
import { getComments } from "./comment";
import { api } from "@/utils";
import { mockComments } from "@/test/mockData";

// Mock the api module
vi.mock("@/utils", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("Comment Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getComments", () => {
    it("should fetch comments with default parameters", async () => {
      const mockResponse = { data: mockComments };
      vi.mocked(api.get).mockResolvedValue(mockResponse);

      const result = await getComments();

      expect(api.get).toHaveBeenCalledWith("/comments", {
        params: {
          _limit: 20,
          _page: 1,
          q: undefined,
        },
      });
      expect(result).toEqual(mockComments);
    });

    it("should fetch comments with custom limit and page", async () => {
      const mockResponse = { data: mockComments.slice(0, 2) };
      vi.mocked(api.get).mockResolvedValue(mockResponse);

      const result = await getComments({ limit: 10, page: 2 });

      expect(api.get).toHaveBeenCalledWith("/comments", {
        params: {
          _limit: 10,
          _page: 2,
          q: undefined,
        },
      });
      expect(result).toEqual(mockComments.slice(0, 2));
    });

    it("should fetch comments with search query", async () => {
      const mockResponse = { data: [mockComments[2]] };
      vi.mocked(api.get).mockResolvedValue(mockResponse);

      const result = await getComments({ query: "example" });

      expect(api.get).toHaveBeenCalledWith("/comments", {
        params: {
          _limit: 20,
          _page: 1,
          q: "example",
        },
      });
      expect(result).toEqual([mockComments[2]]);
    });

    it("should handle API errors", async () => {
      const mockError = new Error("Network error");
      vi.mocked(api.get).mockRejectedValue(mockError);

      await expect(getComments()).rejects.toThrow("Network error");
    });

    it("should return empty array when no comments found", async () => {
      const mockResponse = { data: [] };
      vi.mocked(api.get).mockResolvedValue(mockResponse);

      const result = await getComments({ query: "nonexistent" });

      expect(result).toEqual([]);
    });
  });
});
