import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { useRef, useEffect, useState, FC } from "react";

interface GLTFResult {
    scene: Group;
}

interface CoinModelProps {
    modelUrl: string;
    scale: number;
    position: [number, number, number];
    xRotationAmount: number;
    yRotationAmount: number;
}

const CoinModel: FC<CoinModelProps> = ({ modelUrl, scale, position, xRotationAmount, yRotationAmount }) => {
    const coinRef = useRef<Mesh | null>(null);
    const { scene } = useGLTF(modelUrl) as GLTFResult;

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
            coinRef.current.rotation.y = Math.PI + mousePos.x * yRotationAmount;
            coinRef.current.rotation.x = -mousePos.y * xRotationAmount;
        }
    });

    return (
        <primitive
            object={scene}
            ref={coinRef}
            scale={scale}
            position={position}
        />
    );
};

const CoinScene: FC = () => {
    return (
        <div className='fixed inset-0 pointer-events-none'>
            <Canvas camera={{ position: [0, 0, 5], fov: 90 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />

                {/* Scrt Coin */}
                <CoinModel modelUrl="models/scrt.glb" scale={1.5} position={[0, 0, 0]} xRotationAmount={0.3} yRotationAmount={0.3} />

                {/* Bitcoin Coin */}
                <CoinModel modelUrl="models/bitcoin.glb" scale={1} position={[-2.7, -0.5, 0]} xRotationAmount={0.5} yRotationAmount={0.5} />

                {/* Ethereum Coin */}
                <CoinModel modelUrl="models/ethereum.glb" scale={1} position={[2.7, -0.5, 0]} xRotationAmount={0.5} yRotationAmount={0.5} />

                <OrbitControls enablePan={false} enableZoom={false} />
            </Canvas>
        </div>
    );
};

export default CoinScene;
