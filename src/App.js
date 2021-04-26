import React from 'react';
import ExcellenceCenter from './components/ExcellenceCenter';
import Formations from './components/Formations';
import './App.scss';

const App = () => (
  <div className="App">
    <h1 className="title">Business Intelligency</h1>
    <ExcellenceCenter />
    <Formations />
  </div>
);

export default App;
