import { Suspense } from 'react';
import { ContactShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
// import { useSpring } from '@react-spring/core'
// import { a } from '@react-spring/three'

import Controls from '../Components3D/Controls';
import Logo from '../Components3D/Logo';


const Landing = () => {
    return (
        <Canvas 
            style={{ height: "100vh", width: "100vw" }}
            shadows dpr={[1, 2]} camera={{ position: [0, 7, -1], fov: 50, near: 1, far: 20 }}
        >
                <color attach="background" args={['#EAEAEA']} />
                <ambientLight intensity={1} />
                <spotLight intensity={4} angle={0.1} penumbra={1} position={[1, 25, 10]} />
                <hemisphereLight color="#ffffff" groundColor="#b9b9b9" position={[-7, 25, 13]} intensity={0.85} />
            <Suspense fallback={<h1>Loading...</h1>}>
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
            </Suspense>
        </Canvas>
    )
}

export default Landing