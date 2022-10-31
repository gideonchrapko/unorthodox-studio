import React, { useEffect } from 'react';
import AnimatedRoutes from './Components/AnimatedRoutes';
import Header from './Components/Navigation/Header';
import { useShopify } from './hooks'

import './App.css';

function App() {
  const { 
    setProjectCategory, 
    setClientCategory, 
    projectCat,
    setVisualData,
    setSoundData,
    setFashionData,
    setUXData,
  } = useShopify();

  useEffect(() => {
    setVisualData()
    setSoundData()
    setFashionData()
    setUXData()

    if(projectCat === undefined){
      setProjectCategory("visualProject")
      setClientCategory("visualClients")
    }
    
  },[])

  return (
    <div className="App">
      <Header />
        <AnimatedRoutes />
    </div>
  );
}

export default App;
