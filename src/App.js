import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useShopify } from "./hooks";
import Landing from './Components/Landing';
import Home from './Components/Home';
import './App.css';
import Header from './Components/Navigation/Header';
import SingleProject from './Components/SingleProject';
import PageNotFound from './Components/PageNotFound';

function App() {
  
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path="/project/:slugRoute" exact render={() => <SingleProject />} />
          <Route component={PageNotFound} />
        </Routes>
    </div>
  );
}

export default App;
