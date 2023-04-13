import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import { Canvas, useFrame } from '@react-three/fiber'

const Coin = () => {
    const [logo, setLogo] = useState()
    const group = useRef()

    useFrame((state, delta) => group.current && (group.current.rotation.y += delta))

    useEffect(() => {
        const loader = new SVGLoader()
        loader.load(
            // resource URL
            'images/logo-inner.svg',
            // called when the resource is loaded
            function (data) {
                const material = new THREE.MeshStandardMaterial({
                    color: '#f8cfb1'
                })

                const ring = new THREE.Shape()
                ring.absarc(0, 0, 1.2, 0, Math.PI * 2, 0, false)
                const hole = new THREE.Path()
                hole.absarc(0, 0, 1, 0, Math.PI * 2, true)
                ring.holes.push(hole)

                const logo = (
                    <group ref={group} scale={2}>
                        {SVGLoader.createShapes(data.paths[0]).map((shape) => (
                            <mesh material={material} scale={[1 / 12, -1 / 12, 1 / 12]}>
                                <extrudeBufferGeometry
                                    args={[shape, { depth: 2, bevelEnabled: false }]}
                                    onUpdate={(geometry) => {
                                        geometry.center()
                                    }}
                                />
                            </mesh>
                        ))}
                        <mesh material={material} rotation-x={Math.PI / 2}>
                            <cylinderBufferGeometry args={[1.1, 1.1, 0.1, 32]} />
                        </mesh>
                        <mesh material={material}>
                            <extrudeBufferGeometry
                                args={[ring, { depth: 1 / 6, bevelEnabled: false, curveSegments: 100 }]}
                                onUpdate={(geometry) => {
                                    geometry.center()
                                }}
                            />
                        </mesh>
                    </group>
                )
                setLogo(logo)
            },
            // called when loading is in progresses
            function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            // called when loading has errors
            function (error) {
                console.log(error)
            }
        )
    }, [])

    return logo
}

const Graphic = () => {
    return (
        <Canvas>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Coin />
        </Canvas>
    )
}

export default Graphic
