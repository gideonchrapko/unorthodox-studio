import MuxPlayer from '@mux/mux-player-react';
import { useEffect, useRef, useState } from 'react';

import './mux.css'

export default function LandingVideo(props) {
  const { playbackId, title } = props
  const [togglePlay, setTogglePlay] = useState(true)
  const ref = useRef();

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    ref.current.play().then(function () {
      }).catch(function (error) {
        console.log("video error")
       }); 
  },[])

  // useEffect(() => {
  //   if(togglePlay){
  //     ref.current.p()
  //   }
  // },[togglePlay])

  return (
    <MuxPlayer 
      ref={ref} 
      className='landing'
      style={{ 
        width: "100%",
        height: "65vh"
       }}
      onClick={() => setTogglePlay(!togglePlay)}
      autoplay={true}
      playbackId={playbackId} 
      metadata={{video_title: title}} 
      streamType="on-demand"
      muted={true}
      loop={false}
    />
  )
}