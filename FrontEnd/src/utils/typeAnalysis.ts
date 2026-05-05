import { typeChart } from "./typeChart";
import { ALL_TYPES } from "../types/types";
import type { PokemonDetails } from "../types/types";

export const getMultiplier = (defendingType: string, attackingType: string): number => {
    const chart = typeChart[defendingType];
    if (chart.immuneTo.includes(attackingType)) return 0;
    if (chart.weakTo.includes(attackingType)) return 2;
    if (chart.resistantTo.includes(attackingType)) return 0.5;
    return 1;
};

export const getPokemonWeakness = (types: string[]) => {
    const result: Record<string, number> = {};
    ALL_TYPES.forEach(attackingType => {
        let multiplier = 1;
        types.forEach(defendingType => {
            multiplier *= getMultiplier(defendingType, attackingType);
        });
        result[attackingType] = multiplier;
    });
    return result;
}

export const getTeamWeakness = (team: PokemonDetails[]) => {
    const weaknesses: Record<string, string[]> = {};

    ALL_TYPES.forEach(type => {
    weaknesses[type] = [];
  });

  team.forEach(pokemon => {
    const multipliers = getPokemonWeakness(pokemon.types);
    ALL_TYPES.forEach(type => {
      if (multipliers[type] >= 2) {
        weaknesses[type].push(pokemon.name);
      }
    });
  });

  return weaknesses;
  // Returns: { ground: ['pikachu', 'charizard'], rock: ['charizard'], ... }
};

export const getTeamCoverage = (team: PokemonDetails[]) => {
  const coverage: Record<string, string[]> = {};

  ALL_TYPES.forEach(type => {
    coverage[type] = [];
  });

  team.forEach(pokemon => {
    pokemon.types.forEach(attackingType => {
      ALL_TYPES.forEach(defendingType => {
        const chart = typeChart[defendingType];
        if (chart.weakTo.includes(attackingType)) {
          if (!coverage[defendingType].includes(pokemon.name)) {
            coverage[defendingType].push(pokemon.name);
          }
        }
      });
    });
  });

  return coverage;
  // Returns: { grass: ['charizard'], ice: ['charizard'], water: ['pikachu'], ... }
};

export const getTeamResistances = (team: PokemonDetails[]) => {
  const resistances: Record<string, string[]> = {};

  ALL_TYPES.forEach(type => {
    resistances[type] = [];
  });

  team.forEach(pokemon => {
    const multipliers = getPokemonWeakness(pokemon.types);
    ALL_TYPES.forEach(type => {
      if (multipliers[type] < 1) {
        resistances[type].push(pokemon.name);
      }
    });
  });

  return resistances;
};