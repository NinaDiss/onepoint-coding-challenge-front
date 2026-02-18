import { create } from "zustand";
import type { BreweryStore } from "../types/brewery";
import { allBreweriesApi } from "../services/allBreweriesApi";

export const useBreweryStore = create<BreweryStore>((set) => ({
  breweries: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    per_page: 20,
    total: 0,
    last_page: 0,
    has_next_page: false,
    has_previous_page: false,
  },

  selectedDepartment: "",

  setLoading: (loading: boolean) => set({ loading }),

  setError: (error: Error | null) => set({ error }),

  setPage: (page: number) =>
    set((state) => ({
      pagination: { ...state.pagination, page },
    })),

  setSelectedDepartment: (department: string) =>
    set((state) => ({
      selectedDepartment: department,
      pagination: { ...state.pagination, page: 1 },
    })),

  fetchBreweries: async (page = 1, per_page = 20) => {
    try {
      set({ loading: true, error: null });

      const { breweries } = await allBreweriesApi.fetchAllBreweries({
        page,
        per_page,
      });

      // For now, we'll estimate pagination since Open Brewery API doesn't provide it
      // When we have backend pagination data, we can use that instead
      const hasMore = breweries.length === per_page;
      const estimatedTotal = hasMore
        ? page * per_page + per_page
        : page * per_page;

      set({
        breweries,
        loading: false,
        pagination: {
          page,
          per_page,
          total: estimatedTotal,
          last_page: Math.ceil(estimatedTotal / per_page),
          has_next_page: hasMore,
          has_previous_page: page > 1,
        },
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error("An unexpected error occurred"),
      });
    }
  },
}));
