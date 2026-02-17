import { describe, it, expect, beforeEach, vi } from "vitest";
import { openBreweryApi } from "../openBreweryApi";
import { mockBreweryApiResponse } from "./mocks/breweryApiResponse.mock";

describe("openBreweryApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and transform breweries successfully", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockBreweryApiResponse),
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await openBreweryApi.fetchBreweries();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.openbrewerydb.org/v1/breweries?page=1&per_page=20&by_country=france",
    );
    expect(result).toHaveLength(3);

    expect(result[0]).toEqual({
      id: "101",
      name: "Brasserie Artisanale de Paris",
      postal_code: "75000",
    });
  });

  it("should pass custom parameters to fetch URL", async () => {
    const customParams = { page: 2, per_page: 50 };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockBreweryApiResponse),
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    await openBreweryApi.fetchBreweries(customParams);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.openbrewerydb.org/v1/breweries?page=2&per_page=50&by_country=france",
    );
  });

  it("should throw error for HTTP errors", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
    };

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(openBreweryApi.fetchBreweries()).rejects.toThrow(
      "HTTP error! status: 404",
    );
  });

  it("should handle network errors", async () => {
    const networkError = new Error("Network error");
    globalThis.fetch = vi.fn().mockRejectedValue(networkError);

    await expect(openBreweryApi.fetchBreweries()).rejects.toThrow(
      "Network error",
    );
  });
});
