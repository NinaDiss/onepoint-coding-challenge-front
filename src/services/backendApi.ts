import config from "../config";
import type { Brewery, FetchBreweriesParams } from "../types/brewery";

export const backendApi = {
  async fetchScrapedBreweries({
    page = 1,
    per_page = 20,
  }: FetchBreweriesParams = {}): Promise<Brewery[]> {
    try {
      const response = await fetch(
        `${config.backendApiUrl}?page=${page}&per_page=${per_page}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const scrapedBreweries: Brewery[] = data.breweries || [];

      return scrapedBreweries;
    } catch (error) {
      console.error("Error fetching scraped breweries:", error);
      throw error;
    }
  },
};
