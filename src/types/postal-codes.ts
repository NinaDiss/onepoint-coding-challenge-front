export type PostalCode = string;

export interface PostalCodeState {
  postalCodes: string[];
  loadingPostalCodes: boolean;
  errorPostalCodes: Error | null;
}

export interface PostalCodeActions {
  fetchPostalCodes: () => Promise<void>;
  setLoadingPostalCodes: (loading: boolean) => void;
  setErrorPostalCodes: (error: Error | null) => void;
}
