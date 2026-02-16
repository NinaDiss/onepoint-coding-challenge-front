import type { Brewery, FetchBreweriesParams } from "../types/brewery";
import config from "../config";

export const openBreweryApi = {
  async fetchBreweries({
    page = 1,
    per_page = 20,
  }: FetchBreweriesParams = {}): Promise<Brewery[]> {
    try {
      const response = await fetch(
        `${config.openBreweryApiUrl}?page=${page}&per_page=${per_page}&by_country=france`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const breweries: Brewery[] = await response.json();

      return breweries;
    } catch (error) {
      console.error("Error fetching breweries from Open Brewery DB:", error);
      throw error;
    }
  },
};
