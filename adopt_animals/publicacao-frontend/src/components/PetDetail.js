import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PetDetail() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        // Fetch pet details using id
        fetch(`/api/pets/${id}`)
            .then(res => res.json())
            .then(data => setPet(data));
    }, [id]);

    if (!pet) return <div>Loading...</div>;

    return (
        <div className="pet-detail">
            <h2>{pet.name}</h2>
            <p>{pet.description}</p>
            <p>{pet.age} years old</p>
            <p>{pet.breed}</p>
            <button>Adopt {pet.name}</button>
        </div>
    );
}

export default PetDetail;
