import React, { useState } from 'react';
import PetModal from './PetModal';  // ajusta o caminho se necessário

function PetList({ pets }) {

    const [selectedPet, setSelectedPet] = useState(null);

    if (!pets || pets.length === 0) {
        return <div>No pets available.</div>;
    }

    return (
        <div className="pet-list">
            <h2>Available Pets for Adoption</h2>

            <ul>
                {pets.map(pet => (
                    <li key={pet.id}>
                        <h3>{pet.nome}</h3>
                        <p>{pet.descricao}</p>
                        <img
                            src={`http://127.0.0.1:8000${pet.foto}`}
                            alt={pet.nome}
                            style={{ width: '100px' }}
                        />

                        {/* BOTÃO PARA ABRIR O MODAL */}
                        <button onClick={() => setSelectedPet(pet)}>
                            More details
                        </button>
                    </li>
                ))}
            </ul>

            {/* MODAL */}
            <PetModal
                pet={selectedPet}
                onClose={() => setSelectedPet(null)}
            />
        </div>
    );
}

export default PetList;
