import MuxPlayer from '@mux/mux-player-react';
import { useEffect, useRef, useState } from 'react';

import './mux.css'

export default function Video(props) {
  const { playbackId, title } = props
  const [toggle, setToggle] = useState(true)
  const ref = useRef();

  useEffect(() => {
    document.title = title
  }, [title])

  // useEffect(() => {
  //   ref.current.play().then(function () {
  //     }).catch(function (error) {
  //       console.log("video error")
  //      }); 
  // },[])

  useEffect(() => {
    if(toggle){
      ref.current.play()
      console.log("play")
    } else {
      ref.current.pause()
      console.log("pause")
    }
  },[toggle])

  // console.log(toggle)

  return (
    <>
      <MuxPlayer
        ref={ref}
        className='project'
        playbackId={playbackId} 
        metadata={{video_title: title}} 
        streamType="on-demand" 
        // autoPlay={true}
        muted={true}
      />
      <h4 style={{ color: "white", cursor: "pointer" }} onPointerDown={() => setToggle(!toggle)}>{toggle ? "pause"  : "play"}</h4>
    </>
    )
}