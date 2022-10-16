import React from 'react';
import AnimatedRoutes from './Components/AnimatedRoutes';
import Header from './Components/Navigation/Header';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
        <AnimatedRoutes />
    </div>
  );
}

export default App;
