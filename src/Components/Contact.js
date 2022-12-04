import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

import MailchimpSubscribe from './Mailchimp/MailchimpSubscribe';

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
            exit={{ opacity: 0 }}
        >
            <Container fluid>
                <Helmet>
                    <title>Contact</title>
                    <meta
                        name="Contact Page"
                        content="Drop us a line using our contact form, we'd be happy to hear from you"
                    />
                </Helmet>
                <Row style={{ marginTop: "8vh", height: "10vh" }}>
                    <Col lg={6} md={6} xs={12} >
                        <h3 className='home-branding-text'>CONTACT</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ offset: 2, span: 8 }}>
                        <MailchimpSubscribe />
                    </Col>
                </Row>
            </Container>
        </motion.div>
    )
}

export default Contact;