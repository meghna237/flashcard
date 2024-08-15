import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Review() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/flashcards') // Replace with your API endpoint
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  return (
    <div>
      <h1>Review Flashcards</h1>
      <ul>
        {flashcards.map(card => (
          <li key={card.id}>
            <h3>{card.question}</h3>
            <p>{card.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Review;
