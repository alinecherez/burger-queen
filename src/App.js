import React from 'react';
import './App.css';
import Auth from './pages/Auth';
import Order from './pages/order';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={Auth} />
          <Route path="/order" component={Order} />
        </header>
      </div>
    </Router>
  );
}

export default App;