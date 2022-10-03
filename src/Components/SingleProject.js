import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Container, Col, Row } from 'react-bootstrap';
import sanityClient from '../client';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
// import imageUrlBuilder from '@sanity/image-url';

const SingleProject = () => {
    const [singlePost, setSinglePost] = useState()
    const { slugRoute } = useParams();
    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
      return builder.image(source)
    }
    
    useEffect(() => {
        sanityClient.fetch(`*[slugRoute.current == "${slugRoute}"]{
          projectTitle,
          projectDate,
          projectDescription,
          projectImages,
         }`)
        .then((data) => setSinglePost(data))
        .catch(console.error)
      },[])

      console.log(singlePost && singlePost[0].projectDescription)

    return (
        <div style={{ color: "white", marginTop: "10vh" }} >
          <h3>{singlePost && singlePost[0].projectTitle}</h3>
          <h3>{singlePost && singlePost[0].projectDate}</h3>
          <h3>
            <PortableText value={singlePost && singlePost[0].projectDescription} />
          </h3>
          <div style={{ width: "100vw", height: "50vh" }}>
            {singlePost && singlePost[0] &&
              singlePost[0].projectImages.map((images, i) => {
                return (
                  <div style={{ width: "20vh" }}>
                    <img 
                      src={urlFor(images.asset).url()} 
                      alt={`project image${i}`} 
                      style={{ height: "10vh" }} 
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
    )
}

export default SingleProject;