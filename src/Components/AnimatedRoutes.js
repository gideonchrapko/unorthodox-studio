import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Landing from './Landing';
import Home from './Home';
import SingleProject from './SingleProject';
import PageNotFound from './PageNotFound';
import About from './About';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (    
        
        <AnimatePresence >
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Landing/>} />
            <Route path='/home' element={<Home/>} />
            {/* <Route path='/home/visual-client#' element={<Home/>} />
            <Route path='/home/sound#' element={<Home/>} />
            <Route path='/home/fashion#' element={<Home/>} />
            <Route path='/home/user-experience#' element={<Home/>} /> */}
            <Route path='/about' element={<About/>} />
            <Route path='project/:slugRoute' element={<SingleProject/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;