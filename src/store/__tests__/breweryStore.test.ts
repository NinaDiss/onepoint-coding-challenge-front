import { describe, it, expect, beforeEach, vi } from "vitest";
import { useBreweryStore } from "../breweryStore";

const resetStore = () => {
  useBreweryStore.setState({
    breweries: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      per_page: 20,
      total: 0,
    },
    selectedDepartment: "",
  });
};

describe("useBreweryStore", () => {
  beforeEach(() => {
    resetStore();
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should have correct default values", () => {
      const state = useBreweryStore.getState();

      expect(state.breweries).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.pagination).toEqual({
        page: 1,
        per_page: 20,
        total: 0,
      });
      expect(state.selectedDepartment).toBe("");
    });
  });

  describe("setLoading", () => {
    it("should update loading state to true", () => {
      useBreweryStore.getState().setLoading(true);

      const state = useBreweryStore.getState();
      expect(state.loading).toBe(true);
    });

    it("should update loading state to false", () => {
      useBreweryStore.getState().setLoading(true);

      useBreweryStore.getState().setLoading(false);

      const state = useBreweryStore.getState();
      expect(state.loading).toBe(false);
    });
  });

  describe("setError", () => {
    it("should update error state with Error object", () => {
      const testError = new Error("Test error");
      useBreweryStore.getState().setError(testError);

      const state = useBreweryStore.getState();
      expect(state.error).toBe(testError);
    });
  });

  describe("setPage", () => {
    it("should update pagination page", () => {
      useBreweryStore.getState().setPage(5);

      const state = useBreweryStore.getState();
      expect(state.pagination.page).toBe(5);
      expect(state.pagination.per_page).toBe(20);
      expect(state.pagination.total).toBe(0);
    });

    it("should preserve other pagination properties", () => {
      useBreweryStore.getState().setPage(1);

      const initialState = useBreweryStore.getState().pagination;

      useBreweryStore.getState().setPage(3);

      const newState = useBreweryStore.getState().pagination;

      expect(newState.page).toBe(3);
      expect(newState.per_page).toBe(initialState.per_page);
      expect(newState.total).toBe(initialState.total);
    });
  });

  describe("setSelectedDepartment", () => {
    it("should update selected department", () => {
      useBreweryStore.getState().setSelectedDepartment("75");

      const state = useBreweryStore.getState();
      expect(state.selectedDepartment).toBe("75");
    });

    it("should reset pagination page to 1 and preserve other properties when department changes", () => {
      useBreweryStore.getState().setPage(5);

      const initialPaginationState = useBreweryStore.getState().pagination;

      useBreweryStore.getState().setSelectedDepartment("75");

      const state = useBreweryStore.getState();

      expect(state.selectedDepartment).toBe("75");

      expect(state.pagination.page).toBe(1);
      expect(state.pagination.per_page).toBe(initialPaginationState.per_page);
      expect(state.pagination.total).toBe(initialPaginationState.total);
    });
  });
});
