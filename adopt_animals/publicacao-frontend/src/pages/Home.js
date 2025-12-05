import React, { useState, useEffect } from 'react';
import PetList from '../components/PetList';

function Home() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Fetch data from Django API
        fetch('http://127.0.0.1:8000/publicacao/api/animals/')
            .then(response => response.json())
            .then(data => setPets(data));
    }, []);

    return (
        <div>
            <h1>Welcome to Pet Adoption</h1>
            <PetList pets={pets} />
        </div>
    );
}

export default Home;
