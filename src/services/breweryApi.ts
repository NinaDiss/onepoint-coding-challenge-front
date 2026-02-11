import type { Brewery } from "../types/brewery";

const API_BASE_URL = "https://api.openbrewerydb.org/v1/breweries";

interface FetchBreweriesParams {
  page?: number;
  per_page?: number;
}

export const breweryApi = {
  async fetchBreweries({
    page = 1,
    per_page = 20,
  }: FetchBreweriesParams = {}): Promise<Brewery[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}?page=${page}&per_page=${per_page}&by_country=france`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const breweries: Brewery[] = await response.json();
      return breweries;
    } catch (error) {
      console.error("Error fetching breweries:", error);
      throw error;
    }
  },
};
