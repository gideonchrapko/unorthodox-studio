import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { PortableText } from '@portabletext/react';
// import SanityMuxPlayer from "sanity-mux-player";
import { motion } from 'framer-motion';
// import MuxPlayer from '@mux/mux-player-react';
import sanityClient from '../client';

import Masonry from './Masonry/Masonry'
import Video from './MuxVideo/ProjectVideo'
import './SinglePage.css'

const SingleProject = () => {
    const [singlePost, setSinglePost] = useState();
    const [clientNames, setClientNames] = useState();
    const { slugRoute } = useParams();
    const images = singlePost && singlePost[0].projectImages
    const mobile = window.innerWidth < 600

    useEffect(() => {
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

      // console.log(singlePost)

      useEffect(() => {
        sanityClient.fetch(`*[_type=='visualClients' && _id == '${singlePost && singlePost[0].clients[0]._ref}']{
            "name" : clientsName
          }`)
        .then((data) => setClientNames(data))
        .catch(console.error)
      },[singlePost])

    return (
        <Container fluid style={{ marginTop: "10vh" }}>
          {/* <AnimatePresence> */}
          <motion.div
            enter={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
          <Row style={{ top: "5vh", background: "transparent", zIndex: "9" }}>
            <Col lg={12}>
              <h1 className='header-title-text' style={{ paddingTop: "5px" }}>{singlePost && singlePost[0].projectTitle}</h1>
            </Col>
          </Row>
          <Row style={{ marginTop: "5vh" }}>
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
              {singlePost && singlePost[0] &&
                singlePost[0].projectTeam.map((team, index) => {
                  const stringColinIndex = team.indexOf(':') + 1
                  const stringLength = team.length
                  const newTeamStringTop = team.slice(0, stringColinIndex)
                  const newTeamStringBottom = team.slice(stringColinIndex, stringLength)
                  return (
                    <div key={index}>
                      <h5 className='body-copy team'>{newTeamStringTop}</h5>
                      <h5 className='body-copy team'>{newTeamStringBottom}</h5><br/>
                    </div>
                  )
                })
              }
            </Col>
          </Row>
          <Row style={{ marginTop: "5vh", marginBottom: "5vh" }}>
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
          </motion.div>
          {/* </AnimatePresence> */}
        </Container>
    )
}

export default SingleProject;