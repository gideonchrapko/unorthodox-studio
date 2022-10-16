import React, { useEffect, useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './Nav.css'

import Branding from '../../Assets/branding.svg';

const Header = () => {
    const [landingNav, setLandingNav] = useState(true);
    const [route, setRoute] = useState();
    let location = useLocation();
    let navigate = useNavigate();
    const path = location.pathname

    useEffect(() => {
        if(path === '/'){
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
                zIndex: "9",
                top: "0",
                padding: "0px 30px 0px 30px"
            }}
        >
        <Row style={{ position: "relative", zIndex: "9", paddingTop: "10px" }}>
                 <AnimatePresence initial={false}>
                     <motion.div 
                            animate={{ 
                                width: landingNav ? "33.33%" : "0%",
                                transition: { duration: 0.5} 
                            }}
                        >
                             <motion.h3 
                                className="landing-header d-sm-none d-none d-lg-block d-md-block" 
                                style={{ textAlign: "left", float: "left" }}
                                animate={{ 
                                    opacity: landingNav ? 1 : 0,
                                    transition: { duration: 0.5} 
                                }}
                            >
                                 UNORTHODOX__STUDIO
                            </motion.h3>
                        </motion.div>
                        <motion.div 
                            style={{ width: "33.33%" }}
                            animate={{ 
                                textAlign: landingNav ? "center" : "left",
                                transition: { duration: 0.5} 
                            }}
                        >
                            <img src={Branding} alt='Unorthodox' className='nav-logo' onClick={() => navigate('/home')} />
                        </motion.div>
                        <motion.div 
                            style={{ width: "33.33%" }}
                            animate={{ 
                                textAlign: landingNav ? "right" : "center",
                                transition: { duration: 0.5} 
                            }}
                        >
                            <h3 className="landing-header d-md-none d-sm-none d-none d-lg-block" style={{ textAlign: "centre" }}>
                                LIVE__FROM__THE__FUTURE
                            </h3>
                        </motion.div>
                        <motion.div 
                            className="d-sm-none d-md-none d-none d-lg-block" 
                            style={{ marginLeft: "11.11%", float: "right" }}
                            animate={{ 
                                width: landingNav ? "0" : "22.22%",
                                opacity: landingNav ? 0 : 1,
                                transition: { duration: 1 } 
                            }}
                        >
                            {!landingNav && (
                                <ul className='Nav-ul'>
                                    <li className='Nav-li'>
                                        <h4 className={`nav-text ${route === "/home" ? 'nav-text-active' : ''}`} onClick={() => navigate('/home')} >
                                            HOME
                                        </h4>
                                    </li>
                                    <li className='Nav-li'>
                                        <h4 className={`nav-text ${route === "/about" ? 'nav-text-active' : ''}`} onClick={() => navigate('/about')}>
                                            ABOUT
                                        </h4>
                                    </li>
                                    <li className='Nav-li'>
                                        <h4 className={`nav-text ${route === "/contact" ? 'nav-text-active' : ''}`} onClick={() => navigate('/')}>
                                            CONTACT
                                        </h4>
                                    </li>
                                </ul>
                           )}
                        </motion.div>
                        {!landingNav ? 
                            <div className='d-block d-lg-none' style={{ width: "33.33%", color: "white" }}>
                                <h6>{"(hamburger menu)"}</h6>
                            </div> : null
                        }
                    </AnimatePresence>
                </Row>
        </Container>
    )
}

export default Header