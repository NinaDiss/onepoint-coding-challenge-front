import { CardActions } from '@mui/material';
import type { Brewery } from '../../types/brewery';
import './BreweryCard.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface BreweryCardProps {
  brewery: Brewery;
}

export const BreweryCard = ({ brewery }: BreweryCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <h3 className="brewery-name">{brewery.name}</h3>
        <p className="city">{brewery.city}
          {brewery.state && <span className="state">, {brewery.state}</span>}
          <span className="country">, {brewery.country}</span>
        </p>
      </CardContent>
      
      {brewery.website_url && (
        <CardActions>
          <Button
            variant="contained"
            href={brewery.website_url} 
            target="_blank"
            rel="noopener noreferrer"
            >
            Voir le site web
          </Button>
        </CardActions>
      )}
    </Card>
  );
};