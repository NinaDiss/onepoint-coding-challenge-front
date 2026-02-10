import { useBreweries } from '../../hooks/useBreweries';
import { BreweryCard } from '../BreweryCard';
import './BreweryList.css';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export const BreweryList = () => {
  const {
    breweries,
    loading,
    error,
    pagination,
    goToPreviousPage,
    goToNextPage
  } = useBreweries();

  const hasPreviousPage = pagination.page > 1;
  const hasNextPage = breweries.length === pagination.per_page;

  return (
    <div className="brewery-list">
      <div className="brewery-list-header">
        <h1 className="brewery-list-title">Breweries</h1>
        <p className="brewery-list-subtitle">
          Showing {breweries.length} breweries
        </p>
      </div>

      {error && (
        <div className="error-message">
          <p>❌ Error loading breweries: {error.message}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}

      {loading && breweries.length === 0 ? (
        <CircularProgress />
      ) : (
        <>
          {breweries.length > 0 ? (
            <>
              <div className="brewery-grid">
                {breweries.map((brewery) => (
                  <BreweryCard key={brewery.id} brewery={brewery} />
                ))}
              </div>

              <div className="pagination-controls">
                <Button
                  onClick={goToPreviousPage}
                  disabled={!hasPreviousPage}
                >
                  Précédent
                </Button>
                
                <p>
                  Page {pagination.page}
                </p>

                <Button
                  variant="outlined"
                  onClick={goToNextPage}
                  disabled={!hasNextPage}
                >
                  Suivant
                </Button>
              </div>
            </>
          ) : (
            !loading && (
              <div className="no-breweries">
                <p>No breweries found.</p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};