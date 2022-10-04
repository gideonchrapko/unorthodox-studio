import sanityClient from '../client';
import { PortableText } from '@portabletext/react';
import { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import imageUrlBuilder from '@sanity/image-url';
import placeholderImage from '../Assets/placeholderImage-01.png';

const Home = () => {
    const [projectCat, setProjectCat] = useState('visualProject');
    const [projectData, setProjectData] = useState()
    const [clientCat, setClientCat] = useState('visualClients');
    const [clientData, setClientData] = useState();

    const [landingPageData, setLandingPageData] = useState();
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

    useEffect(() => {
        sanityClient.fetch(`*[_type == "${clientCat}"]{
            clientsName
        }`)
        .then((data) => setClientData(data))
        .catch(console.error)
      },[clientCat])

      useEffect(() => {
        sanityClient.fetch(`*[_type == "${projectCat}"]{
             slugRoute,
             projectImages,
        }`)
        .then((data) => setProjectData(data))
        .catch(console.error)
      },[projectCat])

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
            <Row style={{ height: "15vh" }}>
                <Col lg={12}>
                    <ul className='mainMenu-ul' >
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text' style={{ fontWeight: projectCat === 'visualProject' ? "800" : "100"}}
                                onClick={() => {
                                    setProjectCat('visualProject')
                                    setClientCat('visualClients')
                                }}
                            >
                                VISUAL
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text' style={{ fontWeight: projectCat === 'soundProject' ? "800" : "100"}}
                                onClick={() => {
                                    setProjectCat('soundProject')
                                    setClientCat('soundClients')
                                }}
                            >
                                SOUND
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text' style={{ fontWeight: projectCat === 'fashionProject' ? "800" : "100"}}
                                onClick={() => {
                                    setProjectCat('fashionProject')
                                    setClientCat('fashionClients')
                                }}
                            >
                                FASHION
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text' style={{ fontWeight: projectCat === 'uxProject' ? "800" : "100"}}
                                onClick={() => {
                                    setProjectCat('uxProject')
                                    setClientCat('uxClients')
                                }}
                            >
                                USER EXPERIENCE
                        </h5></li>
                    </ul>
                </Col>
            </Row>
            <Row style={{ height: "85vh" }}>

                    <Col lg={2} style={{ color: "white" }}>
                        Clients
                        {clientData &&
                            clientData.map((clients, index) => {
                                return (
                                    <div key={index}>
                                        <h6 style={{ cursor: "pointer" }}>{clients.clientsName}</h6>
                                    </div>
                                )
                            })
                        }
                    </Col>

                    <Col lg={10} className="home-project-wrapper"
                        style={{ overflowY: "scroll", height: "100%", gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr" }} 
                    >
                        {projectData && projectData[0] ?
                             projectData.map((project, index) => {
                                return (
                                    <div className='home-prodContainers'>
                                        <div 
                                            key={index}
                                            style={{ 
                                                backgroundImage: `url(${project.projectImages ? urlFor(project.projectImages[0].asset).url() : placeholderImage})`,
                                                }}
                                            onClick={() => navigate(`/project/${project.slugRoute.current && project.slugRoute.current}`)}
                                        >
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <h4>Projects Coming Soon</h4>
                        }
                        {/* {postData && postData[0] &&
                             postData[0].visualProject.map((project, index) => {
                                return (
                                    <div className='home-prodContainers'>
                                        <div 
                                            key={index}
                                            style={{ 
                                                backgroundImage: `url(${project.projectImages ? urlFor(project.projectImages[0].asset).url() : placeholderImage})`,
                                                }}
                                            onClick={() => navigate(`/project/${project.slugRoute.current && project.slugRoute.current}`)}
                                        >
                                        </div>
                                    </div>
                                )
                            })
                        } */}
                    </Col>
            </Row>
        </Container>
    )
}

export default Home