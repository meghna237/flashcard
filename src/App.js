import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Flashcard from './components/Flashcard.jsx';
import Review from './components/Review.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/flashcard/:id" element={<Flashcard />} />
        <Route path="/review" element={<Review />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
