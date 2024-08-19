import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/Flashcard.css';
import Review from './Review.jsx'

function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(null);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleReveal = (index) => {
    setRevealedIndex(index === revealedIndex ? null : index);
  };

  const handleMarkForReview = (flashcard) => {
    if (markedForReview.includes(flashcard._id)) {
      setMarkedForReview(markedForReview.filter(id => id !== flashcard._id));
    } else {
      setMarkedForReview([...markedForReview, flashcard._id]);
    }
  };

  const handleAddFlashcard = async () => {
    if (!newQuestion || !newAnswer) {
      alert('Please enter both a question and an answer.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/flashcards', {
        question: newQuestion,
        answer: newAnswer,
      });

      if (response.data.success) {
        setFlashcards([...flashcards, response.data.flashcard]); // Add the new flashcard to the list
        setNewQuestion(''); // Clear the input fields
        setNewAnswer('');
      } else {
        alert('Failed to add flashcard.');
      }
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/flashcards/${id}`);

      if (response.data.success) {
        setFlashcards(flashcards.filter(flashcard => flashcard._id !== id));
      } else {
        alert('Failed to delete flashcard.');
      }
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  if (!flashcards.length) return <p>Loading...</p>;

  return (
    <div className="flashcard-container">
      <h1>Flashcards</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <input 
            type="text" 
            placeholder="New Question" 
            value={newQuestion} 
            onChange={(e) => setNewQuestion(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="New Answer" 
            value={newAnswer} 
            onChange={(e) => setNewAnswer(e.target.value)} 
          />
          <button onClick={handleAddFlashcard}>Add Flashcard</button>
        </div>
      </div>
      {flashcards.map((flashcard, index) => (
        <div key={flashcard._id} className="flashcard">
          <h2>{flashcard.question}</h2>
          {revealedIndex === index && <p>{flashcard.answer}</p>}
          <button onClick={() => handleReveal(index)}>
            {revealedIndex === index ? 'Hide Answer' : 'Reveal Answer'}
          </button>
          <button onClick={() => handleMarkForReview(flashcard)}>
            {markedForReview.includes(flashcard._id) ? 'Unmark for Review' : 'Mark for Review'}
          </button>
          <button onClick={() => handleDeleteFlashcard(flashcard._id)}>
            Delete
          </button>
        </div>
      ))}
      <Link
        to={{
          pathname: '/review',
          state: { markedForReview: Review() }, // Pass marked flashcards
        }}
      >
        <button>Go to Review</button>
      </Link>
    </div>
  );
}

export default Flashcard;
