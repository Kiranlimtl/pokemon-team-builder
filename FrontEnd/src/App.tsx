import { useRef, useState } from 'react';
import TitleBar from './components/TitleBar';
import SearchBar from './components/SearchBar';
import TeamDisplay from './components/TeamDisplay';
import Analysis from './components/Analysis';
import type { PokemonDetails } from './types/types';
import './App.css';

function App() {
  const [team, setTeam] = useState<PokemonDetails[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [pokemonCache, setPokemonCache] = useState<
    Record<string, PokemonDetails>
  >({});

  const focusSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      searchRef.current?.focus();
    }, 500);
  };

  const addToTeam = async (name: string) => {
    if (team.length >= 6)
      return alert('Team is full! Remove a Pokemon before adding another.');
    if (team.find((p) => p.name === name))
      return alert('Pokemon is already in your team!');

    if (pokemonCache[name]) {
      setTeam([...team, pokemonCache[name]]);
      return;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();

    const pokemon: PokemonDetails = {
      name: data.name,
      types: data.types.map((t: any) => t.type.name),
      stats: data.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      abilities: data.abilities.map((a: any) => ({ name: a.ability.name })),
      sprite: data.sprites.front_default,
    };
    setTeam([...team, pokemon]);
    setPokemonCache({ ...pokemonCache, [name]: pokemon });
  };

  const removeFromTeam = (name: string) => {
    setTeam(team.filter((p) => p.name !== name));
  };

  return (
    <div className="app">
      <TitleBar />
      <SearchBar onSelect={addToTeam} searchRef={searchRef} />
      <TeamDisplay
        team={team}
        onRemove={removeFromTeam}
        onEmptyClick={focusSearch}
      />

      {team.length > 0 && (
        <button
          className="analyse-btn"
          onClick={() => setShowAnalysis(!showAnalysis)}
        >
          {showAnalysis ? 'Hide Analysis' : 'Analyse Team'}
        </button>
      )}

      {showAnalysis && <Analysis team={team} />}
    </div>
  );
}

export default App;
