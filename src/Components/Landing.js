import * as THREE from "three";
import { Suspense, useEffect, useState, useMemo, useRef } from 'react';
import { ContactShadows, Environment, softShadows } from '@react-three/drei'
import { Canvas, extend, useThree, useLoader,useFrame } from '@react-three/fiber';
import { useDrag } from 'react-use-gesture';
import { Water } from 'three-stdlib';
import { useShopify } from '../hooks'

import Controls from '../Components3D/Controls';
import Logo from '../Components3D/Logo';

softShadows();

const Landing = () => {
    const { setModalImg, modalImg } = useShopify();
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [dragX, setDragX] = useState({ x: 0 });
    const [dragY, setDragY] = useState({ y: 0 });

    const bind = useDrag((params) => {
        setDragX({ x: params.offset[0] })
        setDragY({ y: params.offset[1] })
      })

    useEffect(() => {
        rotation[0] = dragY.y / 75
        rotation[1] = dragX.x / 75
        setRotation([...rotation])
      },[dragX, dragY])

    extend({ Water })
    function Ocean() {
        const ref = useRef()
        const gl = useThree((state) => state.gl)
        const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
        const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
        const config = useMemo(
            () => ({
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: "0xffffff",
            waterColor: "#000F9B",
            distortionScale: 1.2,
            fog: true,
            format: gl.encoding
            }),
            [waterNormals]
        )
        useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
        return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
    }

    return (
        <Canvas style={{ height: "100vh", width: "100vw" }} dpr={[1, 2]} shadows camera={{ position: [0, 2, 4], fov: 100 }}>
        {/* <Canvas 
             receiveShadow 
             castShadow 
             shadows
             dpr={[1, 2]}
             performance={{ min: 0.5 }}
             gl={{ alpha: false, antialias: false }}
             camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}
         >  */}
            <color attach="background" args={['#000000']} {...bind()}/>
            <ambientLight intensity={1} />
            <fog attach="fog" args={['black', 1, 10]} />
            <spotLight intensity={1} angle={0.2} penumbra={1} position={[1, 25, 10]} color="white" />
            <ContactShadows position={[0, -2.1, 0]} opacity={0.3} scale={10} blur={1.5}  />
            {/* <Backdrop castShadow receiveShadow floor={2} position={[0, -2.2, -3]} scale={[50, 10, 4]} {...bind()}>
                 <meshStandardMaterial color="#1a1a1a" envMapIntensity={0.1}>
                    <videoTexture attach="map" args={[video]} />
                    <videoTexture attach="emissiveMap" args={[video]} />
                </meshStandardMaterial>
            </Backdrop> */}
         <Suspense fallback={"Loading..."}>
            <Ocean {...bind()}/>
            <Controls />
            <Logo rotation={rotation} setModalImg={setModalImg} />
            {/* <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -35, 0]}
                opacity={0.25}
                width={100}
                height={100}
                blur={2}
                far={50}
            /> */}
            <Environment files="./studio_small_03_2k(2).hdr" resolution={256} />
            {/* <Environment resolution={10} far={1000} near={1} preset="studio" /> */}
            </Suspense>
        </Canvas>
    )
}

export default Landing