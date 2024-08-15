import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Flashcards</h1>
      <div>
        <Link to="/flashcards">All Flashcards</Link>
      </div>
      <div>
        <Link to="/review">Review Marked Flashcards</Link>
      </div>
    </div>
  );
}

export default Home;