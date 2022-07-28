import { Suspense, useEffect, useState } from 'react';
import { ContactShadows, Backdrop, Environment, softShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';

import Controls from '../Components3D/Controls';
import Logo from '../Components3D/Logo';

softShadows()

const Landing = () => {

    return (
        <Canvas 
            style={{ height: "100vh", width: "100vw" }}
            dpr={[1, 2]} shadows camera={{ position: [0, 0, 4] }}
        >
                <color attach="background" args={['#0f0f0f']} />
                <ambientLight intensity={1} />
                <fog attach="fog" args={['black', 1, 150]} />
                <spotLight intensity={1} angle={0.2} penumbra={1} position={[1, 25, 10]} color="#d6e5ff" />
                <Backdrop castShadow receiveShadow floor={2} position={[0, -1, -3]} scale={[50, 10, 4]}>
                    <meshStandardMaterial color="#0f0f0f" envMapIntensity={0.1}/>
                </Backdrop>
            <Suspense fallback={"Loading..."}>
                <Controls />
                <Logo />
                <ContactShadows
                    rotation-x={Math.PI / 2}
                    position={[0, -35, 0]}
                    opacity={0.25}
                    width={100}
                    height={100}
                    blur={2}
                    far={50}
                />
                <Environment preset="studio" resolution={256} />
            </Suspense>
        </Canvas>
    )
}

export default Landing