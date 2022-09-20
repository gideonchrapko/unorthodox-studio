import * as THREE from "three";
import { Suspense, useEffect, useState } from 'react';
import { useAspect } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useDrag } from 'react-use-gesture';
import { Container, Row, Col } from "react-bootstrap";

import Controls from '../Components3D/Controls';
import { Effects } from '../Components3D/Effects';
import MailchimpSubscribe from './Mailchimp/MailchimpSubscribe'
import Logo from '../Components3D/Logo';

import Branding from '../Assets/branding.svg'

  function Video() {
    const scale = useAspect(35500, 39500, 2)
    const mobile = window.innerWidth < 600

    const [video] = useState(() => {
      const vid = document.createElement("video");
      vid.src = '/giphy_slowed.mp4';
      vid.crossOrigin = "Anonymous";
      vid.loop = true;
      vid.muted = true;
      vid.playsInline=true;
      vid.play();
      return vid;
    });

    // const [video] = useState(() =>
    //   Object.assign(document.createElement('video'), { src: '/giphy_slowed.mp4', crossOrigin: 'Anonymous', loop: true, muted: true, autoPlay: true, playsinline: true })
    // )
    
    useEffect(() => void video.play(), [video])
    return (
      <mesh scale={scale} position={[0, 0, -7]} >
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
          <Row style={{ position: "relative", zIndex: "9", paddingTop: "10px"  }}>
            <Col lg={4}>
              <h3 className="landing-header d-sm-none d-none d-lg-block d-md-block" style={{ textAlign: "left" }}>UNORTHODOX__STUDIO</h3>
            </Col>
            <Col lg={4}>
              <h3 className="landing-header" style={{ textAlign: "center" }}><img src={Branding} style={{ height: "30px" }} /></h3>
            </Col>
            <Col lg={3} xs={12}>
              {/* <h3 className="landing-header" style={{ textAlign: mobile ? "center" : "right" }}>09/05/22__24:05:35</h3> */}
            </Col>
            <Col lg={1}>
              <h3 className="landing-header d-sm-none d-none d-lg-block d-md-block" style={{ textAlign: "right" }}>00</h3>
            </Col>
          </Row>
          <Canvas style={{ height: "100vh", width: "100vw", marginLeft: "-15px", position: "fixed", top: "0" }} shadows camera={{ position: [0, 0, 8], fov: mobile ? 60 : 40 }}>
              <color attach="background" args={['#151520']} />
              <directionalLight position={[-2.5, 4, 5]} castShadow intensity={3} shadow-bias={-0.00001} shadow-mapSize={[1024, 1024]} />
              <Effects />
              <Suspense fallback={"Loading..."}>
                  <Video />
                  <Controls />
                  <group position={[0, -1.5, 0]}>
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