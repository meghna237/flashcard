import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Flashcard.css'; // Import CSS for styling

function Flashcard() {
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(null);

  useEffect(() => {
    axios.get('/db.json')
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
      });
  }, [id]);

  const handleReveal = (index) => {
    setRevealedIndex(index === revealedIndex ? null : index);
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
        </div>
      ))}
    </div>
  );
}

export default Flashcard;