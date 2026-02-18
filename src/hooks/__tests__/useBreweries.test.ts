import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBreweryStore } from "../../store/breweryStore";
import { useBreweries } from "../useBreweries";
import { mockBreweryApiResponse } from "../../services/__tests__/mocks/breweryApiResponse.mock";
import type { Brewery } from "../../types/brewery";

const mockUseBreweryStore = vi.hoisted(() => vi.fn<typeof useBreweryStore>());

vi.mock("../../store/breweryStore", () => ({
  useBreweryStore: mockUseBreweryStore,
}));

describe("useBreweries", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseBreweryStore.mockReturnValue({
      breweries: [],
      loading: false,
      error: null,
      pagination: {
        page: 1,
        per_page: 20,
        total: 0,
      },
      selectedDepartment: "",
      fetchBreweries: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      setPage: vi.fn(),
      setSelectedDepartment: vi.fn(),
    });
  });

  describe("state integration", () => {
    it("should expose all store state and actions correctly", () => {
      const mockActions = {
        fetchBreweries: vi.fn(),
        setLoading: vi.fn(),
        setError: vi.fn(),
        setPage: vi.fn(),
        setSelectedDepartment: vi.fn(),
      };

      const mockStore = {
        breweries: mockBreweryApiResponse,
        loading: false,
        error: null,
        pagination: {
          page: 1,
          per_page: 20,
          total: 0,
        },
        selectedDepartment: "75",
        ...mockActions,
      };

      mockUseBreweryStore.mockReturnValue(mockStore);

      const { result } = renderHook(() => useBreweries());

      expect(result.current.breweries).toBe(mockStore.breweries);
      expect(result.current.loading).toBe(mockStore.loading);
      expect(result.current.error).toBe(mockStore.error);
      expect(result.current.pagination).toBe(mockStore.pagination);
      expect(result.current.selectedDepartment).toBe(
        mockStore.selectedDepartment,
      );

      expect(typeof result.current.fetchBreweries).toBe("function");
      expect(typeof result.current.goToPage).toBe("function");
      expect(typeof result.current.goToNextPage).toBe("function");
      expect(typeof result.current.goToPreviousPage).toBe("function");
      expect(typeof result.current.setSelectedDepartment).toBe("function");
    });

    it("should update when store state changes", async () => {
      let storeState = {
        breweries: [] as Brewery[],
        loading: false,
        error: null,
        pagination: { page: 1, per_page: 20, total: 0 },
        selectedDepartment: "",
        fetchBreweries: vi.fn(),
        setLoading: vi.fn(),
        setError: vi.fn(),
        setPage: vi.fn(),
        setSelectedDepartment: vi.fn(),
      };

      mockUseBreweryStore.mockImplementation(() => storeState);

      const { result } = renderHook(() => useBreweries());

      // Initial state
      expect(result.current.breweries).toEqual([]);
      expect(result.current.loading).toBe(false);

      // Update store state
      storeState = {
        ...storeState,
        breweries: mockBreweryApiResponse,
        loading: true,
      };

      // Re-render to get updated values
      const { result: updatedResult } = renderHook(() => useBreweries());

      expect(updatedResult.current.breweries).toEqual(mockBreweryApiResponse);
      expect(updatedResult.current.loading).toBe(true);
    });
  });
});
