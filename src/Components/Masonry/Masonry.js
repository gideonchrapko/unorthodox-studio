import React from 'react'
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../../client';

import './masonry.css'

export default function(props) {
    const { images, columnCount, gap } = props
    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
        return builder.image(source)
    }
    
    return (
        <>
            {images && images.length > 1 &&
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
            }
            {images && images.length === 1 &&
                <div>
                    {images && images[0] &&
                        images.map((image, i) => 
                            <img 
                                src={urlFor(image.asset).url()} 
                                key={i} 
                                className='image'
                                style={{ padding: gap/0.15 }}
                            />
                    )}
                </div>
            }
        </>
    )
}