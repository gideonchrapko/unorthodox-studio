import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShopify } from '../../redux/ducks/shopify';

const Hamburger = (props) => {
    const { HamburgerStatus, closeHamburger } = useShopify();

    console.log(HamburgerStatus)
    return (
        <motion.div
            initial={false}
            animate={{ x: HamburgerStatus ? "0" :"100%", transition: { duration: 1.2 } }}
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
            <Link to="/" onClick={() => closeHamburger()}>
                <h3 className='hamburger-text'>Home</h3>
            </Link>
            <Link to="/about" onClick={() => closeHamburger()}>
                <h3 className='hamburger-text'>About</h3>
            </Link>
            <a onClick={() => closeHamburger()}>
                <h3 className='hamburger-text'>Contact</h3>
            </a>
        </motion.div>
    )
}

export default Hamburger;