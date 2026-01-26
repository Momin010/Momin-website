import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float, Environment, Stars, Preload } from '@react-three/drei'
import * as THREE from 'three'

// Floating 3D Model Component
function FloatingModel({
    path,
    position,
    scale = 1,
    rotationSpeed = 0.3,
    floatSpeed = 1,
    floatIntensity = 1
}: {
    path: string
    position: [number, number, number]
    scale?: number
    rotationSpeed?: number
    floatSpeed?: number
    floatIntensity?: number
}) {
    const { scene } = useGLTF(path)
    const meshRef = useRef<THREE.Group>(null)

    // Clone the scene to avoid issues with multiple instances
    const clonedScene = useMemo(() => scene.clone(), [scene])

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += rotationSpeed * 0.01
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={floatIntensity}>
            <primitive
                ref={meshRef}
                object={clonedScene}
                position={position}
                scale={scale}
            />
        </Float>
    )
}

// Mouse-follow camera effect
function CameraRig() {
    const { camera } = useThree()
    const mouse = useRef({ x: 0, y: 0 })

    useFrame((state) => {
        mouse.current.x = state.pointer.x
        mouse.current.y = state.pointer.y

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 2, 0.02)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 1.5, 0.02)
        camera.lookAt(0, 0, 0)
    })

    return null
}

// Particle system for atmosphere
function Particles() {
    const count = 300
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50
        }
        return pos
    }, [])

    const ref = useRef<THREE.Points>(null)

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.015
            ref.current.rotation.x = state.clock.elapsedTime * 0.01
        }
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#9d4edd"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

// Loading fallback
function LoadingFallback() {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#7c3aed" wireframe />
        </mesh>
    )
}

// Main Scene with all floating models
function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#7c3aed" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#9d4edd" />
            <pointLight position={[0, 20, 0]} intensity={0.5} color="#4a2c7a" />
            <spotLight
                position={[5, 15, 5]}
                angle={0.4}
                penumbra={1}
                intensity={1}
                color="#7c3aed"
                castShadow
            />

            {/* Environment */}
            <Environment preset="night" />
            <Stars
                radius={80}
                depth={60}
                count={3000}
                factor={5}
                saturation={0.3}
                fade
                speed={0.8}
            />

            {/* Particles */}
            <Particles />

            {/* Floating 3D Models */}
            <Suspense fallback={<LoadingFallback />}>
                {/* Diamond - Center hero */}
                <FloatingModel
                    path="/models/diamond.glb"
                    position={[0, 2, 0]}
                    scale={3}
                    rotationSpeed={0.5}
                    floatIntensity={2}
                />

                {/* Laptop - Developer theme */}
                <FloatingModel
                    path="/models/laptop.glb"
                    position={[-8, -3, -5]}
                    scale={0.8}
                    rotationSpeed={0.2}
                    floatSpeed={0.8}
                />

                {/* Neural Network - AI theme */}
                <FloatingModel
                    path="/models/artificial_neural_network_ann.glb"
                    position={[10, 4, -8]}
                    scale={0.5}
                    rotationSpeed={0.15}
                    floatIntensity={1.5}
                />

                {/* Gear - Engineering */}
                <FloatingModel
                    path="/models/stylized_gear.glb"
                    position={[-12, 6, -10]}
                    scale={0.3}
                    rotationSpeed={0.4}
                    floatSpeed={1.2}
                />

                {/* Boxes - Projects */}
                <FloatingModel
                    path="/models/cardboard_boxes.glb"
                    position={[15, -5, -12]}
                    scale={0.015}
                    rotationSpeed={0.1}
                    floatIntensity={0.8}
                />
            </Suspense>

            {/* Camera Effects */}
            <CameraRig />
        </>
    )
}

// Main Canvas Component - Full page background
export default function FloatingCanvas() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 20], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 2]}
                style={{ background: 'transparent', pointerEvents: 'auto' }}
            >
                <color attach="background" args={['#050208']} />
                <fog attach="fog" args={['#050208', 20, 80]} />

                <Scene />
                <Preload all />
            </Canvas>
        </div>
    )
}

// Preload all models
useGLTF.preload('/models/diamond.glb')
useGLTF.preload('/models/laptop.glb')
useGLTF.preload('/models/artificial_neural_network_ann.glb')
useGLTF.preload('/models/stylized_gear.glb')
useGLTF.preload('/models/cardboard_boxes.glb')
