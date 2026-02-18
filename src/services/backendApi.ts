import config from "../config";
import type { Brewery, FetchBreweriesParams } from "../types/brewery";
import type { PostalCode } from "../types/postal-codes";

export const backendApi = {
  async fetchScrapedBreweries({
    page = 1,
    per_page = 20,
  }: FetchBreweriesParams = {}): Promise<Brewery[]> {
    try {
      const response = await fetch(
        `${config.backendApiUrl}/parse?page=${page}&per_page=${per_page}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data: breweries } = await response.json();
      const scrapedBreweries: Brewery[] = breweries || [];

      return scrapedBreweries;
    } catch (error) {
      console.error("Error fetching scraped breweries:", error);
      throw error;
    }
  },

  async fetchPostalCodes(): Promise<PostalCode[]> {
    try {
      const response = await fetch(`${config.backendApiUrl}/postal-codes`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const postalCodes: PostalCode[] = await response.json();
      return postalCodes;
    } catch (error) {
      console.error("Error fetching postal codes:", error);
      throw error;
    }
  },
};
