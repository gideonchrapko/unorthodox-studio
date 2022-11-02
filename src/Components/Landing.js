import * as THREE from "three";
import { Suspense, useEffect, useState } from 'react';
import { useAspect, Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useDrag } from 'react-use-gesture';
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MailchimpSubscribe from './Mailchimp/MailchimpSubscribe';

import Logo from '../Components3D/Logo';
import Controls from '../Components3D/Controls';
import { Effects } from '../Components3D/Effects';

  function Video() {
    const scale = useAspect(800, 450, 2)
    const [video] = useState(() =>
      Object.assign(document.createElement('video'), { src: '/giphy_slowed_1.mp4', crossOrigin: 'Anonymous', loop: true, muted: true,  playsInline: true })
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
    const [entered, setEntered] = useState(false)
    const [dragX, setDragX] = useState({ x: 0 });
    const [dragY, setDragY] = useState({ y: 0 });
    const mobile = window.innerWidth < 600
    const navigate = useNavigate();

    const bind = useDrag((params) => {
        setDragX({ x: params.offset[0] })
        setDragY({ y: params.offset[1] })
      })

    useEffect(() => {
        rotation[0] = dragY.y / 75
        rotation[1] = dragX.x / 75
        setRotation([...rotation])
      },[dragX, dragY])

    useEffect(() => {
      (async () => {
        if (entered === true) {    
            return  setTimeout(function() {
                navigate("/home");
           }, 2000);
       }  
   })();
    },[entered])

    return (
        <Container fluid>
          <Loader />
            <button style={{ position: "fixed", zIndex: "9", color: "white", opacity: "0" }}>
              <h1 onClick={() => {
                setEntered(true)
                setRotation([0, 0, 0])
                }}>
                  Enter Site
              </h1>
            </button>
            <Canvas 
              style={{ 
                height: "100vh", 
                width: "100vw", 
                marginLeft: "-15px", 
                position: "fixed", 
                top: "0",
                opacity: entered ? 0 : 1,
                transition: "opacity 1s",
                transitionDelay: "1s"
              }} 
              shadows 
              camera={{ position: [0, 0, 12], fov: mobile ? 40 : 28 }}
            >                
              <Effects />
                <Video />
                <Suspense fallback={null}>
                  <Controls />
                  <group position={[0, -2.5, 0]}>
                      <mesh receiveShadow rotation-x={-Math.PI / 2} scale={100} position={[0, mobile ? -2 : -1, 0]}>
                          <planeGeometry />
                          <meshStandardMaterial color="black" envMapIntensity={0} roughness={0.5} metalness={0} />
                      </mesh>
                  </group>
                  <Logo entered={entered} rotation={rotation} {...bind()}/>
                </Suspense>
            </Canvas>
            <MailchimpSubscribe />
        </Container>
    )
}

export default Landing