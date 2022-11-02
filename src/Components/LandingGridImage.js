import React, { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useNavigate } from 'react-router-dom';
import sanityClient from '../client';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useShopify } from '../hooks'

const LandingGridImage = (props) => {
    const { setProjectIndex, projectCat } = useShopify(); 
    const { index, project } = props 
    const [data, setData] = useState();
    const [hoverIndex, setHoverIndex] = useState();
    const [projectData, setProjectData] = useState();
    const builder = imageUrlBuilder(sanityClient);
    const navigate = useNavigate();
    const mobile = window.innerWidth < 600;

    const { ref, inView } = useInView({
        threshold: 0,
      });

    function urlFor(source) {
        return builder.image(source)
      }

    useEffect(() => {
        sanityClient.fetch(`*[_type == "${projectCat}"]{
            projectTitle
        }`)
        .then((data) => setProjectData(data))
        .catch(console.error)
      },[projectCat])

    useEffect(() => {
        if(projectData !== undefined){
            setData(projectData.map(projectData => projectData.projectTitle))
        }
    },[projectData])

    return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: index / 8 } }}
                index={index}
                onPointerOver={() => setHoverIndex(index)} onPointerOut={() => setHoverIndex()}
                className='square' style={{ flexBasis: mobile ? "calc(50% - 10px)" : "calc(33.333% - 10px)" }}
            >
                    <motion.h4
                        className='home-overlay-text'
                        initial={false}
                        animate={{ 
                            opacity: hoverIndex === index ? 1 : 0,
                            y: hoverIndex === index ? 0 : 100,
                            transition: { duration: 0.2 } }}
                        onClick={e => {
                            navigate(`/project/${project.slugRoute.current && project.slugRoute.current}`)
                            setProjectIndex(data && data.indexOf(`${project.projectTitle}`))
                        }}
                    >
                        {project.projectTitle && project.projectTitle}
                    </motion.h4>
                    <div
                        ref={ref}
                        index={index}
                        style={{
                            backgroundImage: `url(${inView ? urlFor(project.projectImages[0].asset).width(400).height(400).url() : null})`,
                            filter: hoverIndex === index ? "opacity(30%)" : "opacity(100%)",
                            backgroundColor: "grey",
                        }}
                        className="content"
                        onClick={e => {
                            navigate(`/project/${project.slugRoute.current && project.slugRoute.current}`)
                            setProjectIndex(data && data.indexOf(`${project.projectTitle}`))
                        }}
                    >
                    </div>
            </motion.div>
    )
}

export default LandingGridImage;