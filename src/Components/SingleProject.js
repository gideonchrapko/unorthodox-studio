import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { useShopify } from '../hooks';
import { Helmet } from 'react-helmet';
import sanityClient from '../client';

import ProjectFooter from './ProjectFooter';
import Masonry from './Masonry/Masonry';
import Video from './MuxVideo/ProjectVideo';

import './SinglePage.css';

const SingleProject = () => {
    const { clientCategory } = useShopify();
    const [singlePost, setSinglePost] = useState();
    // const [modal, setModal] = useState();
    const [clientNames, setClientNames] = useState();
    const { slugRoute } = useParams();
    const images = singlePost && singlePost[0].projectImages
    const mobile = window.innerWidth < 600

    useEffect(() => {
      window.scrollTo(0,0)
      sanityClient.fetch(`*[slugRoute.current == "${slugRoute}"]{
          projectTitle,
          projectDate,
          projectDescription,
          projectImages,
          projectTeam,
          clients,
          videoPost,
          "playbackId": videoPost.video.asset->playbackId,
         }`)
        .then((data) => setSinglePost(data))
        .catch(console.error)
      },[])

      useEffect(() => {
        sanityClient.fetch(`*[_type=="${clientCategory}" && _id == '${singlePost && singlePost[0].clients[0]._ref}']{
            "name" : clientsName
          }`)
        .then((data) => setClientNames(data))
        .catch(console.error)
      },[singlePost])

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 2 } }}
        exit={{ opacity: 0 }}
      >
      <Helmet>
        <title>{singlePost && singlePost[0].projectTitle}</title>
				<meta
					name={`${singlePost && singlePost[0].projectTitle} Page`}
					content={singlePost && singlePost[0].projectDescription[0].children[0].text}
				/>
			</Helmet>
        <Container fluid style={{ marginTop: "10vh" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 3 } }}
            exit={{ opacity: 0 }}
          >
          <Row style={{ top: "5vh", background: "transparent", zIndex: "9" }}>
            <Col lg={12}>
              <h1 className='header-title-text' style={{ paddingTop: "5px" }}>{singlePost && singlePost[0].projectTitle}</h1>
            </Col>
          </Row>
          <Row style={{ marginTop: "5vh" }}>
            <Col lg={{ offset: 1, span: 10 }}>
              {singlePost && singlePost[0].playbackId &&
                <Video 
                  playbackId={singlePost && singlePost[0].playbackId}
                  title={singlePost && singlePost[0].videoPost.title}
                />
              }
              <Masonry images={images} columnCount={mobile ? "1" : "2"} gap="10" />
            </Col>
          </Row>
          <Row style={{ marginTop: "10vh" }}>
            <Col lg={12} >
                  <ul className='project-ul'>
                    <li className='project-li'>
                      <h5 className='body-copy'>
                        {clientNames && clientNames[0] ?
                          clientNames[0].name : ""
                        }
                      </h5>
                    </li>
                    <li className='project-li'>
                      <h5 className='body-copy'>{singlePost && singlePost[0].projectDate}</h5>
                    </li>
                    <li className='project-li d-md-none d-none d-lg-inline'>
                      <h5 className='body-copy'>TEAM</h5>
                    </li>
                  </ul>
              </Col>
          </Row>
          <Row style={{ marginTop: "5vh" }}>
            <Col lg={8} xs={12}>
              <h5 className='body-copy' ><PortableText value={singlePost && singlePost[0].projectDescription} /></h5>
            </Col>
            <Col lg={4} style={{ textAlign: mobile ? "left" : "right", columnCount: singlePost && `${singlePost[0].projectTeam.length === 1 ? "0" : "2"}` }}>
              {singlePost && singlePost[0] &&
                singlePost[0].projectTeam.map((team, index) => {
                  const stringColinIndex = team.indexOf(':') + 1
                  const stringLength = team.length
                  const objectLength = singlePost && singlePost[0].projectTeam.length
                  const newTeamStringTop = team.slice(0, stringColinIndex)
                  const newTeamStringBottom = team.slice(stringColinIndex, stringLength)
                  return (
                      <div key={index} style={{ display: objectLength < 3 ? mobile ? "inline-block" : "block" : "inline-block" }}>
                        <h5 style={{ fontWeight: "800" }} className='body-copy team'>{newTeamStringTop}</h5>
                        <h5 className='body-copy team'>{newTeamStringBottom}</h5>
                      </div>
                  )
                })
              }
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "20vh", width: "100%" }} lg={{ span: 8, offset: 4 }} className='d-md-none d-none d-lg-inline'>
              <h4 style={{ color: "white" }}>RELATED PROJECTS:</h4>
            </Col>
            <Col style={{ marginTop: "20vh", width: "100%" }} sm={{ span: 6, offset: 6 }} xs={{ span: 6, offset: 6 }} className='d-block d-lg-none'>
              <h6 style={{ color: "white" }}>RELATED PROJECTS:</h6>
            </Col>
          </Row>
            <ProjectFooter 
              clientNames={clientNames}
              slugRoute={slugRoute}
            />
          </motion.div>
        </Container>
      </motion.div>
    )
}

export default SingleProject;