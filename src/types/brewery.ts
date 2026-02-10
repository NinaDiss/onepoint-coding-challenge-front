export interface Brewery {
  id: string;
  name: string;
  city: string;
  state: string | null;
  country: string;
  website_url: string | null;
}

export interface PaginationState {
  page: number;
  per_page: number;
  total: number;
}

export interface BreweryState {
  breweries: Brewery[];
  loading: boolean;
  error: Error | null;
  pagination: PaginationState;
}

export interface BreweryActions {
  fetchBreweries: (page?: number, per_page?: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setPage: (page: number) => void;
}

export type BreweryStore = BreweryState & BreweryActions;
