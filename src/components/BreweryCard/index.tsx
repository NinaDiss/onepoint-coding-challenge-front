import type { Brewery } from "../../types/brewery";
import "./BreweryCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface BreweryCardProps {
  brewery: Brewery;
}

export const BreweryCard = ({ brewery }: BreweryCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <h2 className="brewery-name">{brewery.name}</h2>
        <p className="brewery-text">
          Département : {brewery.postal_code.slice(0, 2)}
        </p>
      </CardContent>
    </Card>
  );
};
