import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Flashcard from './components/Flashcard.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flashcard />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
