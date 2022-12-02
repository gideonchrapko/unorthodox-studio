import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Landing from './Landing';
import Contact from './Contact';
import Home from './Home';
import SingleProject from './SingleProject';
import PageNotFound from './PageNotFound';
import About from './About';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (    
        <AnimatePresence >
          <Routes location={location} key={location.pathname}>
            <Route path='/landing' element={<Landing/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='project/:slugRoute' element={<SingleProject/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;