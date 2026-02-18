import { backendApi } from "../services/backendApi";
import { create } from "zustand";
import type { PostalCodeState, PostalCodeActions } from "../types/postal-codes";

export const usePostalCodesStore = create<PostalCodeState & PostalCodeActions>(
  (set) => ({
    loading: false,
    error: null,
    postalCodes: [],
    loadingPostalCodes: false,
    errorPostalCodes: null,

    fetchPostalCodes: async () => {
      try {
        set({ loadingPostalCodes: true, errorPostalCodes: null });

        const postalCodes = await backendApi.fetchPostalCodes();

        set({
          postalCodes,
          loadingPostalCodes: false,
        });
      } catch (error) {
        set({
          loadingPostalCodes: false,
          errorPostalCodes:
            error instanceof Error
              ? error
              : new Error(
                  "An unexpected error occurred while fetching postal codes",
                ),
        });
      }
    },

    setLoadingPostalCodes: (loading: boolean) =>
      set({ loadingPostalCodes: loading }),

    setErrorPostalCodes: (error: Error | null) =>
      set({ errorPostalCodes: error }),
  }),
);
