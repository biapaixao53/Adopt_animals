import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PetDetail from './components/PetDetail';
import AdoptionForm from './components/AdoptionForm';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pet/:id" element={<PetDetail />} />
                <Route path="/adopt/:id" element={<AdoptionForm />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
