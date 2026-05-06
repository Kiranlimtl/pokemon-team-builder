import logo from '../assets/masterball.png';
import './TitleBar.css';

const TitleBar = () => {
  return (
    <div className="title-bar">
      <img src={logo} alt="Pokemon Logo" />
      <div>
        <h1>Pokemon Team Builder</h1>
        <p className="subtitle">Build your team, analyse weaknesses & coverage</p>
      </div>
    </div>
  );
};

export default TitleBar;
