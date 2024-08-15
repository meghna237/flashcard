import React from 'react';
import { useLocation } from 'react-router-dom';

function Review() {
  const location = useLocation();
  const markedForReview = location.state?.markedForReview || []; // Default to an empty array

  return (
    <div className="review-container">
      <h1>Flashcards Marked for Review</h1>
      {markedForReview.length === 0 ? (
        <p>No flashcards marked for review.</p>
      ) : (
        <div>
          {markedForReview.map((flashcard) => (
            <div key={flashcard.id} className="flashcard">
              <h2>{flashcard.question}</h2>
              <p>{flashcard.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Review;