export interface Brewery {
  id: string;
  name: string;
  brewery_type: BreweryType;
  street: string | null;
  city: string;
  state: string | null;
  postal_code: string | null;
  country: string;
  longitude: number | null;
  latitude: number | null;
  phone: string | null;
  website_url: string | null;
  state_province: string | null;
  created_at: Date;
  updated_at: Date;
}

type BreweryType = 'micro' | 'nano' | 'regional' | 'brewpub' | 'large' | 'planning' | 'bar' | 'contract' | 'proprietor' | 'closed';

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