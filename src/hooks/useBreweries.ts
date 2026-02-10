import { useEffect, useCallback } from 'react';
import { useBreweryStore } from '../store/breweryStore';

export const useBreweries = () => {
  const {
    breweries,
    loading,
    error,
    pagination,
    fetchBreweries,
    setPage
  } = useBreweryStore();

  const fetchBreweriesData = useCallback(async (page?: number, per_page?: number) => {
    await fetchBreweries(page, per_page);
  }, [fetchBreweries]);

  const goToPage = (page: number) => {
    setPage(page);
    fetchBreweries(page, pagination.per_page);
  };

  const goToNextPage = () => {
    if (breweries.length === pagination.per_page) {
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

  return {
    breweries,
    loading,
    error,
    pagination,
    fetchBreweries: fetchBreweriesData,
    goToPage,
    goToNextPage,
    goToPreviousPage
  };
};