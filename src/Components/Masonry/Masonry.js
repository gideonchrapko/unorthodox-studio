import React from 'react'
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../../client';

import './masonry.css'

export default function(props) {
    const { images, columnCount, gap } = props
    const builder = imageUrlBuilder(sanityClient);
    // const client = useSanityClient();

    function urlFor(source) {
        return builder.image(source)
      }
      
    return (
        <div style={{ columns: columnCount, columnGap: 0 }}>
            {images && images[0] &&
                images.map((image, i) => 
                    <img 
                        src={urlFor(image.asset).url()} 
                        key={i} 
                        className='image'
                        style={{ padding: gap/2 }}
                    />
                )}
        </div>
    )
}