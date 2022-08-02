import React, { useEffect, useRef, useState} from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { useAnimations, OrbitControls, useFBX } from "@react-three/drei"
import useStore from '../helpers/store'
import * as THREE from 'three'
import gsap from 'gsap'

export default function Avatar(props:any) {
  let mixer: THREE.AnimationMixer
  let modelReady = false
  const animationActions: THREE.AnimationAction[] = []
  let activeAction: THREE.AnimationAction
  let lastAction: THREE.AnimationAction
  const fbxLoader: FBXLoader = new FBXLoader()
    
  const fbx = useFBX('/assets/models/avatars/lpMale_rig_tpose.fbx')
  const fbx1 = useFBX('/assets/models/avatars/Idle.fbx')
  const fbx2 = useFBX('/assets/models/avatars/Walking.fbx')
  
  const setAnimationAction = (toAction: THREE.AnimationAction) => {
    if (toAction != activeAction) {
        lastAction = activeAction
        activeAction = toAction
        //lastAction.stop()
        lastAction.fadeOut(1)
        activeAction.reset()
        activeAction.fadeIn(1)
        activeAction.play()
    }
  }
  const avatarRef:any = useRef()
  const modelRef:any = useRef()
  const controlRef:any = useRef()
  
  
  const [actionName, setAction] = useState({action:'idle', during:false})
  const {camera} = useThree()
  
  const startWorld:boolean = useStore((s) => s.startWorld)
  const playerPosition:any = useStore((s) => s.playerPosition)
  const pointer:any = useStore((s) => s.pointer)
  const distance:any = useStore((s) => s.distance)
  const emojiAnimation:string = useStore((s) => s.emojiAnimation)
  // const _Action = animationActions[1]

  setAnimationAction(animationActions[1])
  useEffect(() => {
    // const _Action = animationActions[1]
    // _Action.reset()
    // _Action.fadeIn(1)
    // _Action.play()
    // if(emojiAnimation!=="mixamo.com"){
    //   actions[emojiAnimation].reset().fadeIn(0.5).play()
    //   return () => actions[emojiAnimation].fadeOut(0.3)
    // }else{
    //   actions[actionName.action].reset().fadeIn(0.5).play()
    //   return () => actions[actionName.action].fadeOut(0.3)
    // }
  },[actionName.action])

  useEffect(()=>{
    if(typeof playerPosition === 'undefined') return
    const pV = new THREE.Vector3(pointer[0], 0, -pointer[2])    
    const avatarV = new THREE.Vector3(playerPosition.x, 0, -playerPosition.z)
    let alpha = Math.asin((pV.z - avatarV.z) / pV.distanceTo(avatarV))
    if(pV.x<avatarV.x) alpha = Math.PI - alpha
    const beta = alpha + Math.PI
    const newDz =  3 * Math.sin(beta)
    const newDx = 3 * Math.cos(beta)
    const cameraPos = new THREE.Vector3(avatarV.x + newDx, 1.5, avatarV.z + newDz)
    gsap.to(camera.position, 0.3, {x: cameraPos.x, y:5, z:-cameraPos.z, ease:'Power4.easeIn '})
    
  },[pointer])

  useEffect(() => {    
    if(emojiAnimation!=="idle") 
      return 

    let newActionName:string
    
    if(distance<=0.5)
      newActionName = "idle"
    else
      newActionName = "walk"
    
    setAction({action:newActionName, during:true})
        
  },[distance])

  useFrame((state) => {
    const delta = state.clock.getDelta()
    if(startWorld){
      const v1 = new THREE.Vector3(playerPosition.x, playerPosition.y - 0.1, playerPosition.z)
      avatarRef.current.position.lerp(v1, 0.9)
      const v2 = new THREE.Vector3(pointer[0], 0, pointer[2])
      
      gsap.to(controlRef.current.target, 0.5, {x:v1.x, y:v1.y+1.5, z:v1.z})      
      
      avatarRef.current.rotation.copy(camera.rotation)
      if(modelReady)
      {
        
      }
    }
  })

  return (
    <>
      <OrbitControls
        ref={controlRef}
        // autoRotate
        minDistance={2}
        maxDistance = {3}
        minPolarAngle={Math.PI/2}
        maxPolarAngle={Math.PI/2 }
        enableZoom={true}
        enablePan={true}
        zoomSpeed={0.3}
      />
     <mesh ref={avatarRef} visible={props.visible}>
      <mesh  scale={[0.009, 0.009, 0.009]}>
        
        <primitive object={fbx}  ref={modelRef} rotation={[0, Math.PI, 0]}/>
        
      </mesh>
      {/* <camera position={[0, 1.5, 3]}/> */}
     </mesh>
    </>
  )
}