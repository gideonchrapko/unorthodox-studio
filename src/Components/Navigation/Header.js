import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import Branding from '../../Assets/branding.svg';

const Header = () => {
    const [landingNav, setLandingNav] = useState();
    const location = useLocation();

    useEffect(() => {

        if(location.pathname === "/"){
            setLandingNav(true)
        } else {
            setLandingNav(false)
        }

    },[])

    console.log(landingNav)

    return (
        <Container fluid>
            <Row style={{ position: "relative", zIndex: "9", paddingTop: "10px"  }}>
                <Col lg={4} style={{ backgronud: "green" }}>
                    <h3 className="landing-header d-sm-none d-none d-lg-block d-md-block" style={{ textAlign: "left" }}>
                        UNORTHODOX__STUDIO
                    </h3>
                </Col>
                <Col lg={4} xs={12} style={{ textAlign: 'center' }}>
                    <img src={Branding} alt='Unorthodox' style={{ height: "20px" }} />
                </Col>
                <Col lg={4}>
                    <h3 className="landing-header d-sm-none d-none d-lg-block d-md-block" style={{ textAlign: "right" }}>LIVE__FROM__THE__FUTURE</h3>
                </Col>
            </Row>
            {landingNav ?
                null :
                <div style={{ zIndex: "999", position: "fixed", color: "white" }}>
                    <Link to='/home'>WORK</Link>
                    <Link to='/about'>ABOUT</Link>
                    <Link to='/contact'>CONTACT</Link> 
                </div>
            }
        </Container>
    )
}

export default Header