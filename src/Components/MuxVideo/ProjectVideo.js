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

  useEffect(() => {
    if(toggle){
      ref.current.play()
    } else {
      ref.current.pause()
    }
  },[toggle])

  return (
    <MuxPlayer
      ref={ref}
      onClick={() => setToggle(!toggle)}
      className='project'
      playbackId={playbackId} 
      metadata={{video_title: title}} 
      streamType="on-demand" 
      autoPlay={true}
    />
    )
}