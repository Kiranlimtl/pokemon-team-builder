import type { PokemonDetails } from '../types/types';
import { getTeamWeakness, getTeamCoverage } from './typeAnalysis';
import { getTeamRoles } from './roleAnalysis';

export const getRecommendations = (team: PokemonDetails[]): string[] => {
  const recommendations: string[] = [];
  const weaknesses = getTeamWeakness(team);
  const coverage = getTeamCoverage(team);
  const roles = getTeamRoles(team);

  // Check for shared weaknesses (3+ Pokemon weak to same type)
  Object.entries(weaknesses).forEach(([type, pokemons]) => {
    if (pokemons.length >= 3) {
      recommendations.push(
        `${pokemons.length} Pokemon are weak to ${type}. Consider replacing one with a Pokemon that resists ${type}.`,
      );
    }
  });

  // Check for uncovered types
  const uncovered = Object.entries(coverage)
    .filter(([_, pokemons]) => pokemons.length === 0)
    .map(([type]) => type);

  if (uncovered.length > 5) {
    recommendations.push(
      `Your team can't hit ${uncovered.length} types super effectively. Add more type variety.`,
    );
  }

  // Check for missing roles
  const roleNames = roles.map((r) => r.role);

  const hasPhysicalAttacker =
    roleNames.includes('Physical Attacker') ||
    roleNames.includes('Fast Sweeper');
  const hasSpecialAttacker = roleNames.includes('Special Attacker');
  const hasTank =
    roleNames.includes('Physical Tank') || roleNames.includes('Special Tank');
  const hasFastSweeper = roleNames.includes('Fast Sweeper');

  if (!hasPhysicalAttacker) {
    recommendations.push(
      'Your team lacks a Physical Attacker. Consider adding one for better damage output.',
    );
  }
  if (!hasSpecialAttacker) {
    recommendations.push(
      'Your team lacks a Special Attacker. Opponents with high Defense will be hard to beat.',
    );
  }
  if (!hasTank) {
    recommendations.push(
      'Your team has no defensive Pokemon. Consider adding a tank to absorb hits.',
    );
  }
  if (!hasFastSweeper) {
    recommendations.push(
      'Your team lacks a fast sweeper. You may struggle to outspeed opponents.',
    );
  }

  // Check team size
  if (team.length < 6) {
    recommendations.push(
      `Your team only has ${team.length} Pokemon. Fill all 6 slots for a complete team.`,
    );
  }

  // All good
  if (recommendations.length === 0) {
    recommendations.push('Your team looks well balanced!');
  }

  return recommendations;
};
