import React, { useEffect, useRef, useState} from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { useAnimations, OrbitControls, useFBX } from "@react-three/drei"
import useStore from '../helpers/store'
import usePlayerControls from '../hooks/usePlayerControls'
import * as THREE from 'three'
import gsap from 'gsap'

export default function AvatarPlayerGLB(props:any) {

  const gltf:any = useLoader(GLTFLoader, '/assets/models/avatars/mi_avatars.glb')  
  const animations = gltf.animations  
  const [flag, setFlag] = useState(false)
  const avatarRef:any = useRef()
  const modelRef:any = useRef()
  const controlRef:any = useRef()
  const { actions }:any = useAnimations(animations, modelRef)
  const [actionName, setAction] = useState({action:'Idle', during:false})  
  const [updateCallback, setUpdateCallback] = useState(null)
  const [socket, setSocket] = useState(props.socket)
  const {camera} = useThree()
  
  // gltf.scene.add(camera)
  const startWorld:boolean = useStore((s) => s.startWorld)
  const playerPosition:any = useStore((s) => s.playerPosition)
  const pointer:any = useStore((s) => s.pointer)
  const distance:any = useStore((s) => s.distance)
  const emojiAnimation:string = useStore((s) => s.emojiAnimation)


  
  useEffect(() => {
    
  },[pointer])


  useEffect(() => {
    if(emojiAnimation!=="Idle"){
      actions[emojiAnimation].reset().fadeIn(0.5).play()
      return () => actions[emojiAnimation].fadeOut(0.3)
    }else{
      actions[actionName.action].reset().fadeIn(0.5).play()
      return () => actions[actionName.action].fadeOut(0.3)
    }
  },[actionName.action, emojiAnimation])

  // console.log("playerPosition", playerPosition);
  useEffect(()=>{
    if(typeof playerPosition === 'undefined') return
    const pV = new THREE.Vector3(pointer[0], 0, -pointer[2])
    const avatarV = new THREE.Vector3(playerPosition.x, 0, -playerPosition.z)
    const cameraV = new THREE.Vector3(camera.position.x, 0, camera.position.z)
    let alpha = Math.asin((pV.z - avatarV.z) / pV.distanceTo(avatarV))
    if(pV.x<avatarV.x) alpha = Math.PI - alpha
    console.log("===========", avatarRef.current.rotation);
    if(avatarRef.current.rotation.y > 2 * Math.PI){
      avatarRef.current.rotation.y -= 2 * Math.PI
      console.log(' 360over', avatarRef.current.rotation.y, )
    }else if(avatarRef.current.rotation.y < -2 * Math.PI){
      avatarRef.current.rotation.y += 2 * Math.PI
      console.log('-360over', avatarRef.current.rotation.y, )
    }

    const angleY = avatarRef.current.rotation.y


    let angleDelta
    if((alpha - angleY)>Math.PI) 
      angleDelta = (alpha - angleY) - 2 * Math.PI
    else if((alpha - angleY)<-Math.PI)
      angleDelta = 2 * Math.PI + (alpha - angleY)
    else
      angleDelta = alpha - angleY

      const newAngleY = avatarRef.current.rotation.y + angleDelta
      gsap.to(avatarRef.current.rotation, 0.5, {y: newAngleY, ease:'Power2.easeOut'})



          //******************************* */
    const beta = alpha + Math.PI
    const newDz =  3 * Math.sin(beta)
    const newDx = 3 * Math.cos(beta)
    const cameraPos = new THREE.Vector3(avatarV.x + newDx, 1.5, avatarV.z + newDz)    
    gsap.to(camera.position, 0.5, {
      x: cameraPos.x, 
      y: cameraPos.y, 
      z:-cameraPos.z, 
      // ease:'Power1.easeOut', 
      ease:'Power4.easeNone', 
    })
    //******************************* */
    
    // let alphaOrigin = Math.asin((avatarV.z - cameraV.z) / avatarV.distanceTo(cameraV))
    // if(avatarV.x<cameraV.x) alphaOrigin = Math.PI - alpha
    // const detaAlpha = alpha - alphaOrigin
    // controlRef.current.autoRotateSpeed = - detaAlpha * 30
    // setTimeout(()=>{controlRef.current.autoRotateSpeed = 0}, 300)
    // const beta = alpha + Math.PI
    // const newDz =  3 * Math.sin(beta)
    // const newDx = 3 * Math.cos(beta)
    // const cameraPos = new THREE.Vector3(avatarV.x + newDx, 1.5, avatarV.z + newDz)
    // // setFlag(true)
    // gsap.to(camera.position, 0.5, {x: cameraPos.x, y: cameraPos.y, z:-cameraPos.z, ease:'Power2.easeOut'})
    // // setTimeout(()=>{setFlag(false)}, 400)
  },[pointer])

  useEffect(() => {    
    if(emojiAnimation!=="Idle") 
      return 

    let newActionName:string
    
    if(distance<=0.2)
      newActionName = "Idle"
    else
      newActionName = "Walk"
    
    setAction({action:newActionName, during:true})
        
  },[distance])

  useFrame(() => {    
    if(startWorld){
      
      // gsap.to(avatarRef.current.rotation, 0.5, {x:camera.rotation.x, y:camera.rotation.y+1.5, z:camera.rotation.z})
      // if(flag) return
      const v1 = new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z)
      avatarRef.current.position.lerp(v1, 0.5)
      // gsap.to(avatarRef.current.position, 0.8, {x:v1.x, y:v1.y, z:v1.z, ease:'Expo.easeIn'})
      // gsap.to(controlRef.current.target, 0.8, {x:v1.x, y:v1.y+1.5, z:v1.z, ease:'Expo.easeIn'})
      gsap.to(controlRef.current.target, 0.5, {x:v1.x, y:v1.y+1.5, z:v1.z})
      // avatarRef.current.rotation.copy(camera.rotation)
      
    }
  })
  useEffect(()=>{
    const onControlChange = (val) =>{
      console.log("-----", val);
      const { position, rotation } = val.target.object
      const { id } = socket
      const posArray = []
      const rotArray = []
      position.toArray(posArray)
      console.log("----", id, position);
      socket.emit('move', {
          id,
          position: posArray,
      })
    }
    if (avatarRef.current){
      setUpdateCallback(
        avatarRef.current.addEventListener('change', onControlChange)
      )
    }

    return()=>{
      if(updateCallback && avatarRef.current)
      avatarRef.current.removeEventListener(
        'change', onControlChange
      )
    }
  }, [avatarRef, socket])

  return (
    <>
       <React.Fragment>
      <OrbitControls
        ref={controlRef}
        autoRotate
        autoRotateSpeed={0}
        minDistance={2}
        maxDistance = {3}
        minPolarAngle={Math.PI/2}
        maxPolarAngle={Math.PI/2 }
        enableZoom={true}
        enablePan={true}
        zoomSpeed={0.3}
      />
     <mesh ref={avatarRef} visible={props.visible} rotation={[0, Math.PI/2, 0]}>
      <primitive object={gltf.scene} scale={props.scale} ref={modelRef} rotation={[0, Math.PI/2, 0]}/>
      {/* <camera position={[0, 1.5, 3]}/> */}
     </mesh>
     </React.Fragment>
    </>
  )
}