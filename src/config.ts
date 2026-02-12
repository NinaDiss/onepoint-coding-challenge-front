// Environment configuration
const config = {
  // Backend API URL - can be overridden by environment variables
  backendApiUrl:
    import.meta.env.VITE_BACKEND_API_URL ||
    "http://localhost:3000/breweries/parse",

  // Open Brewery DB API URL
  openBreweryApiUrl: "https://api.openbrewerydb.org/v1/breweries",
};

export default config;
