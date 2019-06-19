import React from 'react';
import './App.css';
import logo from './img/logo.png';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './pages/auth';
import Order from './pages/order';
import Kitchen from './pages/kitchen';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from "./components/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <img className="App-logo" src={logo} alt="Logo Burger Queen" />
          </header>
          <div>
            <Route exact path="/" component={Auth} />
            <PrivateRoute path="/order" component={Order} />
            <PrivateRoute path="/kitchen" component={Kitchen} />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;