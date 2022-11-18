import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import sanityClient from '../client';
import { PortableText } from '@portabletext/react';

const About = () => {
    const [aboutData, setAboutData] = useState();

    useEffect(() => {
        sanityClient.fetch(`*[_type == "about"]{
            projectDescription,
            projectTeam,
        }`)
        .then((data) => setAboutData(data))
        .catch(console.error)
    },[])

    console.log(aboutData)

    return (
        <Container fluid>
            <Helmet>
                <title>About</title>
				<meta
					name="About Page"
					content=""
				/>
			</Helmet>
            <Row style={{ marginTop: "10vh" }}>
                <Col style={{ color: "white" }} lg={8} >
                    <h2 className='about-body' style={{ textAlign: "left" }} >OUR STORY</h2>
                    <h4 className='about-body' style={{ paddingTop: "5px" }}>
                        <PortableText value={aboutData && aboutData[0].projectDescription} />
                    </h4>
                </Col>
                <Col style={{ color: "white" }} lg={4} >
                    <h2 className='about-body' style={{ textAlign: "right" }}>OUR SERVICES</h2>
                    {aboutData &&
                        aboutData[0].projectTeam.map((team, i) => {
                            return (
                                <h4 key={i} className='about-body' style={{ paddingTop: "5px", textAlign: "right" }}>
                                    {team}
                                </h4>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default About;