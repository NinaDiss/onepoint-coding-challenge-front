import type { Brewery } from '../../types/brewery';
import './BreweryCard.css';

interface BreweryCardProps {
  brewery: Brewery;
}

export const BreweryCard = ({ brewery }: BreweryCardProps) => {
  return (
    <div className="brewery-card">
      <div className="brewery-card-header">
        <h3 className="brewery-name">{brewery.name}</h3>
        <span className={`brewery-type ${brewery.brewery_type}`}>
          {brewery.brewery_type}
        </span>
      </div>
      
      <div className="brewery-card-body">
        <div className="brewery-location">
          <span className="location-icon">📍</span>
          <div className="location-text">
            <span className="city">{brewery.city}</span>
            {brewery.state && <span className="separator">,</span>}
            {brewery.state && <span className="state">{brewery.state}</span>}
            <span className="country">, {brewery.country}</span>
          </div>
        </div>
        
        {brewery.website_url && (
          <a 
            href={brewery.website_url} 
            className="website-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
};