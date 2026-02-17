import { describe, it, expect, beforeEach, vi } from "vitest";
import { allBreweriesApi } from "../allBreweriesApi";
import { openBreweryApi } from "../openBreweryApi";
import { backendApi } from "../backendApi";
import { mockBreweryApiResponse } from "./mocks/breweryApiResponse.mock";

describe("allBreweriesApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and combine breweries from both APIs successfully", async () => {
    vi.spyOn(openBreweryApi, "fetchBreweries").mockResolvedValue(
      mockBreweryApiResponse,
    );
    vi.spyOn(backendApi, "fetchScrapedBreweries").mockResolvedValue(
      mockBreweryApiResponse,
    );

    const result = await allBreweriesApi.fetchAllBreweries();

    expect(openBreweryApi.fetchBreweries).toHaveBeenCalledWith({
      page: 1,
      per_page: 20,
    });
    expect(backendApi.fetchScrapedBreweries).toHaveBeenCalledWith({
      page: 1,
      per_page: 20,
    });

    expect(result).toHaveLength(6);
    expect(result).toEqual([
      ...mockBreweryApiResponse,
      ...mockBreweryApiResponse,
    ]);
  });

  it("should pass custom parameters to both APIs", async () => {
    const customParams = { page: 2, per_page: 50 };

    vi.spyOn(openBreweryApi, "fetchBreweries").mockResolvedValue([]);
    vi.spyOn(backendApi, "fetchScrapedBreweries").mockResolvedValue([]);

    await allBreweriesApi.fetchAllBreweries(customParams);

    expect(openBreweryApi.fetchBreweries).toHaveBeenCalledWith(customParams);
    expect(backendApi.fetchScrapedBreweries).toHaveBeenCalledWith(customParams);
  });

  it("should pass default parameters when none provided", async () => {
    vi.spyOn(openBreweryApi, "fetchBreweries").mockResolvedValue([]);
    vi.spyOn(backendApi, "fetchScrapedBreweries").mockResolvedValue([]);

    await allBreweriesApi.fetchAllBreweries();

    expect(openBreweryApi.fetchBreweries).toHaveBeenCalledWith({
      page: 1,
      per_page: 20,
    });
    expect(backendApi.fetchScrapedBreweries).toHaveBeenCalledWith({
      page: 1,
      per_page: 20,
    });
  });

  it("should handle error from openBreweryApi and propagate it", async () => {
    const openBreweryError = new Error("Open Brewery API error");

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.spyOn(openBreweryApi, "fetchBreweries").mockRejectedValue(
      openBreweryError,
    );
    vi.spyOn(backendApi, "fetchScrapedBreweries").mockResolvedValue([]);

    await expect(allBreweriesApi.fetchAllBreweries()).rejects.toThrow(
      "Open Brewery API error",
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching all breweries:",
      openBreweryError,
    );

    consoleSpy.mockRestore();
  });

  it("should handle error from backendApi and propagate it", async () => {
    const backendError = new Error("Backend API error");

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.spyOn(openBreweryApi, "fetchBreweries").mockResolvedValue([]);
    vi.spyOn(backendApi, "fetchScrapedBreweries").mockRejectedValue(
      backendError,
    );

    await expect(allBreweriesApi.fetchAllBreweries()).rejects.toThrow(
      "Backend API error",
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching all breweries:",
      backendError,
    );

    consoleSpy.mockRestore();
  });

  it("should handle errors from both APIs and propagate the first error", async () => {
    const openBreweryError = new Error("Open Brewery API error");
    const backendError = new Error("Backend API error");

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.spyOn(openBreweryApi, "fetchBreweries").mockRejectedValue(
      openBreweryError,
    );
    vi.spyOn(backendApi, "fetchScrapedBreweries").mockRejectedValue(
      backendError,
    );

    await expect(allBreweriesApi.fetchAllBreweries()).rejects.toThrow(
      "Open Brewery API error",
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching all breweries:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});
