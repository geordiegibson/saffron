import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Mesh, Group } from 'three';
import {useRef, useEffect, useState, FC} from "react";

interface GLTFResult {
    scene: Group;
}

const CoinModel: FC = () => {
    const coinRef = useRef<Mesh | null>(null);
    const { scene } = useGLTF('models/coin.glb') as GLTFResult;

    scene.rotation.z = Math.PI;

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            setMousePos({ x, y });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);



    useFrame(() => {
        if (coinRef.current) {
            coinRef.current.rotation.y = Math.PI + mousePos.x * 0.5;
            coinRef.current.rotation.x = -mousePos.y * 0.2;
        }
    });

    return <primitive object={scene} ref={coinRef} scale={1.5} />; // Slightly smaller scale
};

const CoinScene: FC = () => {
    return (
        <div className='fixed inset-0 pointer-events-none'>
            <Canvas camera={{position: [0, 0, 5], fov: 90}}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />
                <CoinModel />
                {/* Optional: Controls for debugging and fine-tuning */}
                <OrbitControls enablePan={false} enableZoom={false}/>
            </Canvas>
        </div>
    );
};

export default CoinScene;
