// src/utils/__tests__/typeAnalysis.test.ts
import { getTeamWeakness, getMultiplier, getPokemonWeakness, getTeamCoverage, getTeamResistances } from '../typeAnalysis';

const makePokemon = (name: string, types: string[]) => ({
    name,
    types,
    stats: [],
    sprite: '',
    id: 1,
    abilities: []
});

// getMultiplier
test('fire is weak to water', () => {
    expect(getMultiplier('fire', 'water')).toBe(2);
})

test('fire resist grass', () => {
    expect(getMultiplier('fire', 'grass')).toBe(0.5);
})

test('normal is immune to ghost', () => {
    expect(getMultiplier('normal', 'ghost')).toBe(0);
})

test('fire takes neutral from normal', () => {
    expect(getMultiplier('fire', 'normal')).toBe(1);
})

//getPokemonWeakness
test('dual type water/ground has 4x weakness to grass', () =>{
    const result = getPokemonWeakness(['water', 'ground']);
    expect(result['grass']).toBe(4);
})

test('dual type water/ground is immune to electric', () => {
    const result = getPokemonWeakness(['water', 'ground']);
    expect(result['electric']).toBe(0);
});

// getTeamWeakness
test('fire pokemon shows water weakness', () => {
    const team = [makePokemon('charmander', ['fire'])];
    const weaknesses = getTeamWeakness(team);
    expect(weaknesses['water']).toContain('charmander');
});

test('multiple fire pokemon all show rock weakness', () => {
    const team = [
        makePokemon('charmander', ['fire']),
        makePokemon('torchic', ['fire'])
    ];
    const weaknesses = getTeamWeakness(team);
    expect(weaknesses['rock']).toContain('charmander');
    expect(weaknesses['rock']).toContain('torchic');
    expect(weaknesses['rock'].length).toBe(2);
});

// getTeamCoverage
test('fire pokemon covers grass type', () => {
    const team = [makePokemon('charmander', ['fire'])];
    const coverage = getTeamCoverage(team);
    expect(coverage['grass']).toContain('charmander');
});

test('empty team has no coverage', () => {
    const coverage = getTeamCoverage([]);
    expect(coverage['grass']).toEqual([]);
});

// getTeamResistances
test('fire pokemon resists grass', () => {
    const team = [makePokemon('charmander', ['fire'])];
    const resistances = getTeamResistances(team);
    expect(resistances['grass']).toContain('charmander');
});

test('water/ground resists rock', () => {
    const team = [makePokemon('swampert', ['water', 'ground'])];
    const resistances = getTeamResistances(team);
    expect(resistances['rock']).toContain('swampert');
});
