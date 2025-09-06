import React from "react";
import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, useHelper } from "@react-three/drei";
import * as THREE from "three";
import { SpotLight, SpotLightHelper } from 'three';
import { TextureLoader } from "three";
import { RGBELoader } from "three-stdlib";
import ColorChanger from "../components/ColorChanger";

const modelMap = {
    iphone: {
        modalPath: '/src/assets/glb/iphone.glb',
        position: [0,0,0],
        scale:[1.8,1.8,1.8],
        rotation:[0,(-Math.PI / 2) + 1.35, 0],
        lightpower:3
    },
    airpod: {
        modalPath: '/src/assets/glb/airpod.glb',
        position: [0,-0.5,0],
        scale:[35,35,35],
        rotation:[0,(-Math.PI / 2) - 1, 0],
        lightpower:3
    },
    ipad: {
        modalPath: '/src/assets/glb/ipad.glb',
        position: [0,-1.6,0],
        scale:[0.04,0.04,0.04],
        rotation:[0,(-Math.PI / 2), 0],
        lightpower:8
    },
    airmax: {
        modalPath: '/src/assets/glb/airpods_max.glb',
        position: [0,-1.5,0],
        scale:[2.2,2.2,2.2],
        rotation:[0,(-Math.PI / 2), 0],
        lightpower:1
    },
    macbook: {
        modalPath: '/src/assets/glb/macbook.glb?',
        position: [0,-1.1,0],
        scale:[8.4,8.4,8.4],
        rotation:[0,(-Math.PI / 2) + 0.3, 0],
        lightpower:3
    }
}

function ProductCall({modalPath,position,scale,rotation,colors}) {
    const gltf = useGLTF(modalPath);
    const roughMap = useLoader(TextureLoader,'/image/metal3.jpg')

    useMemo(() => {
        gltf.scene.traverse((o) => {
            if (!o.isMesh) return;
            //console.log(o.name)
            console.log(colors)
            const n = o.name.toLowerCase();

            if (n.includes("basecolor")) {
                o.material = new THREE.MeshPhysicalMaterial({
                    //color: 0xa39c89,
                    color:colors,
                    metalness: 0,
                    roughness: 0.2,
                    clearcoat: 0.1,
                    clearcoatRoughness: 0.2,
                    transmission: 0,
                    thickness: 0.2,
                    ior: 1.5,
                });
            }
            else if (n.includes("back") || (n.includes("glass") && n.includes("plane"))) {
                o.material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0,
                roughness: 0,
                transmission: 0.85,
                thickness: 0.6,
                opacity: 0.6,
                clearcoat: 1,
                clearcoatRoughness: 1,
                ior: 1,
                });
            }
            else if (n.includes("frame") || n.includes("edge") || n.includes("metal")) {
                o.material = new THREE.MeshStandardMaterial({
                color: colors,
                metalness: 0.9,
                roughness: 0.2,
                clearcoat: 0,
                transmission: 0,
                roughnessMap: roughMap,
                });
            }
            else if (n.includes("logo")) {
                o.material = new THREE.MeshPhysicalMaterial({
                color: 0x827e78,
                metalness: 0.4,
                roughness: 0.2,
                clearcoat: 0,
                roughnessMap: roughMap,
                });
            }
            if (n.includes("plastic")) {
                o.material = new THREE.MeshPhysicalMaterial({
                color: 0x9a9999,
                metalness: 0,
                roughness: 0.2,
                ior: 1.5,
                });
            }
            o.castShadow = true;
            o.receiveShadow = false;
        });
    }, [gltf,colors]);

    return (
        <group scale={scale} position={position} rotation={rotation}>
            <primitive
            object={gltf.scene}
            castShadow
            ></primitive>
        </group>
    )
}

function MyScene({...props}) {
    const spotLightRef = useRef();
    //useHelper(spotLightRef, SpotLightHelper, 'cyan'); // The third argument is the helper's color
    return (
        <spotLight
            ref={spotLightRef}
            position={[0,0,0]}
            angle={0.23}
            penumbra={0.8}
            distance={30}
            anglePower={4}
            attenuation={5}
            castShadow
            {...props}
        />
    );
}

export default function Showroom({product}) {
    const modalPath = modelMap[product] || modelMap['iphone'];
    const LightPower = modelMap[product].lightpower || modelMap['iphone'].lightpower;
    const [colors,setColors] = useState('#959086')
    const [text,setText] = useState('내추럴 티타늄 색상의 iPhone')
    return (
        <div className="w-[100vw] h-[100vh]">
            <Canvas shadows
            camera={{ position:[5,0,5], fov:45 }}
            key={product}
            className="w-[100vw] h-[100vh]"
            >
                <color attach="background" args={['#191919']} />
                <ambientLight intensity={0.1} color={'0xffffff'}></ambientLight>
                <MyScene color="#c27aff" position={[0, 4, 0]} intensity={LightPower}></MyScene>
                <Suspense fallback={null}>
                    <ProductCall
                    modalPath={modalPath.modalPath}
                    position={modalPath.position}
                    scale={modalPath.scale}
                    rotation={modalPath.rotation}
                    colors={colors}
                    ></ProductCall>
                    <Environment
                        files="/src/assets/hdr/artist_workshop.hdr"
                        background={false}
                        path=""
                        preset={null}
                    />
                </Suspense>
                <mesh
                rotation={[-Math.PI / 2,0,0]}
                position={[0,-2,0]}
                >
                    <planeGeometry args={[5,5]} />
                    <meshPhongMaterial color="#e0e0e0" specular="#c27aff" shininess={50} />
                </mesh>
                <OrbitControls></OrbitControls>
            </Canvas>
            <ColorChanger selectedColor={setColors} colortext={setText} product={product}/>
            <p className="text-center text-white text-sm fixed bottom-5.5 left-[50%] z-99 translate-x-[-50%]">{text}</p>
        </div>
    )

}