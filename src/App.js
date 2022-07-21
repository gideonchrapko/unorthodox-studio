import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Landing from './Components/Landing'

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
