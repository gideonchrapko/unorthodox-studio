import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import sanityClient from '../client';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
// import imageUrlBuilder from '@sanity/image-url';

import './SinglePage.css'

const SingleProject = () => {
    const [singlePost, setSinglePost] = useState()
    const { slugRoute } = useParams();
    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
      return builder.image(source)
    }
    
    useEffect(() => {
        sanityClient.fetch(`*[slugRoute.current == "${slugRoute}"]{
          projectTitle,
          projectDate,
          projectDescription,
          projectImages,
         }`)
        .then((data) => setSinglePost(data))
        .catch(console.error)
      },[])

      console.log(singlePost && singlePost[0].projectDescription)

    return (
        <Container fluid style={{ marginTop: "10vh" }}>
          <Row>
            <Col lg={12}>
              <h1 className='header-title-text' >{singlePost && singlePost[0].projectTitle}</h1>
            </Col>
          </Row>
          <Row style={{ marginTop: "5vh" }}>
            <Col lg={12} >
                  <ul className='project-ul'>
                    <li className='project-li'>
                      <h5 className='body-copy'>CLIENT</h5>
                    </li>
                    <li className='project-li'>
                      <h5 className='body-copy'>{singlePost && singlePost[0].projectDate}</h5>
                    </li>
                    <li className='project-li'>
                      <h5 className='body-copy'>TEAM</h5>
                    </li>
                  </ul>
              </Col>
          </Row>
          <Row style={{ marginTop: "5vh" }}>
            <Col lg={9}>
              <h5 className='body-copy'><PortableText value={singlePost && singlePost[0].projectDescription} /></h5>
            </Col>
            <Col lg={3} style={{ textAlign: "right" }}>
              <h5 className='body-copy'>Team Names</h5>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div style={{ height: "50vh" }}>
                {singlePost && singlePost[0] &&
                  singlePost[0].projectImages.map((images, i) => {
                    return (
                      <div>
                        <img 
                          src={urlFor(images.asset).url()} 
                          alt={`project image${i}`} 
                          style={{ height: "10vh" }} 
                        />
                      </div>
                    )
                  })
                }
              </div>
            </Col>
          </Row>
        </Container>
    )
}

export default SingleProject;