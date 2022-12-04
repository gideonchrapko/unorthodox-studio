import { useState, useEffect } from 'react';
import sanityClient from '../client';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useShopify } from '../hooks';

import GoBackLottie from './Lottie/goBackLottie';
import LandingGridImage from './LandingGridImage';

const ProjectFooter = (props) => {
    const { slugRoute } = props
    const { projectCat, projectIndex } = useShopify();
    const [slugData, setSlugData] = useState();
    const [data, setData] = useState();
    const [matchingProjectData, setMatchingProjectData] = useState();
    const [nonMatchingProjectData, setNonMatchingProjectData] = useState();
    const mobile = window.innerWidth < 600
    const navigate = useNavigate();

    useEffect(() => {
        sanityClient.fetch(`*[slugRoute.current == "${slugRoute}"].clients[0]{
                _ref
           }`)
          .then((data) => setSlugData(data))
          .catch(console.error)
    },[])

    useEffect(() => {
        sanityClient.fetch(`*[_type=="${projectCat}" && clients[0]._ref == "${slugData && slugData[0]._ref}"]{
                projectTitle,
                projectImages,
                slugRoute,
            }`)
        .then((data) => setMatchingProjectData(data))
        .catch(console.error)
    },[slugData])

    useEffect(() => {
        sanityClient.fetch(`*[_type=="${projectCat}"]{     
                projectTitle,
                projectImages,
                slugRoute,
            }`)
        .then((data) => setNonMatchingProjectData(data))
        .catch(console.error)
    },[slugData])

    useEffect(() => {
        if(matchingProjectData){
            setData(matchingProjectData.filter(matchingProjectData => matchingProjectData.slugRoute.current !== `${slugRoute}`))
        }
    },[matchingProjectData])

    return (
            <Row style={{ width: "100%", marginLeft: 0, marginBottom: "20px" }}>
                <Col style={{ display: "flex", flexWrap: "wrap" }} className='d-sm-none d-none d-md-flex d-lg-flex'>
                    <div className='square' style={{ flexBasis: "calc(33.333% - 10px)" }}>
                        <div className='content' style={{ background: "grey" }} onClick={() => navigate('/')}>
                            <div style={{ position: "relative", cursor: "pointer", width: "100%", top: 0, left: 0 }}>
                                <GoBackLottie />
                            </div>
                        </div>
                    </div>
                    {data &&
                        data.slice(0, 2).map((project, index) => {
                            return (
                                <LandingGridImage
                                    project={project}
                                    index={index}
                                />
                            )
                        })
                    }
                    {data && data.length === 1 && nonMatchingProjectData &&
                        nonMatchingProjectData.slice(projectIndex + 1, projectIndex + 2).map((project, index) => {
                            return (
                                <LandingGridImage
                                    project={project}
                                    index={index}
                                />
                            )
                        })
                    }
                    {data && data.length === 0 && nonMatchingProjectData && 
                        nonMatchingProjectData.slice(projectIndex + 1, projectIndex + 3).map((project, index) => {
                            return (
                                <LandingGridImage
                                    project={project}
                                    index={index}
                                />
                            )
                        })
                    }
                    {data && data.length === 0 && nonMatchingProjectData && nonMatchingProjectData.length === projectIndex + 1  && 
                        nonMatchingProjectData.slice(projectIndex - 2, projectIndex).map((project, index) => {
                            return (
                                <>
                                    <LandingGridImage
                                        project={project}
                                        index={index}
                                    />
                                </>
                            )
                        })
                    }
                </Col>
                {/* for mobile view only show one related project */}
                <Col style={{ display: "flex", flexWrap: "wrap" }} className='d-flex d-md-none'>
                    <div className='square' style={{ flexBasis: "calc(50% - 10px)" }}>
                        <div className='content' onClick={() => navigate('/')}>
                            <div style={{ position: "relative", cursor: "pointer", width: "100%", top: 0, left: 0 }}>
                                <GoBackLottie />
                            </div>
                        </div>
                    </div>
                    {data &&
                        data.slice(0, 1).map((project, index) => {
                            return (
                                <LandingGridImage
                                    project={project}
                                    index={index}
                                />
                            )
                        })
                    }
                    {data && data.length === 0 && nonMatchingProjectData &&
                        nonMatchingProjectData.slice(projectIndex + 1, projectIndex + 2).map((project, index) => {
                            return (
                                <LandingGridImage
                                    project={project}
                                    index={index}
                                />
                            )
                        })
                    }
                    {data && data.length === 0 && nonMatchingProjectData && nonMatchingProjectData.length === projectIndex + 1  && 
                        nonMatchingProjectData.slice(projectIndex - 1, projectIndex).map((project, index) => {
                            return (
                                <>
                                    <LandingGridImage
                                        project={project}
                                        index={index}
                                    />
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
    )
}

export default ProjectFooter;