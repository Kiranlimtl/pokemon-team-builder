import logo from '../assets/masterball.png';
import './TitleBar.css';

const TitleBar = () => {
  return (
    <div className="title-bar">
      <div className="title-row">
        <img src={logo} alt="Pokemon Logo" />
        <h1>Pokemon Team Builder</h1>
      </div>
      <p className="subtitle">
          Build your team, analyse weaknesses & coverage
        </p>
    </div>
  );
};

export default TitleBar;
