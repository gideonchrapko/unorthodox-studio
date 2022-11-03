import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import Header from './Navigation/Header';

const About = () => {
    return (
        <Container fluid>
            {/* <Header /> */}
            <Helmet>
                <title>About</title>
				<meta
					name="About Page"
					content=""
				/>
			</Helmet>
            <Row style={{ marginTop: "50px" }}>
                <Col style={{ color: "white" }}>
                    About Page
                </Col>
            </Row>
        </Container>
    )
}

export default About;