import { useEffect } from "react";
import { usePostalCodesStore } from "../store/postalCodesStore";

export const usePostalCodes = () => {
  const {
    postalCodes,
    loadingPostalCodes,
    errorPostalCodes,
    fetchPostalCodes,
  } = usePostalCodesStore();

  useEffect(() => {
    fetchPostalCodes();
  }, [fetchPostalCodes]);

  return {
    postalCodes,
    loadingPostalCodes,
    errorPostalCodes,
  };
};
