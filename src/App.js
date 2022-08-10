import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { useShopify } from "./hooks";
import Landing from './Components/Landing'
import './App.css';

function App() {
  const {
    darkModeStatus,
    soundStatus,
	} = useShopify()

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
    </div>
  );
}

export default App;
