import type { TeamDisplayProps } from '../types/types';
import PokemonCard from './PokemonCard';
import './TeamDisplay.css';

const TeamDisplay = ({ team, onRemove, onEmptyClick }: TeamDisplayProps) => {
  const emtpySlots = 6 - team.length;

  return (
    <div className="team-display">
      {team.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} onRemove={onRemove} />
      ))}

      {Array.from({ length: emtpySlots }).map((_, idx) => (
        <div key={`empty-${idx}`} className="empty-slot" onClick={onEmptyClick}>
          <span className="empty-plus">+</span>
          <p>Add Pokemon</p>
        </div>
      ))}
    </div>
  );
};

export default TeamDisplay;
