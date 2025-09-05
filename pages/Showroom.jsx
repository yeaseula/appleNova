import React from "react";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
export default function Showroom({product}) {

    const modelMap = {
        iphone: {
            modalPath: '/src/assets/glb/iphone.glb',
            position: [0,0,0],
            scale:[2,2,2],
            rotation:[0,(-Math.PI / 2) + 0.3, 0],
            lightpower:7
        },
        airpod: {
            modalPath: '/src/assets/glb/airpod.glb',
            position: [0,-0.7,0],
            scale:[35,35,35],
            rotation:[0,(-Math.PI / 2) - 1, 0],
            lightpower:3
        },
        ipad: {
            modalPath: '/src/assets/glb/ipad.glb',
            position: [0,-1.8,0],
            scale:[0.04,0.04,0.04],
            rotation:[0,(-Math.PI / 2), 0],
            lightpower:8
        },
        airmax: {
            modalPath: '/src/assets/glb/airpods_max.glb',
            position: [0,-1.5,0],
            scale:[2.1,2.1,2.1],
            rotation:[0,(-Math.PI / 2), 0],
            lightpower:1
        },
        macbook: {
            modalPath: '/src/assets/glb/macbook.glb?',
            position: [0,-0.9,0],
            scale:[8.5,8.5,8.5],
            rotation:[0,(-Math.PI / 2) + 0.3, 0],
            lightpower:3
        }
    }
    const modalPath = modelMap[product] || modelMap['iphone']
    useEffect(() => {
        // 씬, 카메라, 렌더러
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(5, 0, 5);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        //shadow 그림자
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const container = document.getElementById("three-root");
        container.appendChild(renderer.domElement);

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        const ambient = new THREE.AmbientLight(0xffffff, 2.5);
        scene.add(ambient);

        const spot = new THREE.SpotLight(0xffffff, modalPath.lightpower);
        spot.position.set(5, 10, 5); // 위, 사선 등 원하는 위치
        spot.target.position.set(modalPath.position[0],modalPath.position[1],modalPath.position[2]); // 제품 위치
        spot.castShadow = true;
        scene.add(spot);
        scene.add(spot.target);

        // GLB 로드
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();
        const roughMap = textureLoader.load("/image/metal3.jpg");

        loader.load(modalPath.modalPath, (gltf) => {
            const appleProduct = gltf.scene;

            appleProduct.traverse((o) => {
                if (!o.isMesh) return;
                const n = o.name.toLowerCase();

                console.log(`Mesh name : ${o.name}`)

                if (n.includes("basecolor")) {
                    o.material = new THREE.MeshPhysicalMaterial({
                        color: 0x948f85,
                        metalness: 0,
                        roughness: 0.2, // 0에 가까울수록 유리광택, 1에 가까울수록 매트
                        clearcoat: 0.1, // 1에 가까울수록 투명 코팅느낌
                        clearcoatRoughness: 0.2, // 코팅의 거칠기
                        transmission: 0, //1에 가까울수록 투명도 상승
                        thickness: 0.2, // 재질의 두께
                        ior: 1.5, //굴절률
                    });
                } else if (n.includes("back") || n.includes("glass")) {
                    o.material = new THREE.MeshPhysicalMaterial({
                        color: 0xffffff,
                        metalness: 0,
                        roughness: 0,
                        transmission: 1,
                        thickness: 0.3,
                        opacity: 0.4,
                        clearcoat: 1,
                        clearcoatRoughness: 0.2,
                        ior: 1.5,
                    })
                } else if (n.includes("frame") || n.includes("edge") || n.includes("metal")) {
                    o.material = new THREE.MeshStandardMaterial({
                        color: 0x846d3f,
                        metalness: 1,
                        roughness: 0.2,
                        clearcoat: 0,
                        transmission: 0,
                        roughnessMap: roughMap,
                    });
                } else if(n.includes("logo")) {
                    o.material = new THREE.MeshPhysicalMaterial({
                        color: 0x89847e,
                        metalness: 0.4,
                        roughness: 0.2,
                        clearcoat: 0,
                        roughnessMap: roughMap,
                    });
                }

                if(n.includes("plastic")) {
                    o.material = new THREE.MeshPhysicalMaterial({
                        color: 0x757575,
                        metalness: 0,
                        roughness: 0.2,
                        ior: 1.5, //굴절률
                    });
                }
                o.castShadow = true;
                o.receiveShadow = false;
            });

            appleProduct.scale.set(modalPath.scale[0],modalPath.scale[1],modalPath.scale[2])
            appleProduct.position.set(modalPath.position[0],modalPath.position[1],modalPath.position[2])
            appleProduct.rotation.set(modalPath.rotation[0],modalPath.rotation[1],modalPath.rotation[2])
            scene.add(appleProduct);
            },
            undefined,
            (err) => console.error("GLB 로드 오류:", err)
        );

        // 환경맵
        const pmrem = new THREE.PMREMGenerator(renderer);
        new RGBELoader().load("/src/assets/hdr/artist_workshop.hdr", (hdrTex) => {
            const envMap = pmrem.fromEquirectangular(hdrTex).texture;
            scene.environment = envMap;
        });

        //바닥
        const floorGeometry = new THREE.PlaneGeometry(20,20)
        const floorMat = new THREE.ShadowMaterial({
            color: 0xfafafa,   // 그림자 색
            opacity: 0.1       // 그림자 진하기
        });
        const floor = new THREE.Mesh(floorGeometry,floorMat)
        floor.rotation.x = -Math.PI / 2 //90도
        floor.position.y= -2;
        floor.receiveShadow = true;
        scene.add(floor)

        // 렌더 루프
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // 리사이즈 대응
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
        }, [modelMap]);

    return <div id="three-root" style={{ width: "100vw", height: "100vh" }} />

}