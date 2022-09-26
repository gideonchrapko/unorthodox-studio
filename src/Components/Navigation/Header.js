import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

import './Nav.css'

import Branding from '../../Assets/branding.svg';

const Header = () => {
    const [landingNav, setLandingNav] = useState(true);
    let location = useLocation();
    let navigate = useNavigate();
 
    //need a better at determining what page I'm on
    // useEffect(() => {
    //     if(location.pathname === "/"){
    //         setLandingNav(true)
    //     } else {
    //         setLandingNav(false)
    //     }
    // },[])

    return (
        <Container fluid style={{ 
            height: "6vh", 
            background: landingNav ? "" : "black", 
            position: "fixed", 
            zIndex: "9",
            top: "0"
            }}
        >
            {landingNav ?
                <Row style={{ position: "relative", zIndex: "9", paddingTop: "10px" }}>
                    <Col lg={4}>
                        <h3 className="landing-header d-sm-none d-none d-lg-block d-md-block" style={{ textAlign: "left" }}>
                            UNORTHODOX__STUDIO
                        </h3>
                    </Col>
                    <Col lg={4} xs={12} style={{ textAlign: 'center' }}>
                        <img src={Branding} alt='Unorthodox' className='nav-logo' onClick={() => navigate('/home')} />
                    </Col>
                    <Col lg={4}>
                        <h3 className="landing-header d-sm-none d-none d-lg-block d-md-block" style={{ textAlign: "right" }}>
                            LIVE__FROM__THE__FUTURE
                        </h3>
                    </Col>
                </Row> : null
            }

            {!landingNav ?
                <Row style={{ position: "relative", zIndex: "9", paddingTop: "10px" }}>
                    <Col lg={4}>
                        <img src={Branding} alt='Unorthodox' className='nav-logo' onClick={() => navigate('/home')}/>
                    </Col>
                    <Col lg={4} xs={12} style={{ textAlign: 'center' }}>
                        <h3 className="landing-header d-md-none d-sm-none d-none d-lg-block" style={{ textAlign: "centre" }}>
                            LIVE__FROM__THE__FUTURE
                        </h3>
                    </Col>
                    <Col lg={{  offset: 1, span: 3 }} className="d-sm-none d-md-none d-none d-lg-block">
                        <ul className='Nav-ul'>
                            <li className='Nav-li'><h4 className='nav-text'>HOME</h4></li>
                            <li className='Nav-li'><h4 className='nav-text'>ABOUT</h4></li>
                            <li className='Nav-li'><h4 className='nav-text'>CONTACT</h4></li>
                        </ul>
                    </Col>
                </Row> : null
            }
        </Container>
    )
}

export default Header