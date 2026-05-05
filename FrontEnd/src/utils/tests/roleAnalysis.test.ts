import { getRole, getTeamRoles } from '../roleAnalysis';

const makePokemon = (name: string, stats: Record<string, number>) => ({
  name,
  types: [],
  sprite: '',
  id: 1,
  abilities: [],
  stats: Object.entries(stats).map(([name, value]) => ({ name, value })),
});

test('high speed and attack is Fast Sweeper', () => {
  const pokemon = makePokemon('greninja', {
    hp: 72,
    attack: 95,
    defense: 67,
    'special-attack': 103,
    'special-defense': 71,
    speed: 122,
  });
  expect(getRole(pokemon)).toBe('Fast Sweeper');
});

test('high physical bulk is Physical Tank', () => {
  const pokemon = makePokemon('skarmory', {
    hp: 75,
    attack: 85,
    defense: 200,
    'special-attack': 55,
    'special-defense': 65,
    speed: 30,
  });
  expect(getRole(pokemon)).toBe('Physical Tank');
});

test('high special bulk is Special Tank', () => {
  const pokemon = makePokemon('blissey', {
    hp: 255,
    attack: 10,
    defense: 10,
    'special-attack': 75,
    'special-defense': 135,
    speed: 55,
  });
  expect(getRole(pokemon)).toBe('Special Tank');
});

test('high attack is Physical Attacker', () => {
  const pokemon = makePokemon('machamp', {
    hp: 90,
    attack: 130,
    defense: 80,
    'special-attack': 65,
    'special-defense': 85,
    speed: 55,
  });
  expect(getRole(pokemon)).toBe('Physical Attacker');
});

test('high special attack is Special Attacker', () => {
  const pokemon = makePokemon('alakazam', {
    hp: 55,
    attack: 50,
    defense: 45,
    'special-attack': 135,
    'special-defense': 95,
    speed: 120,
  });
  expect(getRole(pokemon)).toBe('Fast Sweeper'); // speed 120 + spa 135 triggers Fast Sweeper first
});

test('average stats returns Balanced', () => {
  const pokemon = makePokemon('mew', {
    hp: 100,
    attack: 100,
    defense: 100,
    'special-attack': 100,
    'special-defense': 100,
    speed: 100,
  });
  expect(getRole(pokemon)).toBe('Balanced');
});

test('getTeamRoles returns role for each pokemon', () => {
  const team = [
    makePokemon('machamp', {
      hp: 90,
      attack: 130,
      defense: 80,
      'special-attack': 65,
      'special-defense': 85,
      speed: 55,
    }),
    makePokemon('mew', {
      hp: 100,
      attack: 100,
      defense: 100,
      'special-attack': 100,
      'special-defense': 100,
      speed: 100,
    }),
  ];
  const roles = getTeamRoles(team);
  expect(roles).toHaveLength(2);
  expect(roles[0]).toEqual({ name: 'machamp', role: 'Physical Attacker' });
  expect(roles[1]).toEqual({ name: 'mew', role: 'Balanced' });
});
