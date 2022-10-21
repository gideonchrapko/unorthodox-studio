// import client from '../client';
import { PortableText } from '@portabletext/react';
import { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import sanityClient from '../client';
import Helmet from 'react-helmet';
import imageUrlBuilder from '@sanity/image-url';
// import { useInView } from 'react-intersection-observer'

import LandingVideo from './MuxVideo/LandingVideo';
import placeholderImage from '../Assets/placeholderImage-01.png';
import plus from '../Assets/plus.svg';
import minus from '../Assets/minus.svg';

const Home = () => {
    const [clientClicked, setClientClicked] = useState(false)
    // const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0 })
    const [projectCat, setProjectCat] = useState('visualProject');
    const [projectData, setProjectData] = useState()
    const [clientCat, setClientCat] = useState('visualClients');
    const [clientData, setClientData] = useState();
    const [displayClientsProj, setDisplayClientsProj] = useState(false);
    const [clientsIndex, setClientsIndex] = useState();
    const [clientProjectData, setClientProjectData] = useState();
    const [landingPageData, setLandingPageData] = useState();
    const [hoverIndex, setHoverIndex] = useState();
    const aboutCopy = landingPageData && landingPageData[0].aboutCopy;
    const builder = imageUrlBuilder(sanityClient);
    const mobile = window.innerWidth < 600;
    const navigate = useNavigate();
  
    function urlFor(source) {
      return builder.image(source)
    }

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
        sanityClient.fetch(`*[_type == "${clientCat}"]{
            clientsName,
            _id
        }`)
        .then((data) => setClientData(data))
        .catch(console.error)
      },[clientCat])

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
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Helmet>
        	    <title>Home</title>
				<meta
					name="Home Page"
					content="Welcome to Unorthodox Studios. We invite you view all of our projects sorted by category as well as client"
				/>
			</Helmet>
            <Container fluid>
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
                <Row style={{ height: "15vh", position: "sticky", top: "5vh", backgroundColor: "black", zIndex: "9" }}>
                    <Col lg={12}>
                        <ul className='mainMenu-ul' >
                            <li className='mainMenu-li'
                                onClick={() => {
                                    setProjectCat('visualProject')
                                    setClientCat('visualClients')
                                    setDisplayClientsProj(false)
                                }}                            
                            >
                                <h5 className={`product-category-text ${projectCat === "visualProject" ? "product-category-text-active" : ""}`}>
                                    VISUAL
                                </h5>
                            </li>
                            <li className='mainMenu-li'
                                onClick={() => {
                                    setProjectCat('soundProject')
                                    setClientCat('soundClients')
                                    setDisplayClientsProj(false)
                                }}                            
                            >
                                <h5 className={`product-category-text ${projectCat === "soundProject" ? "product-category-text-active" : ""}`} >
                                    SOUND
                                </h5>
                            </li>
                            <li className='mainMenu-li'
                                onClick={() => {
                                    setProjectCat('fashionProject')
                                    setClientCat('fashionClients')
                                    setDisplayClientsProj(false)
                                }}                            
                            >
                                <h5 className={`product-category-text ${projectCat === "fashionProject" ? "product-category-text-active" : ""}`}>
                                    FASHION
                                </h5>
                            </li>
                            <li className='mainMenu-li'
                                onClick={() => {
                                    setProjectCat('uxProject')
                                    setClientCat('uxClients')
                                    setDisplayClientsProj(false)
                                }}
                            >
                                <h5 className={`d-sm-none d-none d-lg-block d-md-block product-category-text ${projectCat === "uxProject" ? "product-category-text-active" : ""}`}>
                                    USER EXPERIENCE
                                </h5>
                                <h5 className={`d-block d-md-none product-category-text ${projectCat === "uxProject" ? "product-category-text-active" : ""}`}>
                                    UX
                                </h5>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="d-block d-lg-none" style={{ position: "sticky", top: "20vh", zIndex: "8", background: "black" }}>
                    <Col>
                        <AnimatePresence initial={false}>
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
                                                style={{ cursor: "pointer", fontWeight: clientsIndex === clientsId ? 800 : 100 }}
                                                onClick={() => clientList(clientsId)}
                                            >
                                                {clients.clientsName}&nbsp;&nbsp;
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
                        {!displayClientsProj && projectData &&
                            projectData.map((project, index) => {
                                return (
                                       <>
                                       {projectData[0] ?
                                           <div 
                                            onPointerOver={() => setHoverIndex(index)} onPointerOut={() => setHoverIndex()}
                                            className='square' style={{ flexBasis: mobile ? "calc(50% - 10px)" : "calc(33.333% - 10px)" }}
                                          >
                                                  <motion.h4 
                                                      className='home-overlay-text'
                                                     initial={false}
                                                     animate={{ opacity: hoverIndex === index ? 1 : 0, transition: { duration: 0.2 } }}
                                                 >
                                                     {project.projectTitle && project.projectTitle}
                                                 </motion.h4>
                                                 <div 
                                                    key={index}
                                                    style={{ 
                                                        backgroundImage: `url(${project.projectImages ? urlFor(project.projectImages[0].asset).width(400).height(400).url() : placeholderImage})`,
                                                        filter: hoverIndex === index ? "opacity(30%)" : "opacity(100%)",
                                                        // backgroundSize: hoverIndex === index ? "contain" : "cover",
                                                    }}
                                                      className="content"
                                                     onClick={() => navigate(`/project/${project.slugRoute.current && project.slugRoute.current}`)}
                                                    >
                                                    </div>
                                                </div> 
                                                :
                                                <h3 style={{ color: "white" }}>New Projects Coming Soon</h3>
                                    }
                                    </>
                                )
                            })
                            }
                            {displayClientsProj && clientProjectData &&
                                clientProjectData.map((project, index) => {
                                    return (
                                        <div
                                            onPointerOver={() => setHoverIndex(index)} onPointerOut={() => setHoverIndex()}
                                               className='square' style={{ flexBasis: mobile ? "calc(50% - 10px)" : "calc(33.333% - 10px)" }}
                                        >
                                                <motion.h4 
                                                    className='home-overlay-text'
                                                    initial={false}
                                                    animate={{ opacity: hoverIndex === index ? 1 : 0, transition: { duration: 0.2 } }}
                                                >
                                                    {project.projectTitle && project.projectTitle}
                                                </motion.h4>
                                            <div 
                                                key={index}
                                                style={{ 
                                                    backgroundImage: `url(${project.projectImages ? urlFor(project.projectImages[0].asset).width(400).height(400).url() : placeholderImage})`,
                                                    filter: hoverIndex === index ? "opacity(30%)" : "opacity(100%)",
                                                    // backgroundSize: hoverIndex === index ? "100%" : "110%",
                                                }}
                                                className="content"
                                                onClick={() => navigate(`/project/${project.slugRoute.current && project.slugRoute.current}`)}
                                            >
                                            </div>
                                        </div>
                                    )
                                })
                            }
                    </Col>
                </Row>
            </Container>
        </motion.div>
    )
}

export default Home