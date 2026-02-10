import { useBreweries } from "../../hooks/useBreweries";
import { BreweryCard } from "../BreweryCard";
import "./BreweryList.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export const BreweryList = () => {
  const {
    breweries,
    loading,
    error,
    pagination,
    goToPreviousPage,
    goToNextPage,
  } = useBreweries();

  const hasPreviousPage = pagination.page > 1;
  const hasNextPage = breweries.length === pagination.per_page;

  return (
    <div className="brewery-list">
      <h1 className="brewery-list-title">Trouver une craft-beer</h1>

      {breweries.length > 0 && (
        <>
          <div className="brewery-grid">
            {breweries.map((brewery) => (
              <BreweryCard key={brewery.id} brewery={brewery} />
            ))}
          </div>

          <div className="brewery-pagination-controls">
            <Button onClick={goToPreviousPage} disabled={!hasPreviousPage}>
              Précédent
            </Button>
            <p>Page {pagination.page}</p>
            <Button
              variant="outlined"
              onClick={goToNextPage}
              disabled={!hasNextPage}
            >
              Suivant
            </Button>
          </div>
        </>
      )}

      {error && (
        <div className="brewery-error-message">
          <p>Une erreur s'est produite: {error.message}</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      )}

      {loading && breweries.length === 0 && <CircularProgress />}

      {!loading && breweries.length === 0 && (
        <div className="brewery-no-results">
          <p>Aucun résultat</p>
        </div>
      )}
    </div>
  );
};
