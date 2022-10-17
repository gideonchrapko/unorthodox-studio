import MuxPlayer from '@mux/mux-player-react';
import {useEffect} from 'react';

export default function LandingVideo(props) {
  const { playbackId, title } = props

  useEffect(() => {
    document.title = title
  }, [title])

  return <MuxPlayer playbackId={playbackId} metadata={{video_title: title}} streamType="on-demand" />
}