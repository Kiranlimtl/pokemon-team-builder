import type { PokemonCardProps } from '../types/types';
import { useState } from 'react';
import './PokemonCard.css';

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  return colors[type] || '#444';
};

const shortStatName = (name: string) => {
  const map: Record<string, string> = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SPA',
    'special-defense': 'SPD',
    speed: 'SPE',
  };
  return map[name] || name;
};

const PokemonCard = ({ pokemon, onRemove }: PokemonCardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="card-container"
      onClick={() => setFlipped(!flipped)}
      style={
        {
          '--type-color': getTypeColor(pokemon.types[0]),
        } as React.CSSProperties
      }
    >
      <div className={`card ${flipped ? 'flipped' : ''}`}>
        {/* Front side with stats */}
        <div
          className="card-front pokemon-card"
          style={{
            borderColor: getTypeColor(pokemon.types[0]),
            borderWidth: '4px',
            borderStyle: 'solid',
          }}
        >
          <button
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(pokemon.name);
            }}
          >
            ✕
          </button>
          <img
            className="card-image-front"
            src={pokemon.sprite}
            alt={pokemon.name}
          />
          <h3>{pokemon.name.replace(/-/g, ' ')}</h3>

          <div className="types">
            {pokemon.types.map((type) => (
              <span key={type} className={`type-badge ${type}`}>
                {type}
              </span>
            ))}
          </div>

          <div className="stats">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="stat-row">
                <span className="stat-name">{shortStatName(stat.name)}</span>
                <div className="stat-bar-bg">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${(stat.value / 255) * 100}%`,
                      background:
                        stat.value > 100
                          ? '#7AC74C'
                          : stat.value > 50
                            ? '#F7D02C'
                            : '#EE8130',
                    }}
                  />
                </div>
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back side with abilities */}
        <div
          className="card-back pokemon-card"
          style={{
            borderColor: getTypeColor(pokemon.types[0]),
            borderWidth: '4px',
            borderStyle: 'solid',
          }}
        >
          <img
            className="card-image-back"
            src={pokemon.sprite}
            alt={pokemon.name}
          />
          <h3>{pokemon.name.replace(/-/g, ' ')}</h3>
          <div className="abilities">
            {pokemon.abilities.map((ability) => (
              <span key={ability.name} className="ability">
                {ability.name.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
