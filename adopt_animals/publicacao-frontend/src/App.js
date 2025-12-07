import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Pets from './pages/Pets';
import About from './pages/About';
import SignUp from "./pages/SignUp";
import Publish from "./pages/Publish";
import AdoptionForm from './components/AdoptionForm';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/animals" element={<Pets />} />
                <Route path="/about" element={<About />} />
                <Route path="/adopt/:id" element={<AdoptionForm />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/publish" element={<Publish />} />

            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
