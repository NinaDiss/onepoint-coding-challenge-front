import { useEffect, useCallback, useMemo } from "react";
import { useBreweryStore } from "../store/breweryStore";
import type { Brewery } from "../types/brewery";

export const useBreweries = () => {
  const {
    breweries,
    loading,
    error,
    pagination,
    fetchBreweries,
    setPage,
    selectedDepartment,
    setSelectedDepartment,
  } = useBreweryStore();

  const fetchBreweriesData = useCallback(
    async (page?: number, per_page?: number) => {
      await fetchBreweries(page, per_page);
    },
    [fetchBreweries],
  );

  const goToPage = (page: number) => {
    setPage(page);
    fetchBreweries(page, pagination.per_page);
  };

  const goToNextPage = () => {
    if (breweries.length >= pagination.per_page) {
      goToPage(pagination.page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pagination.page > 1) {
      goToPage(pagination.page - 1);
    }
  };

  useEffect(() => {
    fetchBreweriesData();
  }, [fetchBreweriesData]);

  const extractUniqueDepartments = (breweries: Brewery[]): string[] => {
    return Array.from(
      new Set(
        breweries
          .map((brewery) => brewery.postal_code.slice(0, 2))
          .filter(
            (dept): dept is string => dept !== null && dept.trim() !== "",
          ),
      ),
    ).sort();
  };

  const uniqueDepartmentsNumber = useMemo(
    () => extractUniqueDepartments(breweries),
    [breweries],
  );

  return {
    breweries,
    loading,
    error,
    pagination,
    uniqueDepartmentsNumber,
    selectedDepartment,
    fetchBreweries: fetchBreweriesData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    setSelectedDepartment,
  };
};
