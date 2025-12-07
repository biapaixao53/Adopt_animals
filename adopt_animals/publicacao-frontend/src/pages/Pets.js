import React, { useEffect, useState } from 'react';
import PetList from '../components/PetList';

function Pets() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Supondo que estás a obter a lista de pets do backend
        fetch('http://127.0.0.1:8000/publicacao/api/animals/')
           .then(response => response.json())
            .then(data => setPets(data));
;
    }, []);

    return (
        <div>
            <h1>Welcome to Pet Adoption</h1>
            <PetList pets={pets} />  {/* Passando os pets para o PetList */}
        </div>
    );
}



export default Pets;
