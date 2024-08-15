import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div id='home'>
      <h1>Welcome to Flashcards</h1>
      <div class="home-link">
        <Link to="/flashcards" class="button">All Flashcards</Link>
      </div>
      <div>
        <Link to="/review" class="button">Review Marked Flashcards</Link>
      </div>
    </div>
  );
}

export default Home;