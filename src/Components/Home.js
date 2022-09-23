import sanityClient from '../client';
import { PortableText } from '@portabletext/react'
import { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import imageUrlBuilder from '@sanity/image-url';

const thumbnails = [
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Uprising_in_Tehran%2C_Keshavarz_Boulvard_September_2022_%282%2C_cropped_for_ITN%29.jpg" },
]

const Clients = [
    { image: "ASAP ROCKY" },
    { image: "ASAP" },
    { image: "ASAP ROCKY" },
    { image: "ASAP" },
    { image: "ASAP ROCKY" },
    { image: "ASAP" },
]

console.log(thumbnails)

const Home = () => {
    const [landingPageData, setLandingPageData] = useState()
    const aboutCopy = landingPageData && landingPageData[0].aboutCopy
    const videoReel = landingPageData && landingPageData[0].LandingPageReel.asset
    const builder = imageUrlBuilder(sanityClient)
  
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

    return (
        <Container fluid>
            <Row style={{ marginTop: "7vh", height: "10vh" }}>
                <Col lg={6}>
                    <h3 className='home-branding-text'>UNORTHODOX__STUDIO</h3>
                </Col>
                <Col lg={6}>
                    <h6 className='home-branding-copy'>
                        <PortableText value={aboutCopy} />
                    </h6>
                </Col>
            </Row>
            <Row style={{ height: "70vh" }}>
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
            <Row style={{ height: "13vh", background: "green" }}>
            {/* <Row style={{ height: "150vh" }}> */}
                {/* <Col lg={12} style={{ height: "50%", position: "-webkit-sticky" , position: "sticky", top: "6vh"  }}> */}
                <Col lg={12} style={{ position: "-webkit-sticky" , position: "sticky", top: "6vh"  }}>
                    <ul className='mainMenu-ul' >
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text'>
                                VISUAL
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text'>
                                SOUND
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text'>
                                FASHION
                            </h5>
                        </li>
                        <li className='mainMenu-li'>
                            <h5 className='product-category-text'>
                                USER EXPERIENCE
                        </h5></li>
                    </ul>
                </Col>
            </Row>
            <Row style={{ height: "85vh" }}>
                    <Col lg={2} style={{ background: "green" }}>
                        Hello
                    </Col>
                    <Col lg={10} style={{ background: "blue", overflowY: "scroll", height: "100%" }}>
                        <div style={{ 
                                margin: "0 auto 0",
                                display: "flex", 
                                flexWrap: "wrap", 
                                justifyContent: "right", 
                                width: "100%",
                                backgroundRepeat: "no-repeat"
                            }}>
                            {thumbnails &&
                                thumbnails.map((thumbs, index) => {
                                    return (
                                        <div key={index} 
                                            style={{ 
                                                backgroundImage: `url(${thumbs.image})`, 
                                                height: "50vh",
                                                flex: "0 0 30%",
                                                width: "100px",
                                                cursor: "pointer",
                                            }}

                                        >
                                            {/* {thumbs.image} */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
            </Row>
            {/* <div>
                <Link to='/project/Project1'>Project Link</Link>
            </div> */}
            {/* <Row style={{ height: "200vh" }}>
                <Col>
                    Hello
                </Col>
            </Row> */}
        </Container>
    )
}

export default Home