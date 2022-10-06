import sanityClient from '../client';
import { PortableText } from '@portabletext/react';
import { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import imageUrlBuilder from '@sanity/image-url';
import placeholderImage from '../Assets/placeholderImage-01.png';

const Home = () => {
    const [projectCat, setProjectCat] = useState('visualProject');
    const [projectData, setProjectData] = useState()
    const [clientCat, setClientCat] = useState('visualClients');
    const [clientData, setClientData] = useState();
    const [projectList, setProjectList] = useState();
    const [displayClientsProj, setDisplayClientsProj] = useState(false);
    const [clientsIndex, setClientsIndex] = useState();
    const [clientProjectData, setClientProjectData] = useState();
    const [landingPageData, setLandingPageData] = useState();
    const [hoverIndex, setHoverIndex] = useState();
    const aboutCopy = landingPageData && landingPageData[0].aboutCopy;
    const videoReel = landingPageData && landingPageData[0].LandingPageReel.asset;
    const builder = imageUrlBuilder(sanityClient);
    const mobile = window.innerWidth < 600;
    const navigate = useNavigate();
  
    function urlFor(source) {
      return builder.image(source)
    }

    useEffect(() => {
        sanityClient.fetch(`*[_type == "landingPage"]{
            LandingPageReel,
            aboutCopy,
        }`)
        .then((data) => setLandingPageData(data))
        .catch(console.error)
    },[])

    //fetches all clients depeding on which category their in
    useEffect(() => {
        sanityClient.fetch(`*[_type == "${clientCat}"]{
            clientsName,
            _id
        }`)
        .then((data) => setClientData(data))
        .catch(console.error)
      },[clientCat])

      //fetches all projects depending on if its visual, fashion, sound or UX cat
      useEffect(() => {
        sanityClient.fetch(`*[_type == "${projectCat}"]{
             slugRoute,
             projectImages,
             projectTitle,
        }`)
        .then((data) => setProjectData(data))
        .catch(console.error)
      },[projectCat])

      //fetches the list of projects that have a specific client
      useEffect(() => {
        sanityClient.fetch(`*[_type=="${projectCat}" && references("${clientsIndex}")]{
             slugRoute,
             projectImages,
             projectTitle,
        }`)
        .then((data) => setClientProjectData(data))
        .catch(console.error)
      },[clientsIndex])

      function clientList(clientsId) {
            if(clientsIndex === clientsId){
                setDisplayClientsProj(false)
                setProjectList(projectData)
                setClientsIndex()
            }else{
                setProjectList(clientProjectData)
                setDisplayClientsProj(true)
                setClientsIndex(clientsId)
            }
            if(clientsIndex === clientsId && !displayClientsProj){
                setDisplayClientsProj(true)
                setProjectList(clientProjectData)
                setClientsIndex(clientsId)
            }
      }

    return (
        <Container fluid>
            <Row style={{ marginTop: "8vh", height: "10vh" }}>
                <Col lg={6} md={6} xs={12}>
                    <h3 className='home-branding-text'>UNORTHODOX__STUDIO</h3>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <h6 className='home-branding-copy d-sm-none d-none d-md-block d-lg-block'>
                        <PortableText value={aboutCopy} />
                    </h6>
                    <h6 className='home-branding-copy d-block d-md-none' style={{ textAlign: "left" }}>
                        <PortableText value={aboutCopy} /> 
                    </h6>
                </Col>
            </Row>
            <Row style={{ height: "65vh", marginTop: "3vh" }}>
                <Col lg={12}>
                    {landingPageData && landingPageData[0] ?
                        <div 
                            className='home-reel-div'
                            style={{ backgroundImage: `url(${urlFor(videoReel).url()})` }}
                        >
                        </div> : null
                    }
                </Col>
            </Row>
            <Row style={{ height: "15vh", position: "sticky", top: "5vh", backgroundColor: "black", zIndex: "8" }}>
                <Col lg={12}>
                    <ul className='mainMenu-ul' >
                        <li className='mainMenu-li'>
                            <h5 className={`product-category-text ${projectCat === "visualProject" ? "product-category-text-active" : ""}`}
                                onClick={() => {
                                    setProjectCat('visualProject')
                                    setClientCat('visualClients')
                                    setDisplayClientsProj(false)
                                }}
                            >
                                VISUAL
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className={`product-category-text ${projectCat === "soundProject" ? "product-category-text-active" : ""}`}
                                onClick={() => {
                                    setProjectCat('soundProject')
                                    setClientCat('soundClients')
                                    setDisplayClientsProj(false)
                                }}
                            >
                                SOUND
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className={`product-category-text ${projectCat === "fashionProject" ? "product-category-text-active" : ""}`}
                                onClick={() => {
                                    setProjectCat('fashionProject')
                                    setClientCat('fashionClients')
                                    setDisplayClientsProj(false)
                                }}
                            >
                                FASHION
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className={`product-category-text ${projectCat === "uxProject" ? "product-category-text-active" : ""}`}
                                onClick={() => {
                                    setProjectCat('uxProject')
                                    setClientCat('uxClients')
                                    setDisplayClientsProj(false)
                                }}
                            >
                                USER EXPERIENCE
                        </h5></li>
                    </ul>
                </Col>
            </Row>
            <Row >
                <Col lg={2}>
                    <div style={{ position: "sticky", top: "20vh" }}>
                        <h3 style={{ color: "white" }}>Clients</h3>
                        {clientData &&
                            clientData.map((clients, index) => {
                                const clientsId = clients._id
                                return (
                                    <div key={index}>
                                        <h6 
                                            className={clientsIndex === clientsId ? 'client-list-text-active' : 'client-list-text'}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => clientList(clientsId)}
                                        >
                                            {clients.clientsName}
                                        </h6>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
                    <Col lg={10} style={{ display: "flex", flexWrap: "wrap", overflowY: "scroll" }}>
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
                                                        backgroundImage: `url(${project.projectImages ? urlFor(project.projectImages[0].asset).url() : placeholderImage})`,
                                                        filter: hoverIndex === index ? "opacity(30%)" : "opacity(100%)"
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
                                            <div 
                                                key={index}
                                                style={{ 
                                                    backgroundImage: `url(${project.projectImages ? urlFor(project.projectImages[0].asset).url() : placeholderImage})`,
                                                    filter: hoverIndex === index ? "opacity(30%)" : "opacity(100%)"
                                                }}
                                                className="content"
                                                onClick={() => navigate(`/project/${project.slugRoute.current && project.slugRoute.current}`)}
                                            >
                                                <motion.h4 
                                                    className='home-overlay-text'
                                                    initial={false}
                                                    animate={{ 
                                                        opacity: hoverIndex === index ? 1 : 0,
                                                        transition: { duration: 0.2 } 
                                                    }}
                                                >
                                                    {project.projectTitle && project.projectTitle}
                                                </motion.h4>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                    </Col>
            </Row>
        </Container>
    )
}

export default Home