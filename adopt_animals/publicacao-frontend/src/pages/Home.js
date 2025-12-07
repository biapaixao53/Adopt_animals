import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adicione o useNavigate aquiimport '../styles/App.css';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handlePublishClick = () => {
    if (isLoggedIn) {
      navigate('/publish'); // Redireciona para a nova página
    } else {
      alert('Por favor, inicie sessão para publicar um animal para adoção.');
    }
  };

  return (
        <div className="home-container">
            <h1 className="home-title">
                Find your new <span>companion</span> today.
            </h1>

            <p className="home-description">
                Browse our registry of loving animals waiting for a home.
                Connect directly with owners and start your journey.
            </p>

            <Link to="/animals">
                <button className="home-button">
                    View Pets
                </button>
            </Link>
            <button
               className="home-button"
               style={{ backgroundColor: '#28a745' }}
               onClick={handlePublishClick}
            >
               Publish Pet
             </button>

        </div>
    );
}


export default Home;
