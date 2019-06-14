import React from 'react';
import './App.css';
import Auth from './pages/Auth';
import Order from './pages/order';
import Kitchen from './pages/kitchen';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import logo from './img/logo.png';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <img className="App-logo" src={logo} alt="Logo Burger Queen" />
        </header>
        <body>
          <Route path="/" exact component={Auth} />
          <Route path="/order" component={Order} />
          <Route path="/kitchen" component={Kitchen} />
        </body>
      </div>
    </Router>
  );
}

export default App;