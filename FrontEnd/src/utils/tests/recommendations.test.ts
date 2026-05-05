import { getRecommendations } from '../recommendations';

const makePokemon = (
  name: string,
  types: string[],
  stats: Record<string, number> = {},
) => ({
  name,
  types,
  sprite: '',
  id: 1,
  abilities: [],
  stats: Object.entries(stats).map(([name, value]) => ({ name, value })),
});

const defaultStats = {
  hp: 80,
  attack: 80,
  defense: 80,
  'special-attack': 80,
  'special-defense': 80,
  speed: 80,
};

test('warns when 3+ pokemon share a weakness', () => {
  const team = [
    makePokemon('charmander', ['fire'], defaultStats),
    makePokemon('torchic', ['fire'], defaultStats),
    makePokemon('chimchar', ['fire'], defaultStats),
  ];
  const recs = getRecommendations(team);
  expect(recs.some((r) => r.includes('weak to water'))).toBe(true);
});

test('warns about incomplete team', () => {
  const team = [makePokemon('pikachu', ['electric'], defaultStats)];
  const recs = getRecommendations(team);
  expect(recs.some((r) => r.includes('only has 1 Pokemon'))).toBe(true);
});

test('warns when no physical attacker', () => {
  const team = [
    makePokemon('blissey', ['normal'], {
      hp: 255,
      attack: 10,
      defense: 10,
      'special-attack': 75,
      'special-defense': 135,
      speed: 55,
    }),
  ];
  const recs = getRecommendations(team);
  expect(recs.some((r) => r.includes('Physical Attacker'))).toBe(true);
});

test('warns when no tank', () => {
  const team = [
    makePokemon('greninja', ['water', 'dark'], {
      hp: 72,
      attack: 95,
      defense: 67,
      'special-attack': 103,
      'special-defense': 71,
      speed: 122,
    }),
  ];
  const recs = getRecommendations(team);
  expect(recs.some((r) => r.includes('no defensive Pokemon'))).toBe(true);
});

test('warns when no fast sweeper', () => {
  const team = [
    makePokemon('machamp', ['fighting'], {
      hp: 90,
      attack: 130,
      defense: 80,
      'special-attack': 65,
      'special-defense': 85,
      speed: 55,
    }),
  ];
  const recs = getRecommendations(team);
  expect(recs.some((r) => r.includes('fast sweeper'))).toBe(true);
});

test('well balanced team returns positive message', () => {
  const team = [
    makePokemon('garchomp', ['dragon', 'ground'], {
      hp: 108,
      attack: 130,
      defense: 95,
      'special-attack': 80,
      'special-defense': 85,
      speed: 102,
    }),
    makePokemon('gengar', ['ghost', 'poison'], {
      hp: 60,
      attack: 65,
      defense: 60,
      'special-attack': 130,
      'special-defense': 75,
      speed: 110,
    }),
    makePokemon('skarmory', ['steel', 'flying'], {
      hp: 65,
      attack: 80,
      defense: 140,
      'special-attack': 40,
      'special-defense': 70,
      speed: 70,
    }),
    makePokemon('blissey', ['normal'], {
      hp: 255,
      attack: 10,
      defense: 10,
      'special-attack': 75,
      'special-defense': 135,
      speed: 55,
    }),
    makePokemon('rotom', ['electric', 'water'], {
      hp: 50,
      attack: 65,
      defense: 107,
      'special-attack': 105,
      'special-defense': 107,
      speed: 86,
    }),
    makePokemon('togekiss', ['fairy', 'flying'], {
      hp: 85,
      attack: 50,
      defense: 95,
      'special-attack': 120,
      'special-defense': 115,
      speed: 80,
    }),
  ];
  const recs = getRecommendations(team);
  console.log(recs);
  expect(recs).toContain('Your team looks well balanced!');
});
