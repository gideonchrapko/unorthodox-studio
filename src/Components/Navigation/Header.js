import React, { useEffect, useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './Nav.css'

import Branding from '../../Assets/branding.svg';
import HamburgerMenu from '../Lottie/HamburgerMenu';
import Hamburger from './Hamburger';
// import { useShopify } from '../../redux/ducks/shopify';

const Header = () => {
    const [landingNav, setLandingNav] = useState(true);
    // const [hamburger, setHamburger] = useState(false);
    const [route, setRoute] = useState();
    let location = useLocation();
    let navigate = useNavigate();
    const path = location.pathname

    useEffect(() => {
        if(path === '/landing'){
            setLandingNav(true)
        } else { 
            setLandingNav(false)
        }
        setRoute(path)
    },[location])

    return (
        <Container 
            fluid 
            style={{ 
                height: "6vh", 
                background: landingNav ? "" : "black", 
                position: "fixed", 
                zIndex: "99",
                top: "0",
                padding: "0px 30px 0px 30px"
            }}
        >
        <Row style={{ position: "relative", zIndex: "9", paddingTop: "10px" }}>
                 <AnimatePresence initial={false}>
                     <motion.div 
                            key="div"
                            animate={{ 
                                width: landingNav ? "33.33%" : "0%",
                                transition: { duration: 0.5 } 
                            }}
                        >
                             <motion.h3 
                                className="landing-header d-sm-none d-none d-lg-block d-md-block" 
                                style={{ textAlign: "left", float: "left" }}
                                key="title"
                                animate={{ 
                                    opacity: landingNav ? 1 : 0,
                                    transition: { duration: 0.5} 
                                }}
                            >
                                 UNORTHODOX__STUDIO
                            </motion.h3>
                        </motion.div>
                        <motion.div 
                            key="logo"
                            style={{ width: "33.33%" }}
                            animate={{ 
                                textAlign: landingNav ? "center" : "left",
                                transition: { duration: 0.5} 
                            }}
                        >
                            <img src={Branding} alt='Unorthodox' className='nav-logo' onClick={() => navigate('/')} />
                        </motion.div>
                        <motion.div 
                            style={{ width: "33.33%" }}
                            animate={{ 
                                textAlign: landingNav ? "right" : "center",
                                transition: { duration: 0.5} 
                            }}
                        >
                            <h3 className="landing-header d-md-none d-sm-none d-none d-lg-block" style={{ textAlign: "center" }}>
                                LIVE__FROM__THE__FUTURE
                            </h3>
                        </motion.div>
                        <motion.div 
                            key="nav"
                            className="d-sm-none d-md-none d-none d-lg-block" 
                            style={{ marginLeft: "5.555%", float: "right" }}
                            animate={{ 
                                width: landingNav ? "0" : "27.775%",
                                opacity: landingNav ? 0 : 1,
                                transition: { duration: 1 } 
                            }}
                        >
                            {!landingNav && (
                                <ul className='Nav-ul'>
                                    <li className='Nav-li'>
                                        <h4 className={`nav-text ${route === "/" ? 'nav-text-active' : ''}`} onClick={() => navigate('/')} >
                                            HOME
                                        </h4>
                                    </li>
                                    <li className='Nav-li'>
                                        <h4 className={`nav-text ${route === "/about" ? 'nav-text-active' : ''}`} onClick={() => navigate('/about')}>
                                            ABOUT
                                        </h4>
                                    </li>
                                    <li className='Nav-li'>
                                        <h4 className={`nav-text ${route === "/contact" ? 'nav-text-active' : ''}`} onClick={() => navigate('/contact')}>
                                            CONTACT
                                        </h4>
                                    </li>
                                </ul>
                           )}
                        </motion.div>
                            <motion.div className='d-block d-lg-none' 
                                style={{ color: "white", float: "right" }}
                                animate={{ 
                                    width: landingNav ? "0%" : "33.33%",
                                    opacity: landingNav ? 0 : 1,
                                    transition: { duration: 1 } 
                                }}
                            >
                                {!landingNav ? 
                                    <div style={{ float: "right" }}>
                                    <HamburgerMenu />
                                    </div>: null
                                }
                            </motion.div>
                        <Hamburger />
                    </AnimatePresence>
                </Row>
        </Container>
    )
}

export default Header