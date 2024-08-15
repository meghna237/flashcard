import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/flashcards') // Replace with your API endpoint
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  return (
    <div>
      <h1>Flashcards</h1>
      <ul>
        {flashcards.map(card => (
          <li key={card.id}>
            <Link to={`/flashcard/${card.id}`}>{card.question}</Link>
          </li>
        ))}
      </ul>
      <Link to="/review">Review Flashcards</Link>
    </div>
  );
}

export default Home;
