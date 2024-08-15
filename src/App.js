import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Flashcard from './components/Flashcard';
import Review from './components/Review';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/flashcard/:id" component={Flashcard} />
        <Route path="/review" component={Review} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
