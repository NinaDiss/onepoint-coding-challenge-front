import { describe, it, expect, beforeEach, vi } from "vitest";
import { backendApi } from "../backendApi";
import { mockBreweryApiResponse } from "./mocks/breweryApiResponse.mock";

describe("backendApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and transform breweries successfully", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ breweries: mockBreweryApiResponse }),
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await backendApi.fetchScrapedBreweries();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/breweries/parse?page=1&per_page=20",
    );
    expect(result).toHaveLength(3);

    expect(result[0]).toEqual({
      id: "101",
      name: "Brasserie Artisanale de Paris",
      postal_code: "75000",
    });
  });

  it("should throw error for HTTP errors", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(backendApi.fetchScrapedBreweries()).rejects.toThrow(
      "HTTP error! status: 404",
    );
  });

  it("should handle network errors", async () => {
    const networkError = new Error("Network error");
    globalThis.fetch = vi.fn().mockRejectedValue(networkError);

    await expect(backendApi.fetchScrapedBreweries()).rejects.toThrow(
      "Network error",
    );
  });

  it("should pass custom parameters to fetch URL", async () => {
    const customParams = { page: 2, per_page: 50 };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ breweries: mockBreweryApiResponse }),
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    await backendApi.fetchScrapedBreweries(customParams);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/breweries/parse?page=2&per_page=50",
    );
  });
});
