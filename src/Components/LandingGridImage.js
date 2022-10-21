import React, { useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useNavigate } from 'react-router-dom';
import sanityClient from '../client';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";

import placeholderImage from '../Assets/placeholderImage-01.png';

const LandingGridImage = (props) => {
    const { index, project } = props 
    const [hoverIndex, setHoverIndex] = useState();
    const builder = imageUrlBuilder(sanityClient);
    const navigate = useNavigate();
    const mobile = window.innerWidth < 600;

    const { ref, inView, entry } = useInView({
        threshold: 0,
      });

    function urlFor(source) {
        return builder.image(source)
      }
    
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
                        ref={ref}
                        key={index}
                        style={{ 
                            backgroundImage: `url(${inView ? urlFor(project.projectImages[0].asset).width(400).height(400).url() : placeholderImage})`,
                            filter: hoverIndex === index ? "opacity(30%)" : "opacity(100%)",
                        }}
                        className="content"
                        onClick={() => navigate(`/project/${project.slugRoute.current && project.slugRoute.current}`)}
                    >
                    </div>
            </div>
    )
}

export default LandingGridImage;