import { useBreweries } from '../../hooks/useBreweries';
import { BreweryCard } from '../BreweryCard';
import { LoadingSpinner } from '../LoadingSpinner';
import './BreweryList.css';

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
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {loading && breweries.length === 0 ? (
        <LoadingSpinner />
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
                <button
                  className={`pagination-button ${!hasPreviousPage ? 'disabled' : ''}`}
                  onClick={goToPreviousPage}
                  disabled={!hasPreviousPage}
                >
                  ← Previous
                </button>
                
                <span className="page-info">
                  Page {pagination.page}
                </span>

                <button
                  className={`pagination-button ${!hasNextPage ? 'disabled' : ''}`}
                  onClick={goToNextPage}
                  disabled={!hasNextPage}
                >
                  Next →
                </button>
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