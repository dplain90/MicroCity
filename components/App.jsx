import React from 'react';
import { Link } from 'react-router';
import Game from './game';

const App = ({ children }) => (
  <div className="main">
    <header>
        <h1>Micro City</h1>
    </header>
    {children}
  </div>
);

export default App;
