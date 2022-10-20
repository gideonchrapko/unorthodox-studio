import MuxPlayer from '@mux/mux-player-react';
import { useEffect, useRef } from 'react';

import './mux.css'

export default function LandingVideo(props) {
  const { playbackId, title } = props
  const ref = useRef();

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    ref.current.play().then(function () {
        console.log("video is playing")
      }).catch(function (error) {
        // do something if you want to handle or track this error
       }); 
  },[])

  return <MuxPlayer ref={ref} style={{ width: "100%" }} playbackId={playbackId} metadata={{video_title: title}} streamType="on-demand" />
}