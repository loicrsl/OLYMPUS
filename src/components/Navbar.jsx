import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { playClickSound } from '../utils/audioManager';
import SunIcon from '../assets/icons/sun.png';
import MoonIcon from '../assets/icons/moon.png';

const Navbar = ({ isLightMode, setIsLightMode }) => {
  const toggleTheme = () => {
    playClickSound();
    setIsLightMode(!isLightMode);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">OLYMPUS</div>
      <div className="navbar-links">
        <Link to="/home" onClick={playClickSound}>Accueil</Link>
        <Link to="/portfolio" onClick={playClickSound}>Portfolio</Link>
        <Link to="/about" onClick={playClickSound}>À propos</Link>
        <Link to="/shop" onClick={playClickSound}>Shop</Link>
        <Link to="/contact" onClick={playClickSound}>Contact</Link>
      </div>
      <button className="dark-mode-toggle" onClick={toggleTheme}>
        <img src={isLightMode ? MoonIcon : SunIcon} alt="Toggle theme" className="toggle-icon" />
      </button>
    </nav>
  );
};

export default Navbar;
