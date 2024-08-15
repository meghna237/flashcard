import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flashcard.css';

function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(null);
  const [markedForReview, setMarkedForReview] = useState([]);

  useEffect(() => {
    axios.get('/db.json')
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
      });
  }, []);

  const handleReveal = (index) => {
    setRevealedIndex(index === revealedIndex ? null : index);
  };

  const handleMarkForReview = (flashcard) => {
    setMarkedForReview([...markedForReview, flashcard]);
  };

  if (!flashcards.length) return <p>Loading...</p>;

  return (
    <div className="flashcard-container">
      {flashcards.map((flashcard, index) => (
        <div key={flashcard.id} className="flashcard">
          <h2>{flashcard.question}</h2>
          {revealedIndex === index && <p>{flashcard.answer}</p>}
          <button onClick={() => handleReveal(index)}>
            {revealedIndex === index ? 'Hide Answer' : 'Reveal Answer'}
          </button>
          <button onClick={() => handleMarkForReview(flashcard)}>
            Mark for Review
          </button>
        </div>
      ))}
    </div>
  );
}

export default Flashcard;