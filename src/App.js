import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Flashcard from './components/Flashcard';
import Review from './components/Review';
import Subjects from './components/Subject';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/flashcards" element={<Flashcard />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;