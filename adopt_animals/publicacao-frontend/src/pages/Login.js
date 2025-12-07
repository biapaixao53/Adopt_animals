import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Usando useNavigate para redirecionamento
import { Link } from 'react-router-dom';

// Componente Página de Login
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redirecionamento após login

  // Verificar se o token de autenticação existe no localStorage ou se a sessão está ativa
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');  // Se já estiver logado, redireciona para a Home
    }
  }, [navigate]);

  // Função para fazer o login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/publicacao/api/login/', { username, password });

      // 1. Armazenar o token
      localStorage.setItem('token', response.data.token);

      // 2. DISPARAR O EVENTO AQUI (Isso avisa o Header imediatamente)
      window.dispatchEvent(new Event("loginChange"));

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={container}>
      <div style={formContainer}>
        <h2>Login</h2>
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
        <p style={signUpText}>
          You dont have an account? <Link to="/signup">Crie uma aqui.</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

// Estilos em linha para a página de login
const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#f4f4f4',
};

const formContainer = {
  background: 'white',
  padding: '25px',
  borderRadius: '10px',
  minWidth: '300px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
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

const signUpText = {
  marginTop: '15px',
};

