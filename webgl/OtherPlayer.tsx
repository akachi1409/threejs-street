import React, { useEffect, useRef, useState} from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { useAnimations, OrbitControls, useFBX } from "@react-three/drei"
import useStore from '../helpers/store'
import usePlayerControls from '../hooks/usePlayerControls'
import * as THREE from 'three'
import gsap from 'gsap'

export default function OtherAvatar(props: any){
    // const gltf:any = useLoader(GLTFLoader, '/assets/models/avatars/mi_avatars.glb')  
    const gltf:any = useLoader(GLTFLoader, '/assets/models/avatars/other.glb')  
    const animations = gltf.animations  

    const avatarRef:any = useRef()
    const modelRef:any = useRef()
    const controlRef:any = useRef()

    const startWorld:boolean = useStore((s) => s.startWorld)
    const otherPosition:any = useStore((s) => s.otherPosition)

    // console.log("state--", otherPosition)
    useEffect(()=>{
      // if(typeof otherPosition === 'undefined') return;
      // const avatarV = new THREE.Vector3(otherPosition.x, 0, -otherPosition.z)

      // avatarRef.current.rotation.y -= 2 * Math.PI
    })
    useFrame(() => {    
        if(startWorld){
          if (otherPosition === undefined)return;
          // console.log("state", otherPosition)
          const v1 = new THREE.Vector3(otherPosition.x, otherPosition.y, otherPosition.z)
          avatarRef.current.position.lerp(v1, 0.5)
        //   gsap.to(controlRef.current.target, 0.5, {x:v1.x, y:v1.y+1.5, z:v1.z})
          
        }
      })
    return (
        <>
           <React.Fragment>
            <mesh ref={avatarRef} visible={props.visible} rotation={[0, Math.PI/2, 0]}>
            <primitive object={gltf.scene} scale={props.scale} ref={modelRef} rotation={[0, Math.PI/2, 0]}/>
            {/* <camera position={[0, 1.5, 3]}/> */}
            </mesh>
         </React.Fragment>
        </>
      )
}