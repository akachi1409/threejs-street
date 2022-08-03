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
    const { actions }:any = useAnimations(animations, modelRef)
    const [actionName, setAction] = useState({action:'Idle', during:false})  
    const {camera} = useThree()

    const startWorld:boolean = useStore((s) => s.startWorld)
    const otherPosition:any = useStore((s) => s.otherPosition)
    const otherPointer:any = useStore((s) => s.otherPointer)
    const otherDistance:any = useStore((s) => s.otherDistance);
    const otherAnimation:any = useStore((s) => s.otherAnimation)

    // console.log("state--", otherPosition)
    useEffect(()=>{
      // if(typeof otherPosition === 'undefined') return;
      // const avatarV = new THREE.Vector3(otherPosition.x, 0, -otherPosition.z)

      // avatarRef.current.rotation.y -= 2 * Math.PI
    })

    useEffect(()=>{
      if(otherAnimation!=="Idle"){
        actions[otherAnimation].reset().fadeIn(0.5).play()
        return () => actions[otherAnimation].fadeOut(0.3)
      }else{
        actions[actionName.action].reset().fadeIn(0.5).play()
        return () => actions[actionName.action].fadeOut(0.3)
      }
    }, [actionName.action, otherAnimation])

    useEffect(() => {    
      console.log("==", otherDistance)
      if(otherAnimation!=="Idle") 
        return 
  
      let newActionName:string
      
      if(otherDistance<=0.2)
        newActionName = "Idle"
      else
        newActionName = "Walk"
      
      setAction({action:newActionName, during:true})
          
    },[otherDistance])
    useEffect(()=>{
      if(typeof otherPosition === 'undefined') return
      
      const pV = new THREE.Vector3(otherPointer[0], 0, -otherPointer[2])
      const avatarV = new THREE.Vector3(otherPosition.x, 0, -otherPosition.y)
      
      const cameraV = new THREE.Vector3(camera.position.x, 0, camera.position.z)
      
      
      // console.log(pV.distanceTo([avatarV[0],avatarV[1], avatarV[2]]))
      let alpha = Math.asin((pV.z - avatarV.z) / pV.distanceTo(avatarV))
      if ( Number.isNaN(alpha))return;
      // console.log("====", pV, avatarV, otherPosition)
      if(pV.x<avatarV.x) alpha = Math.PI - alpha
  
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
        angleDelta = (alpha - angleY) - Math.PI*2
      else if((alpha - angleY)<-Math.PI)
        angleDelta =  2*Math.PI + (alpha - angleY)
      else
        angleDelta = alpha - angleY
        
        // console.log("----------", angleY, alpha, typeof alpha, pV, avatarV)
        const newAngleY = avatarRef.current.rotation.y + angleDelta
        // console.log("newAngleY", newAngleY)
        gsap.to(avatarRef.current.rotation, 0.5, {y: newAngleY, ease:'Power2.easeOut'})
  
  
  
            //******************************* */
      // const beta = alpha + Math.PI
      // const newDz =  3 * Math.sin(beta)
      // const newDx = 3 * Math.cos(beta)
      // const cameraPos = new THREE.Vector3(avatarV.x + newDx, 1.5, avatarV.z + newDz)    
      // gsap.to(camera.position, 0.5, {
      //   x: cameraPos.x, 
      //   y: cameraPos.y, 
      //   z:-cameraPos.z, 
      //   // ease:'Power1.easeOut', 
      //   ease:'Power4.easeNone', 
      // })
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
    },[otherPointer])
    useFrame(() => {    
        if(startWorld){
          if (otherPosition === undefined)return;
          // console.log("state", otherPosition)
          const v1 = new THREE.Vector3(otherPosition.x, otherPosition.y, otherPosition.z)
          avatarRef.current.position.lerp(v1, 0.5)
          // gsap.to(avatarRef.current.target, 0.5, {x:v1.x, y:v1.y+1.5, z:v1.z})
          
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