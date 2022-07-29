import { Suspense, useEffect, useState } from 'react';
import { ContactShadows, Backdrop, Environment, softShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import { useDrag } from 'react-use-gesture';
// import { useSpring } from '@react-spring/core';
// import { a } from '@react-spring/three';

import Controls from '../Components3D/Controls';
import Logo from '../Components3D/Logo';

softShadows();

const Landing = () => {
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [dragX, setDragX] = useState({ x: 0 });
    const [dragY, setDragY] = useState({ y: 0 });

    const bind = useDrag((params) => {
        setDragX({ x: params.offset[0] / 5 })
        setDragY({ y: params.offset[1] / 5 })
      })

    useEffect(() => {
        rotation[0] = dragY.y / 5
        rotation[1] = dragX.x / 5
        setRotation([...rotation])
      },[dragX, dragY])

    return (
        <Canvas 
            style={{ height: "100vh", width: "100vw" }}
            dpr={[1, 2]} shadows camera={{ position: [0, 0, 4] }}
        >
            {/* <color attach="background" args={['white']} /> */}
            <color attach="background" args={['#0f0f0f']} />
            <ambientLight intensity={1} />
            <fog attach="fog" args={['black', 1, 150]} />
            <spotLight intensity={1} angle={0.2} penumbra={1} position={[1, 25, 10]} color="white" />
            <ContactShadows position={[0, -2.1, 0]} opacity={0.3} scale={10} blur={1.5}  />
            <Backdrop castShadow receiveShadow floor={2} position={[0, -2.2, -3]} scale={[50, 10, 4]} {...bind()}>
                 <meshStandardMaterial color="#1a1a1a" envMapIntensity={0.1}/>
            </Backdrop>
         <Suspense fallback={"Loading..."}>
             <Controls />
            <Logo rotation={rotation}/>
            <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -35, 0]}
                opacity={0.25}
                width={100}
                height={100}
                blur={2}
                far={50}
            />
            <Environment preset="studio" resolution={512} />
            </Suspense>
        </Canvas>
    )
}

export default Landing