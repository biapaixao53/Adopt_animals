import React from 'react';
import axios from 'axios';

// Componente Modal de Detalhes do Pet e Candidatura
function PetModal({ pet, onClose }) {
  if (!pet) return null;

  // Função para lidar com a candidatura (Apply)
  const handleApply = async () => {
    const token = localStorage.getItem('token'); // Recupera o token como no LoginModal

    if (!token) {
      alert('Por favor, faça login para se candidatar à adoção.');
      return;
    }

    // URL formatada corretamente com crases para injetar o ID
    const apiUrl = `http://localhost:8000/publicacao/api/animals/${pet.id}/apply/`;

    try {
      await axios.post(
        apiUrl,
        {},
        {
          headers: {
            // Certifique-se que o backend espera 'Token' ou 'Bearer'
            Authorization: `Token ${token}`
          }
        }
      );
      alert('Candidatura enviada com sucesso!');
      onClose(); // Fecha o modal após o sucesso
    } catch (error) {
      console.error('Erro na candidatura:', error.response?.data);
      alert('Falha ao enviar candidatura. Verifique se já se candidatou para este pet.');
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <button style={closeBtn} onClick={onClose}>×</button>

        <h2>{pet.nome}</h2>
        <img
          src={`http://localhost:8000${pet.foto}`}
          alt={pet.nome}
          style={imageStyle}
        />

        <div style={infoContainer}>
          <p><strong>Idade:</strong> {pet.idade} anos</p>
          <p><strong>Espécie:</strong> {pet.especie}</p>
          <p><strong>Raça:</strong> {pet.raca}</p>
          <p><strong>Descrição:</strong> {pet.descricao}</p>
        </div>

        {/* Botão padronizado com o estilo do LoginModal */}
        <button onClick={handleApply} style={applyBtn}>
          Candidatar para Adoção
        </button>
      </div>
    </div>
  );
}

export default PetModal;

// Estilos em linha padronizados com o LoginModal.js
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
  minWidth: '350px',
  maxWidth: '500px',
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

const imageStyle = {
  width: '100%',
  maxHeight: '250px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '15px',
};

const infoContainer = {
  textAlign: 'left',
  marginBottom: '20px',
};

// Botão "Apply" usando a mesma paleta de cores do LoginModal
const applyBtn = {
  width: '100%',
  padding: '12px',
  background: '#ff5c5c', // Cor vermelha do loginBtn
  border: 'none',
  color: 'white',
  borderRadius: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background 0.3s',
};