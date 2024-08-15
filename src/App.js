import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Flashcard from './components/Flashcard';
import Review from './components/Review';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/flashcards" element={<Flashcard />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;