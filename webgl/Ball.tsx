import React, { useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { useSphere } from '@react-three/cannon'
import useStore from '../helpers/store'
import { useGLTF } from '@react-three/drei'

export default function Ball(props:any) {  
  const gltf = useGLTF('/assets/models/soccerball/scene.gltf')
  const gltfOne = useGLTF('/assets/models/basketball/scene.gltf')
  const [ballRef]:any = useSphere(() => ({ 
    type: 'Dynamic', 
    mass: 1,
    args:[0.3], 
    rotation:[0, 0, 0], 
    position:[0, 0.5, 2],...props 
  }))
  const [ballRefOne]:any = useSphere(() => ({ 
    type: 'Dynamic', 
    mass: 1,
    args:[0.3], 
    rotation:[0, 0, 0], 
    position:[0, 0.5, 4],...props 
  }))

  // useEffect(()=>{
  
  // }, [pointer])
    
  return (
    <>
      <mesh ref={ballRef}>
        <primitive object={gltf.scene} scale={[0.27, 0.27, 0.27]} position={[0, -0.3, 0.355]}/>  
      
      </mesh>      
      <mesh ref={ballRefOne}>
        <primitive object={gltfOne.scene} scale={[0.2, 0.2, 0.2]} position={[0, 0, 0]}/>  
     
      </mesh>      
    </>
  )
}