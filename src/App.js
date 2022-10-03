import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// import { useShopify } from "./hooks";
// import AnimatedRoutes from './Components/AnimatedRoutes';
import Header from './Components/Navigation/Header';

import Landing from './Components/Landing';
import Home from './Components/Home';
import SingleProject from './Components/SingleProject';
import PageNotFound from './Components/PageNotFound';
import About from './Components/About';

import './App.css';

function App() {
  const location = useLocation();
  
  return (
    <div className="App">
      <Header />
      <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='project/:slugRoute' element={<SingleProject/>} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;
