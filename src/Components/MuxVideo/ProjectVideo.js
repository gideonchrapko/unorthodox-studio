import MuxPlayer from '@mux/mux-player-react';
import {useEffect} from 'react';

import './mux.css'

export default function Video(props) {
  const { playbackId, title } = props

  useEffect(() => {
    document.title = title
  }, [title])

  return <MuxPlayer playbackId={playbackId} metadata={{video_title: title}} streamType="on-demand" />
  
}