import * as THREE from "three";
import { Suspense, useEffect, useState } from 'react';
import { useAspect, Loader, useTexture, Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useDrag } from 'react-use-gesture';
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom'

import Controls from '../Components3D/Controls';
import { Effects } from '../Components3D/Effects';
import MailchimpSubscribe from './Mailchimp/MailchimpSubscribe'
import Logo from '../Components3D/Logo';

  function Video() {
    const scale = useAspect(35500, 39500, 2)

    const [video] = useState(() =>
      Object.assign(document.createElement('video'), { src: '/giphy_slowed.mp4', crossOrigin: 'Anonymous', loop: true, muted: true,  playsInline: true })
    )
    useEffect(() => void video.play(), [video])

    return (
      <mesh scale={scale} position={[0, 0, -7]} onPointerDown={() => video.play()}>
          <planeGeometry />
          <meshBasicMaterial toneMapped={true} side={THREE.DoubleSide}>
            <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding}  />
          </meshBasicMaterial>
      </mesh>
    )
  }

const Landing = () => {
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [dragX, setDragX] = useState({ x: 0 });
    const [dragY, setDragY] = useState({ y: 0 });
    const mobile = window.innerWidth < 600

    const bind = useDrag((params) => {
        setDragX({ x: params.offset[0] })
        setDragY({ y: params.offset[1] })
      })

    useEffect(() => {
        rotation[0] = dragY.y / 75
        rotation[1] = dragX.x / 75
        setRotation([...rotation])
      },[dragX, dragY])

    return (
        <Container fluid>
          <Loader />
          <Link to='home'>Go to Home Page</Link>
            <Canvas style={{ height: "100vh", width: "100vw", marginLeft: "-15px", position: "fixed", top: "0" }} shadows camera={{ position: [0, 0, 8], fov: mobile ? 60 : 40 }}>
                <directionalLight position={[0, 0, 30]} castShadow intensity={0.3} shadow-bias={-0.00001} shadow-mapSize={[1024, 1024]} />
                <Effects />
                <Video />
                <Suspense fallback={null}>
                      <Controls />
                      <group position={[0, -2.5, 0]}>
                            <mesh receiveShadow rotation-x={-Math.PI / 2} scale={100} position={[0, -1, 0]}>
                                <planeGeometry />
                                <meshStandardMaterial color="black" envMapIntensity={0.5} roughness={0} metalness={0} />
                            </mesh>
                        </group>
                        <Logo rotation={rotation} {...bind()}/>
                  </Suspense>
            </Canvas>
            <MailchimpSubscribe />
        </Container>
    )
}

export default Landing