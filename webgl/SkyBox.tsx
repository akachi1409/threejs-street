import React from "react";
import {  useThree } from '@react-three/fiber'
import { CubeTextureLoader,  } from 'three'

export default function SkyBox(props:any) {

  const { scene } = useThree();
  const cubeTextureLoader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const cubeTexture = cubeTextureLoader.load([
    "/assets/skybox/Right.jpg",
    "/assets/skybox/Left.jpg",
    "/assets/skybox/Top.jpg",
    "/assets/skybox/Bottom.jpg",
    "/assets/skybox/Back.jpg",
    "/assets/skybox/Front.jpg",
  ]);

  // Set the scene background property to the resulting texture.  
  scene.background = cubeTexture;
  return null;
}
