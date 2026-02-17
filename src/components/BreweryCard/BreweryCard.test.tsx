import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BreweryCard } from "./index";
import type { Brewery } from "../../types/brewery";

describe("BreweryCard", () => {
  const mockBrewery: Brewery = {
    id: "123",
    name: "Brasserie Artisanale de Paris",
    postal_code: "75001",
  };

  it("should display brewery name and department from postal code correctly", () => {
    render(<BreweryCard brewery={mockBrewery} />);

    const breweryName = screen.getByText("Brasserie Artisanale de Paris");
    expect(breweryName).toBeInTheDocument();
    expect(breweryName).toHaveClass("brewery-name");

    const departmentText = screen.getByText("Département : 75");
    expect(departmentText).toBeInTheDocument();
    expect(departmentText).toHaveClass("brewery-text");
  });
});
