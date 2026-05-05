import type { AnalysisProp} from '../types/types';
import { getTeamWeakness, getTeamCoverage, getTeamResistances } from '../utils/typeAnalysis';
import { getTeamRoles } from '../utils/roleAnalysis';
import { getRecommendations } from '../utils/recommendations';
import StatRadarChart from './StatRadarChart';
import "./Analysis.css";


const Analysis = ({ team } : AnalysisProp) => {
    const weaknesses = getTeamWeakness(team);
    const coverage = getTeamCoverage(team);
    const roles = getTeamRoles(team);
    const recommendations = getRecommendations(team);
    const resistances = getTeamResistances(team);

    const statLabels: Record<string, string> = {
        'hp': 'HP',
        'attack': 'ATK',
        'defense': 'DEF',
        'special-attack': 'SPA',
        'special-defense': 'SPD',
        'speed': 'SPE',
    };


    const teamTotalStats = team.length > 0 && team.every(p => p.stats?.length > 0)
        ? team[0].stats.map(stat => ({
            stat: statLabels[stat.name] || stat.name.toUpperCase(),
            value: team.reduce((sum, p) => sum + (p.stats.find(s => s.name === stat.name)?.value || 0), 0),
        }))
        : [];

    const uncovered = Object.entries(coverage)
        .filter(([_, pokemons]) => pokemons.length === 0)
        .map(([type]) => type);

    return (
    <div className="analysis-section">
      <h2>Team Weaknesses</h2>
      {Object.entries(weaknesses)
        .filter(([type, pokemons]) => pokemons.length >= 1 && resistances[type].length < 1) // Only show weaknesses that aren't fully resisted
        .sort((a, b) => b[1].length - a[1].length)
        .map(([type, pokemons]) => (
          <div key={type} className={`weakness-row ${pokemons.length >= 2 ? 'danger' : ''}`}>
            <span className={`type-badge ${type}`}>{type}</span>
            <div className="weak-pokemon-sprites">
                {pokemons.map(name => (
                    <span key={name} className="mini-name">{name}</span>
                ))}
            </div>
            <span className="weakness-count">{pokemons.length}x weak</span>
        </div>
        ))
      }
      <h2>Offensive Coverage</h2>
        {uncovered.length > 0 ? (
        <div className="uncovered">
            <p>Your team can't hit these types super effectively:</p>
            <div className="uncovered-types">
            {uncovered.map(type => (
                <span key={type} className={`type-badge ${type}`}>{type}</span>
            ))}
            </div>
        </div>
        ) : (
        <p className="all-covered">Your team has full offensive coverage!</p>
        )}

        <h2>Team Roles</h2>
        <div className="roles-list">
            {roles.map(({ name, role }) => (
            <div key={name} className="role-row">
                <span className="role-name">{name}</span>
                <span className="role-badge">{role}</span>
            </div>
            ))}
        </div>

        {teamTotalStats.length > 0 && (
            <>
                <h2>Team Total Stats</h2>
                <StatRadarChart data={teamTotalStats} />
            </>
        )}

        <h2>Recommendations</h2>
        <div className="recommendations">
            {recommendations.map((rec, i) => (
            <div key={i} className="rec-row">
                <span className="rec-icon">💡</span>
                <span>{rec}</span>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Analysis;
