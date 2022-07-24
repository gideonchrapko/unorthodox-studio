import { Suspense } from 'react';
import { ContactShadows, Backdrop, Environment, softShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import { EffectComposer, SSAO } from '@react-three/postprocessing'
// import { useSpring } from '@react-spring/core'
// import { a } from '@react-spring/three'

import Controls from '../Components3D/Controls';
import Logo from '../Components3D/Logo';

softShadows()

const Landing = () => {
    return (
        <Canvas 
            style={{ height: "100vh", width: "100vw" }}
            dpr={[1, 2]} shadows camera={{ position: [0, 0, 4] }}
            // gl={{ antialias: false }}
        >
                <color attach="background" args={['#EAEAEA']} />
                <ambientLight intensity={1} />
                <spotLight intensity={5} angle={0.2} penumbra={1} position={[1, 25, 10]} color="#d6e5ff" />
                <hemisphereLight color="#ffffff" groundColor="#b9b9b9" position={[-7, 25, 13]} intensity={0.85} />
                <Backdrop castShadow floor={2} position={[0, -1, -3]} scale={[50, 10, 4]}>
                    <meshStandardMaterial color="#cfcfcf" envMapIntensity={0.1} />
                </Backdrop>
                {/* <EffectComposer multisampling={0}>
                    <SSAO samples={31} radius={0.1} intensity={30} luminanceInfluence={0.1} color="red" />
                </EffectComposer> */}
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
                <Environment preset="warehouse" />
            </Suspense>
        </Canvas>
    )
}

export default Landing