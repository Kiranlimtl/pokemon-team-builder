export type PokemonDetails = {
  name: string;
  types: string[];
  stats: { name: string; value: number }[];
  abilities: { name: string }[];
  sprite: string;
}

export type TeamDisplayProps = {
  team: PokemonDetails[];
  onRemove: (name: string) => void;
  onEmptyClick: () => void;
}

export type PokemonCardProps = {
  pokemon: PokemonDetails;
  onRemove: (name: string) => void;
}

export type Pokemon = {
    name: string;
    url: string;
};

export type SearchBarProps = {
    onSelect: (name: string) => void;
    searchRef: React.RefObject<HTMLInputElement | null>;
};

export type AnalysisProp = {
  team: PokemonDetails[];
}

export const ALL_TYPES = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]