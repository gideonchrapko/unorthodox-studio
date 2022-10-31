import { PortableText } from '@portabletext/react';
import { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useShopify } from '../hooks';
import sanityClient from '../client';
import Helmet from 'react-helmet';

import LandingGridImage from './LandingGridImage';
import plus from '../Assets/plus.svg';
import minus from '../Assets/minus.svg';

const Home = () => {
    const { 
        setProjectCategory, 
        setClientCategory, 
        clientCategory, 
        projectCat,
        visualData,
        soundData,
        fashionData,
        uxData
    } = useShopify();

    const [clientClicked, setClientClicked] = useState(false)
    const [projectData, setProjectData] = useState()
    const [clientData, setClientData] = useState();
    const [displayClientsProj, setDisplayClientsProj] = useState(false);
    const [clientsIndex, setClientsIndex] = useState();
    const [clientProjectData, setClientProjectData] = useState();
    const [landingPageData, setLandingPageData] = useState();
    const aboutCopy = landingPageData && landingPageData[0].aboutCopy;

    useEffect(() => {
        sanityClient.fetch(`*[_type == "landingPage"]{
            aboutCopy,
            videoReel,
            "playbackId": videoReel.Reel.asset->playbackId,
            videoReelMobile,
            "playbackIdMobile": videoReelMobile.reelMobile.asset->playbackId,
        }`)
        .then((data) => setLandingPageData(data))
        .catch(console.error)
    },[])

    useEffect(() => {
        sanityClient.fetch(`*[_type == "${clientCategory}"]{
            clientsName,
            _id
        }`)
        .then((data) => setClientData(data))
        .catch(console.error)
      },[clientCategory])

      useEffect(() => {
        sanityClient.fetch(`*[_type == "${projectCat}"]{
            slugRoute,
            projectImages,
            projectTitle,
            clients,
        }`)
        .then((data) => setProjectData(data))
        .catch(console.error)
      },[projectCat])

      useEffect(() => {
        sanityClient.fetch(`*[_type=="${projectCat}" && references("${clientsIndex}")]{
            slugRoute,
            projectImages,
            projectTitle,
            clients,
        }`)
        .then((data) => setClientProjectData(data))
        .catch(console.error)
      },[clientsIndex])

      function clientList(clientsId) {
            if(clientsIndex === clientsId){
                setDisplayClientsProj(false)
                setClientsIndex()
            }else{
                setDisplayClientsProj(true)
                setClientsIndex(clientsId)
            }
            if(clientsIndex === clientsId && !displayClientsProj){
                setDisplayClientsProj(true)
                setClientsIndex(clientsId)
            }
      }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
            exit={{ opacity: 0 }}
        >
            <Helmet>
        	    <title>Home</title>
				<meta
					name="Home Page"
					content="Welcome to Unorthodox Studios. We invite you view all of our projects sorted by category as well as client"
				/>
			</Helmet>
            <Container fluid className="scroller">
                <section>
                    <Row style={{ marginTop: "8vh", height: "10vh" }}>
                        <Col lg={6} md={6} xs={12} className='d-sm-none d-none d-md-block d-lg-block'>
                            <h3 className='home-branding-text'>UNORTHODOX__STUDIO</h3>
                        </Col>
                        <Col lg={{ offset: 1, span: 5 }} md={6} xs={12}>
                            <h6 className='home-branding-copy d-sm-none d-none d-md-block d-lg-block'>
                                <PortableText value={aboutCopy} />
                            </h6>
                            <h6 className='home-branding-copy d-block d-md-none' style={{ textAlign: "left" }}>
                                <PortableText value={aboutCopy} /> 
                            </h6>
                        </Col>
                    </Row>
                    <Row style={{ height: "65vh", marginTop: "3vh" }}>
                        {/* <Col lg={{ span: 12 }} className='d-sm-none d-none d-lg-block d-md-block' >
                            {landingPageData && landingPageData[0].playbackId &&
                                <LandingVideo 
                                    playbackId={landingPageData && landingPageData[0].playbackId}
                                    title={landingPageData && landingPageData[0].videoReel.title}
                                />
                            }
                        </Col> */}
                        {/* <Col lg={{ span: 12 }} className='d-block d-md-none' >
                            {landingPageData && landingPageData[0].playbackIdMobile &&
                                <LandingVideo 
                                    playbackId={landingPageData && landingPageData[0].playbackIdMobile}
                                    title={landingPageData && landingPageData[0].videoReelMobile.title}
                                />
                            }
                        </Col> */}
                    </Row>
                </section>
                <section>
                    <Row style={{ height: "15vh", position: "sticky", top: "5vh", backgroundColor: "black", zIndex: "9" }}>
                        <Col lg={12}>
                            <ul className='mainMenu-ul' >
                                <li className='mainMenu-li'
                                    onClick={() => {
                                        setProjectCategory("visualProject")
                                        setClientCategory('visualClients')
                                        setDisplayClientsProj(false)
                                        setClientsIndex()
                                    }}                            
                                >
                                    <h5 className={`product-category-text ${projectCat === "visualProject" ? "product-category-text-active" : ""}`}>
                                        VISUAL
                                        <span style={{ fontSize: "10pt", top: "2px", position: "absolute", paddingLeft: "5px" }}>{visualData && visualData.length}</span>
                                    </h5>
                                </li>
                                <li className='mainMenu-li'
                                    onClick={() => {
                                        setProjectCategory("soundProject")
                                        setClientCategory('soundClients')
                                        setDisplayClientsProj(false)
                                        setClientsIndex()
                                    }}                            
                                >
                                    <h5 className={`product-category-text ${projectCat === "soundProject" ? "product-category-text-active" : ""}`} >
                                        SOUND
                                        <span style={{ fontSize: "10pt", top: "2px", position: "absolute", paddingLeft: "5px" }}>{soundData && soundData.length}</span>
                                    </h5>
                                </li>
                                <li className='mainMenu-li'
                                    onClick={() => {
                                        setProjectCategory("fashionProject")
                                        setClientCategory('fashionClients')
                                        setDisplayClientsProj(false)
                                        setClientsIndex()
                                    }}                            
                                >
                                    <h5 className={`product-category-text ${projectCat === "fashionProject" ? "product-category-text-active" : ""}`}>
                                        FASHION
                                        <span style={{ fontSize: "10pt", top: "2px", position: "absolute", paddingLeft: "5px" }}>{fashionData && fashionData.length}</span>
                                    </h5>
                                </li>
                                <li className='mainMenu-li'
                                    onClick={() => {
                                        setProjectCategory("uxProject")
                                        setClientCategory('uxClients')
                                        setDisplayClientsProj(false)
                                        setClientsIndex()
                                    }}
                                >
                                    <h5 className={`d-sm-none d-none d-lg-block d-md-block product-category-text ${projectCat === "uxProject" ? "product-category-text-active" : ""}`}>
                                        USER EXPERIENCE
                                        <span style={{ fontSize: "10pt", top: "2px", position: "absolute", paddingLeft: "5px" }}>{uxData && uxData.length}</span>
                                    </h5>
                                    <h5 className={`d-block d-md-none product-category-text ${projectCat === "uxProject" ? "product-category-text-active" : ""}`}>
                                        UX
                                        <span style={{ fontSize: "10pt", top: "2px", position: "absolute", paddingLeft: "5px" }}>{uxData && uxData.length}</span>
                                    </h5>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="d-block d-lg-none" style={{ position: "sticky", top: "20vh", zIndex: "8", background: "black" }}>
                        <Col>
                            <AnimatePresence initial={false} >
                                <h4 
                                    style={{ color: "white", fontSize: "clamp(12pt, 3vw, 15pt)", cursor: "pointer" }}
                                    onClick={() => setClientClicked(!clientClicked)}
                                >
                                    Clients
                                    <img 
                                        className='d-inline d-lg-none' 
                                        src={clientClicked ? minus : plus} 
                                        style={{ marginLeft: "10px",  width: "10px" }}
                                    />
                                </h4>
                                {clientClicked &&
                                    <div style={{ width: "100%" }}>
                                        {clientData &&
                                            clientData.map((clients, index) => {
                                                const clientsId = clients._id
                                                return (
                                                    <motion.h6
                                                        key={index}
                                                        className='client-list-text-mobile'
                                                        style={{ cursor: "pointer", display: "inline-block", paddingLeft: "25px", fontWeight: clientsIndex === clientsId ? "800" : "100"  }}
                                                        onClick={() => clientList(clientsId)}
                                                        // animate={{ 
                                                        //     opacity: clientClicked ? 1 : 0,
                                                        //     transition: { duration: 0.5}
                                                        // }}
                                                    >
                                                        { clientClicked ? clients.clientsName : null }
                                                    </motion.h6>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </AnimatePresence>  
                        </Col>                  
                    </Row>
                    <Row>
                        <Col lg={2}>
                            <div style={{ position: "sticky", top: "20vh" }}>
                                <h4 
                                    className='d-md-none d-none d-lg-block' 
                                    style={{ color: "white", fontSize: "clamp(12pt, 3vw, 15pt)" }}
                                    onClick={() => setClientClicked(!clientClicked)}
                                >
                                    Clients
                                </h4>
                                {clientData &&
                                    clientData.map((clients, index) => {
                                        const clientsId = clients._id
                                        return (
                                            <div key={index} className="d-md-none d-none d-lg-inline-block">
                                                <h6 
                                                    className='client-list-text'
                                                    style={{ 
                                                        cursor: "pointer", 
                                                        fontWeight: clientsIndex === clientsId ? 800 : 100,
                                                    }}
                                                    onClick={() => clientList(clientsId)}
                                                >
                                                    {clients.clientsName}
                                                </h6>
                                                {/* <span style={{ backgroundColor: `${clientsIndex === clientsId ? 'white' : 'transparent'}` }}
                                                    className="dot">
                                                </span> */}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                        <Col lg={10} style={{ display: "flex", flexWrap: "wrap" }}>
                                {!displayClientsProj && projectCat === "visualProject" &&
                                    visualData.map((project, index) => {
                                        return (
                                            <LandingGridImage
                                                project={project}
                                                key={index}
                                                index={index}
                                            />
                                        )
                                    })
                                }
                                {!displayClientsProj && projectCat === "soundProject" &&
                                    soundData.map((project, index) => {
                                        return (
                                            <LandingGridImage
                                                project={project}
                                                key={index}
                                                index={index}
                                            />
                                        )
                                    })
                                }
                                {!displayClientsProj && projectCat === "fashionProject" &&
                                    fashionData.map((project, index) => {
                                        return (
                                            <LandingGridImage
                                                project={project}
                                                key={index}
                                                index={index}
                                            />
                                        )
                                    })
                                }
                                {!displayClientsProj && projectCat === "uxProject" &&
                                    uxData.map((project, index) => {
                                        return (
                                            <LandingGridImage
                                                project={project}
                                                key={index}
                                                index={index}
                                            />
                                        )
                                    })
                                }

                                {displayClientsProj && clientProjectData &&
                                    clientProjectData.map((project, index) => {
                                        return (
                                            <LandingGridImage
                                                project={project}
                                                key={index}
                                                index={index}
                                            />
                                        )
                                    })
                                }
                        </Col>
                    </Row>
                </section>
            </Container>
        </motion.div>
    )
}

export default Home