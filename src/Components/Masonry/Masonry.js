import React, { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../../client';

import Close from '../../Assets/closeModal.svg';
import Placeholder from '../../Assets/placeholderImage-01.png';
import './masonry.css'

export default function Masonry(props) {
    const { images, columnCount, gap } = props
    const [modal, setModal] = useState();
    const [image, setImage] = useState();
    const builder = imageUrlBuilder(sanityClient);
    const mobile = window.innerWidth < 600

    function urlFor(source) {
        return builder.image(source)
    }

    useEffect(() => {
        const keyDownHandler = event => {
          console.log('User pressed: ', event.key);
          if (event.key === 'Escape') {
            event.preventDefault();
            setModal(false)
            }
          };
          document.addEventListener('keydown', keyDownHandler);
          return () => {
            document.removeEventListener('keydown', keyDownHandler);
          };
      }, []);
    return (
        <>
            {modal &&
                <div
                    className='image-modal-div'
                    style={{ backgroundImage: `url(${urlFor(image === undefined ? Placeholder : image).width(800).height(800).url()})` }}
                 >
                    <img src={Close} className='close-modal-icon' onClick={() => setModal(false)} />
                </div>
            }
            {images && images.length > 1 &&
                <div style={{ columns: columnCount, columnGap: 0 }}>
                    {images && images[0] &&
                        images.map((image, i) => 
                                <img 
                                    src={urlFor(image.asset).url()} 
                                    key={i} 
                                    className='image'
                                    style={{ padding: gap/2 }}
                                    onClick={e => {
                                        setImage(image.asset)
                                        setModal(true)
                                    }}
                                />
                    )}
                </div>
            }
            {images && images.length === 1 &&
                <div>
                    {images && images[0] &&
                        images.map((image, i) => {
                            const size = mobile ? 400 : 800
                            return (
                                <img 
                                    src={urlFor(image.asset).width(size).height(size).url()} 
                                    key={i} 
                                    className='image'
                                    style={{ padding: mobile ? 0 : gap/0.15 }}
                                    onClick={e => {
                                        setImage(image.asset)
                                        setModal(true)
                                    }}
                                />
                        )}
                    )}
                </div>
            }
        </>
    )
}