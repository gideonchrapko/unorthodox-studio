import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import sanityClient from '../client';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';

const About = () => {
    const [aboutData, setAboutData] = useState();
    const mobile = window.innerWidth < 600

    useEffect(() => {
        sanityClient.fetch(`*[_type == "about"]{
            projectDescription,
            projectTeam,
            press,
        }`)
        .then((data) => setAboutData(data))
        .catch(console.error)
    },[])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
            exit={{ opacity: 0 }}
        >
            <Container fluid style={{ paddingBottom: "10vh" }}>
                <Helmet>
                    <title>About</title>
                    <meta
                        name="About Page"
                        content=""
                    />
                </Helmet>
                <Row style={{ marginTop: "8vh", height: "10vh" }}>
                    <Col lg={6} md={6} xs={12} >
                        <h3 className='home-branding-text'>ABOUT</h3>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ color: "white" }} >
                        <h2 className='about-header' style={{ textAlign: "left" }} >OUR STORY</h2>
                        <h4 className='about-body' style={{ paddingTop: "5px" }}>
                            <PortableText value={aboutData && aboutData[0].projectDescription} />
                        </h4>
                    </Col>
                </Row>
                <Row style={{ paddingTop: "5vh" }}>
                    <Col style={{ color: "white" }} lg={8}>
                        <h2 className='about-header' style={{ textAlign: "left" }}>PRESS</h2>
                        {aboutData &&
                            aboutData[0].press.map((array, i) => {
                                return (
                                    <a 
                                        key={i}
                                        href={array.pressURL && array.pressURL}
                                        className='about-body-href' 
                                        style={{ 
                                            paddingTop: "5px", 
                                            textAlign: "right",
                                            marginBottom: "-2px",
                                            display: "block",
                                            textAlign: "left",
                                            borderTop: i === 0 ? "1px solid white" : "0px solid white",
                                            borderBottom: "1px solid white"
                                        }}
                                    >
                                        {array.pressTitle && array.pressTitle}
                                    </a>
                                )
                            })
                        }
                    </Col>
                    <Col style={{ color: "white", paddingTop: mobile ? "5vh" : "" }} lg={4} >
                        <h2 className='about-header' style={{ textAlign: mobile ? "left" : "right" }}>OUR SERVICES</h2>
                        {aboutData &&
                            aboutData[0].projectTeam.map((team, i) => {
                                return (
                                    <h4 
                                        key={i} 
                                        className='about-body' 
                                        style={{ 
                                            paddingTop: "5px", 
                                            textAlign: mobile ? "left" : "right",
                                            display: "block",
                                        }}
                                    >
                                        {team}
                                    </h4>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </motion.div>
    )
}

export default About;