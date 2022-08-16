import * as THREE from "three";
import { Suspense, useEffect, useState } from 'react';
import { ContactShadows, Backdrop, Environment, softShadows, Reflector, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import { useDrag } from 'react-use-gesture';
import { useShopify } from '../hooks'

import Controls from '../Components3D/Controls';
import Logo from '../Components3D/Logo';

import url from '../Assets/BG_Vid.mp4';

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

      const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = url;
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.play();
        return vid;
      });

      // function Ground() {
      //   const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
      //   return (
      //     <Reflector position={[0, -2.05, 0]} blur={[400, 100]} resolution={512} args={[10, 20]} mirror={0.6} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      //       {(Material, props) => <Material color="#a0a0a0" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
      //     </Reflector>
      //   )
      // }

    return (
        <Canvas style={{ height: "100vh", width: "100vw" }} dpr={[1, 2]} shadows camera={{ position: [0, 0, 4] }}>
            <color attach="background" args={['#0f0f0f']} {...bind()}/>
            <ambientLight intensity={1} />
            <fog attach="fog" args={['black', 1, 150]} />
            <spotLight intensity={1} angle={0.2} penumbra={1} position={[1, 25, 10]} color="white" />
            <ContactShadows position={[0, -2.1, 0]} opacity={0.3} scale={10} blur={1.5}  />
            <Backdrop castShadow receiveShadow floor={2} position={[0, -2.2, -3]} scale={[50, 10, 4]} {...bind()}>
                 <meshStandardMaterial color="#1a1a1a" envMapIntensity={0.1}>
                    {/* <videoTexture attach="map" args={[video]} />
                    <videoTexture attach="emissiveMap" args={[video]} /> */}
                </meshStandardMaterial>
            </Backdrop>
         <Suspense fallback={"Loading..."}>
            {/* <Ground /> */}
            <Controls />
            <Logo rotation={rotation} setModalImg={setModalImg} />
            {modalImg === 1 ?
                    <group>
                        <mesh rotation={[0, 0, 0]} position={[0, 3, -4]} scale={3}>
                            <planeGeometry args={[2.4, 2.4]} />
                            <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide} roughness={0} metalness={0.1}>
                              <videoTexture attach="map" args={[video]} />
                              <videoTexture attach="emissiveMap" args={[video]} />
                            </meshStandardMaterial>
                        </mesh>
                    </group>
                    :
                    <mesh></mesh>
            }
            <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -35, 0]}
                opacity={0.25}
                width={100}
                height={100}
                blur={2}
                far={50}
            />
            <Environment files="./studio_small_03_2k(2).hdr" resolution={256} />
            {/* <Environment resolution={10} far={1000} near={1} preset="studio" /> */}
            </Suspense>
        </Canvas>
    )
}

export default Landing