const config = {
  backendApiUrl:
    // Not in .env file for the coding challenge
    import.meta.env.VITE_BACKEND_API_URL ||
    "http://localhost:3000/breweries/parse",

  openBreweryApiUrl: "https://api.openbrewerydb.org/v1/breweries",
};

export default config;
