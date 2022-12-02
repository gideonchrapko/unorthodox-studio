import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShopify } from '../../redux/ducks/shopify';

import './Nav.css';

const Hamburger = () => {
    const { hamburgerStatus, closeHamburger } = useShopify();

    return (
        <motion.div
            initial={false}
            animate={{ x: hamburgerStatus ? "0" :"100%", transition: { duration: 1.2 } }}
            style={{ 
                height: '95vh', 
                width: "100vw", 
                position: "fixed", 
                top: "5vh", 
                left: 0, 
                zIndex: "99", 
                background: "black",
                paddingTop: "30px",
            }}
        >   
            <Link className='hamburger-text' to="/" onClick={() => closeHamburger()}>
                <h3 style={{ padding: "10px 10px 10px 20px" }}>HOME</h3>
            </Link>
            <Link className='hamburger-text' to="/about" onClick={() => closeHamburger()}>
                <h3 style={{ padding: "10px 10px 10px 20px" }}>ABOUT</h3>
            </Link>
            <Link className='hamburger-text' to='/contact' onClick={() => closeHamburger()}>
                <h3 style={{ padding: "10px 10px 10px 20px" }}>CONTACT</h3>
            </Link>
        </motion.div>
    )
}

export default Hamburger;