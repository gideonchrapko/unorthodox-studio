import * as THREE from "three";
import { Suspense, useEffect, useState } from 'react';
import { 
    ContactShadows, 
    Environment, 
    softShadows, 
    useTexture, 
    Reflector, 
    Lightformer,
    useAspect
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import { useDrag } from 'react-use-gesture';
import { useShopify } from '../hooks'

import Controls from '../Components3D/Controls';
import { Effects } from '../Components3D/Effects'
import Logo from '../Components3D/Logo';

softShadows();

// function Ground() {
//     const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
//     return (
//       <Reflector blur={[400, 100]} position={[0, -2, 0]} resolution={512} args={[10, 15]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
//         {(Material, props) => <Material color="#303030" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
//       </Reflector>
//     )
//   }

  function Video() {
    const scale = useAspect(35500, 39500, 2)
    // Video texture by: https://www.pexels.com/@rostislav/
    const [video] = useState(() =>
      Object.assign(document.createElement('video'), { src: '/giphy.mp4', crossOrigin: 'Anonymous', loop: true, muted: true })
    )
    useEffect(() => void video.play(), [video])
    return (
      <mesh scale={scale} position={[0, 0, -7]} >
        <planeGeometry />
        <meshBasicMaterial toneMapped={true} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        </meshBasicMaterial>
      </mesh>
    )
  }

const Landing = () => {
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

    return (
        <Canvas style={{ height: "100vh" }} shadows camera={{ position: [0, 0, 8], fov: 28 }}>
            <color attach="background" args={['#151520']} />
            <directionalLight position={[-2.5, 4, 5]} castShadow intensity={1} shadow-bias={-0.00001} shadow-mapSize={[1024, 1024]} />
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
    )
}

export default Landing