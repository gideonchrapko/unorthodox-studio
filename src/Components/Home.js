import sanityClient from '../client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    const [landingPageData, setLandingPageData] = useState()

    useEffect(() => {
        sanityClient.fetch(`*[_type == "landingPage"]{
            LandingPageReel,
            aboutCopy,
        }`)
        .then((data) => setLandingPageData(data))
        .catch(console.error)
    },[])

    return (
        <div>
            <div>
                Hello
            </div>
            <div>
                <button>VISUAL</button>
                <button>SOUND</button>
                <button>FASHION</button>
                <button>USER EXPERIENCE</button>
            </div>
            <div>
                <Link to='/project/Project1'>Project Link</Link>
            </div>
        </div>
    )
}

export default Home