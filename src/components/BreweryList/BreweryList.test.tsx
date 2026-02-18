import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BreweryList } from "./index";
import { useBreweries } from "../../hooks/useBreweries";

const mockUseBreweries = vi.hoisted(() => vi.fn<typeof useBreweries>());

vi.mock("../../hooks/useBreweries", () => ({
  useBreweries: mockUseBreweries,
}));

describe("BreweryList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render brewery list with title and department filter", () => {
    mockUseBreweries.mockReturnValue({
      breweries: [],
      loading: false,
      error: null,
      pagination: {
        page: 1,
        per_page: 20,
        total: 0,
        last_page: 0,
        has_next_page: false,
        has_previous_page: false,
      },
      selectedDepartment: "",
      goToPreviousPage: vi.fn(),
      goToNextPage: vi.fn(),
      setSelectedDepartment: vi.fn(),
      fetchBreweries: vi.fn(),
      goToPage: vi.fn(),
      postalCodes: [],
      loadingPostalCodes: false,
      errorPostalCodes: null,
    });

    render(<BreweryList />);

    const title = screen.getByText("Trouver une craft-beer");
    expect(title).toBeInTheDocument();

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const label = screen.getByText("Département");
    expect(label).toBeInTheDocument();

    const noResultsMessage = screen.getByText("Aucun résultat");
    expect(noResultsMessage).toBeInTheDocument();
  });

  it("should render breweries and handle department filtering", () => {
    const mockBreweries = [
      { id: "1", name: "Brewery A", postal_code: "75001" },
      { id: "2", name: "Brewery B", postal_code: "75002" },
      { id: "3", name: "Brewery C", postal_code: "33" },
    ];

    mockUseBreweries.mockReturnValue({
      breweries: mockBreweries,
      loading: false,
      error: null,
      pagination: {
        page: 1,
        per_page: 20,
        total: 3,
        last_page: 1,
        has_next_page: false,
        has_previous_page: false,
      },
      selectedDepartment: "",
      goToPreviousPage: vi.fn(),
      goToNextPage: vi.fn(),
      setSelectedDepartment: vi.fn(),
      fetchBreweries: vi.fn(),
      goToPage: vi.fn(),
      postalCodes: ["75", "33"],
      loadingPostalCodes: false,
      errorPostalCodes: null,
    });

    render(<BreweryList />);

    expect(screen.getByText("Brewery A")).toBeInTheDocument();
    expect(screen.getByText("Brewery B")).toBeInTheDocument();
    expect(screen.getByText("Brewery C")).toBeInTheDocument();

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    expect(screen.getByText("Précédent")).toBeInTheDocument();
    expect(screen.getByText("Suivant")).toBeInTheDocument();
    expect(screen.getByText("Page 1")).toBeInTheDocument();
  });
});
