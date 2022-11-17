import MuxPlayer from '@mux/mux-player-react';
import { useEffect, useRef, useState } from 'react';

import './mux.css'

export default function LandingVideo(props) {
  const { playbackId, title } = props
  // const [muted, setMuted] = useState(false);
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

  return (
    <MuxPlayer 
      ref={ref} 
      style={{ 
        width: "100%",
        height: "65vh",
        // aspectRatio: "5/2"
       }} 
      autoplay={true}
      playbackId={playbackId} 
      metadata={{video_title: title}} 
      streamType="on-demand"
      muted={true}
      loop={true}
    />
  )
}