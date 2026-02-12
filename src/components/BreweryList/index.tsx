import { useBreweries } from "../../hooks/useBreweries";
import { BreweryCard } from "../BreweryCard";
import "./BreweryList.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export const BreweryList = () => {
  const {
    breweries,
    loading,
    error,
    pagination,
    uniqueDepartmentsNumber,
    selectedDepartment,
    goToPreviousPage,
    goToNextPage,
    setSelectedDepartment,
  } = useBreweries();

  const filteredBreweries = selectedDepartment
    ? breweries.filter((brewery) => brewery.department === selectedDepartment)
    : breweries;

  const hasPreviousPage = pagination.page > 1;
  const hasNextPage = filteredBreweries.length === pagination.per_page;

  return (
    <div className="brewery-list">
      <div className="brewery-list-header">
        <h1 className="brewery-list-title">Trouver une craft-beer</h1>

        <FormControl fullWidth>
          <InputLabel id="select-label">Département</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={selectedDepartment}
            label="Department"
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <MenuItem value="">
              <em>Tous les départements</em>
            </MenuItem>
            {uniqueDepartmentsNumber.map((department) => (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {filteredBreweries.length > 0 && (
        <>
          <div className="brewery-grid">
            {filteredBreweries.map((brewery) => (
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
