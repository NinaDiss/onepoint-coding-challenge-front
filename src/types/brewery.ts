export interface Brewery {
  id: string;
  name: string;
  postal_code: string;
}

export interface FetchBreweriesParams {
  page?: number;
  per_page?: number;
}
export interface PaginationState {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface BreweryState {
  breweries: Brewery[];
  loading: boolean;
  error: Error | null;
  pagination: PaginationState;
  selectedDepartment: string;
}

export interface BreweryActions {
  fetchBreweries: (page?: number, per_page?: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setPage: (page: number) => void;
  setSelectedDepartment: (department: string) => void;
}

export type BreweryStore = BreweryState & BreweryActions;
