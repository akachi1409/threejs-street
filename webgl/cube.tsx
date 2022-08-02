import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useBox, useCylinder, useSphere } from "@react-three/cannon";
import useStore from "../helpers/store";

export default function Cube(props: any) {
  // const gltf = useLoader(GLTFLoader, '/assets/models/soccerball/scene.gltf')
  // const [ballRef]: any = useSphere(() => ({
  //   type: "Dynamic",
  //   mass: 0.5,
  //   args: [0.3, 32],
  //   rotation: [0, 0, 0],
  //   position: [0, 0.5, 2],
  //   ...props,
  // }));
  const [cube]: any = useCylinder(() => ({
    type: "Static",
    args: [1, 1, 1],
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    ...props,
  }));
  const collisionMaterial = new THREE.MeshBasicMaterial({
    color: 0x00dd00,
    transparent: false,
    opacity: 0.0,
    side: 2,
  });
  // useEffect(()=>{

  // }, [pointer])

  return (
    <mesh ref={cube} material={collisionMaterial}>
      <cylinderGeometry args={[1, 1, 1]} />
    </mesh>
  );
}
