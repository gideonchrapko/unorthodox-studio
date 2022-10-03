import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './Navigation/Header';

const About = () => {
    return (
        <Container fluid>
            {/* <Header /> */}
            <Row style={{ marginTop: "50px" }}>
                <Col style={{ color: "white" }}>
                    About Page
                </Col>
            </Row>
        </Container>
    )
}

export default About