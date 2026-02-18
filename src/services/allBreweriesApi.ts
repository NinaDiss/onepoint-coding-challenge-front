import type {
  Brewery,
  FetchBreweriesParams,
  PaginationState,
} from "../types/brewery";
import { backendApi } from "./backendApi";
import { openBreweryApi } from "./openBreweryApi";

export const allBreweriesApi = {
  async fetchAllBreweries({
    page = 1,
    per_page = 20,
  }: FetchBreweriesParams = {}): Promise<{
    breweries: Brewery[];
    pagination?: PaginationState;
  }> {
    try {
      const [openBreweryBreweries, backendBreweries] = await Promise.all([
        openBreweryApi.fetchBreweries({ page, per_page }),
        backendApi.fetchScrapedBreweries({ page, per_page }),
      ]);

      const combinedBreweries = [...openBreweryBreweries, ...backendBreweries];

      return { breweries: combinedBreweries };
    } catch (error) {
      console.error("Error fetching all breweries:", error);
      throw error;
    }
  },
};
