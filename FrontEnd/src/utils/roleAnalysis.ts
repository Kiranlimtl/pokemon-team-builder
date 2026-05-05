import type { PokemonDetails } from '../types/types';

export type Role =
  | 'Physical Attacker'
  | 'Special Attacker'
  | 'Physical Tank'
  | 'Special Tank'
  | 'Fast Sweeper'
  | 'Balanced';

export const getRole = (pokemon: PokemonDetails): Role => {
  const getStat = (name: string) =>
    pokemon.stats.find((s) => s.name === name)?.value || 0;

  const hp = getStat('hp');
  const atk = getStat('attack');
  const def = getStat('defense');
  const spa = getStat('special-attack');
  const spd = getStat('special-defense');
  const spe = getStat('speed');

  const bulk = hp + def + spd; // total defensive stats

  if (spe > 100 && (atk > 90 || spa > 90)) return 'Fast Sweeper';
  if (bulk > 300 && def > spd) return 'Physical Tank';
  if (bulk > 300 && spd >= def) return 'Special Tank';
  if (atk > spa && atk > 90) return 'Physical Attacker';
  if (spa > atk && spa > 90) return 'Special Attacker';
  return 'Balanced';
};

export const getTeamRoles = (team: PokemonDetails[]) => {
  return team.map((pokemon) => ({
    name: pokemon.name,
    role: getRole(pokemon),
  }));
};
