import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Flashcard() {
  const { id } = useParams();
  const [flashcard, setFlashcard] = useState(null);

  useEffect(() => {
    axios.get(`https://api.example.com/flashcards/${id}`) // Replace with your API endpoint
      .then(response => setFlashcard(response.data))
      .catch(error => console.error('Error fetching flashcard:', error));
  }, [id]);

  if (!flashcard) return <p>Loading...</p>;

  return (
    <div>
      <h1>{flashcard.question}</h1>
      <p>{flashcard.answer}</p>
    </div>
  );
}

export default Flashcard;
