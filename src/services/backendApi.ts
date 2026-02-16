import config from "../config";
import type { Brewery } from "../types/brewery";

export const backendApi = {
  async fetchScrapedBreweries(): Promise<Brewery[]> {
    try {
      const response = await fetch(config.backendApiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const scrapedBreweries: Brewery[] = await response.json();

      return scrapedBreweries;
    } catch (error) {
      console.error("Error fetching scraped breweries:", error);
      throw error;
    }
  },
};
