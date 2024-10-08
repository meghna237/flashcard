import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Flashcard from './components/Flashcard';
import Subjects from './components/Subject';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { UserProvider } from './context/UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/questions" element={<Flashcard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
