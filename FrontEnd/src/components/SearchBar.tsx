import { useState, useEffect } from 'react';
import type { Pokemon, SearchBarProps } from '../types/types';
import './SearchBar.css';

const SearchBar = ({ onSelect, searchRef }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filtered, setFiltered] = useState<Pokemon[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch all pokemon names on load
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10000000')
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, []);

  // Filter as user types
  useEffect(() => {
    if (query.length < 2) {
      setFiltered([]);
      return;
    }
    const matches = pokemonList
      .filter((pokemon) => pokemon.name.includes(query.toLowerCase()))
      .slice(0, 8);
    setFiltered(matches.slice(0, 10)); // Limit to top 10 matches
  }, [query, pokemonList]);

  return (
    <div
      className="search-bar"
      onBlur={() => setTimeout(() => setIsOpen(false), 200)}
    >
      <input
        ref={searchRef}
        type="text"
        placeholder="Search Pokemon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filtered.length > 0 && (
        <ul className="search-results">
          {filtered.map((pokemon) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return (
              <li
                key={pokemon.name}
                onClick={() => {
                  onSelect(pokemon.name);
                  setQuery('');
                  setFiltered([]);
                  setIsOpen(false);
                }}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                />
                {pokemon.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
