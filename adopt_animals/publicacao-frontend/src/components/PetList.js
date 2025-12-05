import React from 'react';
import { Link } from 'react-router-dom';

function PetList({ pets }) {
    return (
        <div className="pet-list">
            <h2>Available Pets for Adoption</h2>
            <ul>
                {pets.map(pet => (
                    <li key={pet.id}>
                        <h3>{pet.nome}</h3>
                        <p>{pet.descricao}</p>
                        <img src={`http://127.0.0.1:8000${pet.foto}`} alt={pet.nome} style={{ width: '100px' }} />
                        <Link to={`/pet/${pet.id}`}>More details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PetList;
