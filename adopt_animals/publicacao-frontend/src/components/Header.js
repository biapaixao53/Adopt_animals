import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Função para verificar o token e atualizar o estado
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    // Verifica ao montar o componente
    checkLoginStatus();

    // OUVIR EVENTOS:
    // 1. 'loginChange' (evento manual que dispararemos no Login.js)
    // 2. 'storage' (para mudanças vindas de outras abas)
    window.addEventListener("loginChange", checkLoginStatus);
    window.addEventListener("storage", checkLoginStatus);

    // Fechar menu ao clicar fora dele
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("loginChange", checkLoginStatus);
      window.removeEventListener("storage", checkLoginStatus);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/publicacao/api/logout/');
    } catch (error) {
      console.error('Logout failed notification to server:', error);
    } finally {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setShowDropdown(false);
      navigate('/');
    }
  };

  return (
    <header className="main-header">
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/animals">Pets</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>

      <div className="auth-section">
        {isLoggedIn ? (
          <div className="user-dropdown-container" ref={dropdownRef}>
            <div className="user-avatar" onClick={() => setShowDropdown(!showDropdown)}>
              <div className="avatar-circle"></div>
            </div>

            {showDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/profile" onClick={() => setShowDropdown(false)}>My Profile</Link></li>
                <li><Link to="/my-pets" onClick={() => setShowDropdown(false)}>My Pets</Link></li>
                <li><Link to="/adoptions" onClick={() => setShowDropdown(false)}>My Adoptions</Link></li>
                <li><Link to="/favorites" onClick={() => setShowDropdown(false)}>My Favorites</Link></li>
                <li className="logout-item" onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login"><button className="login-btn">Login</button></Link>
        )}
      </div>
    </header>
  );
}

export default Header;