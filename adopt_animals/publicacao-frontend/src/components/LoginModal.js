import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente Modal de Login
function LoginModal({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar se o token de autenticação existe no localStorage ou se a sessão está ativa
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // Se o token estiver no localStorage, o usuário está logado
    }
  }, []);

  // Função para fazer o login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/publicacao/api/login/', { username, password });
      localStorage.setItem('token', response.data.access);  // Armazenar o token no localStorage
      setIsLoggedIn(true);  // Atualizar o estado para indicar que o usuário está logado
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error.response.data);
      alert('Login failed. Please check your credentials.');
    }
  };



  return (
    <div style={overlay}>
      <div style={modal}>
        <button style={closeBtn} onClick={onClose}>×</button>
        {!isLoggedIn ? (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={input}
            />
            <button type="submit" style={loginBtn}>Login</button>
          </form>
        ) : (
          <div>
            <h2>Welcome, {username}!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;

// Estilos em linha para o Modal
const overlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
};

const modal = {
  background: 'white',
  padding: '25px',
  borderRadius: '10px',
  minWidth: '300px',
  position: 'relative',
  textAlign: 'center',
};

const closeBtn = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
};

const input = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const loginBtn = {
  width: '100%',
  padding: '10px',
  background: '#ff5c5c',
  border: 'none',
  color: 'white',
  borderRadius: '20px',
  cursor: 'pointer',
  marginTop: '10px',
};
