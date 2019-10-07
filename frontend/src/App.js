import React from 'react';
import './App.css';
import logo from './assets/logo1.png';
import {Link, BrowserRouter } from 'react-router-dom';

import Routes from './routes';

function App() {

  
  return (
    <div className="container">
      
      <BrowserRouter>
        <Link to="/">
          <img src={logo} alt="airlogo" />
        </Link>
      </BrowserRouter>
      
      
      <div className="content">
        
        <Routes />

      </div>
    </div>
  );
}

export default App;
