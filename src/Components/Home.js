import sanityClient from '../client';
import { PortableText } from '@portabletext/react';
import { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import imageUrlBuilder from '@sanity/image-url';

import placeholderImage from '../Assets/placeholderImage-01.png';

const Home = () => {
    // const [projectCategory, setProjectCategory] = useState();
    const [projectCat, setProjectCat] = useState();
    const [clientData, setClientData] = useState();
    const [visualData, setVisualData] = useState();
    const [soundData, setSoundData] = useState();
    const [fashionData, setFashionData] = useState();
    const [uxData, setUXData] = useState();
    // const [projectIndex, setProjectIndex] = useState(0);
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
        sanityClient.fetch(`*[_type == "clients"]{
            clientsName
        }`)
        .then((data) => setClientData(data))
        .catch(console.error)
      },[])

    useEffect(() => {
        sanityClient.fetch(`*[_type == "landingPage"]{
            LandingPageReel,
            aboutCopy,
        }`)
        .then((data) => setLandingPageData(data))
        .catch(console.error)
    },[])

    useEffect(() => {
        sanityClient.fetch(`*[_type == "visualProject"]{
            slugRoute,
            projectImages,
            clients,
            "relatedClients": *[_type=='clients' && references(^._ref)]{
                clients,
                clientsName,
            }
        }`)
        .then((data) => {
            setVisualData(data)
            setProjectCat(data)
        })
        .catch(console.error)
      },[])

      useEffect(() => {
        sanityClient.fetch(`*[_type == "fashionProject"]{
            slugRoute,
            projectImages,
            clients
        }`)
        .then((data) => setFashionData(data))
        .catch(console.error)
      },[])

      useEffect(() => {
        sanityClient.fetch(`*[_type == "soundProject"]{
            slugRoute,
            projectImages,
            clients
        }`)
        .then((data) => setSoundData(data))
        .catch(console.error)
      },[])

      useEffect(() => {
        sanityClient.fetch(`*[_type == "uxProject"]{
            slugRoute,
            projectImages,
            clients
        }`)
        .then((data) => setUXData(data))
        .catch(console.error)
      },[])

    //   console.log(clientData, 'client Data')
    //   console.log(visualData, 'visual Data')

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
                            <h5 className='product-category-text' onClick={() => setProjectCat(visualData)}
                                style={{ fontWeight: projectCat === visualData ? "800" : "100"}}
                            >
                                VISUAL
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text' onClick={() => setProjectCat(soundData)}
                                style={{ fontWeight: projectCat === soundData ? "800" : "100"}}
                            >
                                SOUND
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text' onClick={() => setProjectCat(fashionData)}
                                style={{ fontWeight: projectCat === fashionData ? "800" : "100"}}
                            >
                                FASHION
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text' onClick={() => setProjectCat(uxData)}
                                style={{ fontWeight: projectCat === uxData ? "800" : "100"}}
                            >
                                USER EXPERIENCE
                        </h5></li>
                    </ul>
                </Col>
            </Row>
            <Row style={{ height: "85vh" }}>

                    <Col lg={2} style={{ color: "white" }}>
                        Clients
                        {/* {clientData &&
                            clientData.map((clients, index) => {
                                return (
                                    <div key={index}>
                                        <h6 style={{ cursor: "pointer" }}>{clients.clientsName}</h6>
                                    </div>
                                )
                            })
                        } */}

                        {projectCat && projectCat[0] &&
                            projectCat.map((projects, index) => {

                                // console.log(projects)

                                return (
                                    <div key={index}>
                                        <h6 style={{ cursor: "pointer" }}></h6>
                                    </div>
                                )
                            })
                        }   
                    </Col>

                    <Col lg={10} className="home-project-wrapper"
                        style={{ overflowY: "scroll", height: "100%", gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr" }} 
                    >
                        {projectCat && projectCat[0] ?
                             projectCat.map((project, index) => {
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