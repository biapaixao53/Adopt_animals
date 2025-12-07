import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Publish() {
  const navigate = useNavigate();
  // Atualizado com todos os campos do modelo Animal
  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    raca: 'Desconhecido',
    idade: '',
    tamanho: '',
    descricao: '',
    localizacao: ''
  });
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login before publishing.');
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // FormData é necessário para o ImageField (foto)
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (foto) data.append('foto', foto);

    try {
      await axios.post('http://localhost:8000/publicacao/api/publish/', data, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Animal publicado com sucesso!');
      navigate('/animals');
    } catch (error) {
      // Log detalhado para identificar se ainda falta algum campo
      console.error('Detalhes do Erro 400:', error.response?.data);
      alert('Erro ao publicar. Verifique se preencheu o Tamanho e a Foto corretamente.');
    }
  };

  return (
    <div className="publish-page-container">
      <h2>Publicar Animal para Adoção</h2>
      <form onSubmit={handleSubmit} className="publish-form">
        <input placeholder="Nome" onChange={e => setFormData({...formData, nome: e.target.value})} required />
        <input placeholder="Espécie" onChange={e => setFormData({...formData, especie: e.target.value})} required />
        <input placeholder="Raça" defaultValue="Desconhecido" onChange={e => setFormData({...formData, raca: e.target.value})} />

        {/* Adicionado o campo Tamanho (Obrigatório no modelo) */}
        <input placeholder="Tamanho (Pequeno, Médio, Grande)" onChange={e => setFormData({...formData, tamanho: e.target.value})} required />

        <input placeholder="Idade" type="number" onChange={e => setFormData({...formData, idade: e.target.value})} required />
        <input placeholder="Localização" onChange={e => setFormData({...formData, localizacao: e.target.value})} />
        <textarea placeholder="Descrição" onChange={e => setFormData({...formData, descricao: e.target.value})} required />

        <div className="file-input">
          <label>Foto do Animal:</label>
          <input type="file" onChange={e => setFoto(e.target.files[0])} required />
        </div>

        <button type="submit" className="publish-submit-btn">Publicar Animal</button>
      </form>
    </div>
  );
}

export default Publish;