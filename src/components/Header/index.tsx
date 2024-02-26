import { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar border-b-2 border-b-slate-800">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/">Logo</a>
        </div>
        <button className="navbar-toggle" onClick={toggleNavbar}>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </button>
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/dashboard">Rifas</Link>
          <Link to="/users">Usuários</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
