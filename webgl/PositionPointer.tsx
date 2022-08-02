import React, { useEffect } from 'react'
import useStore from '../helpers/store'

export default function PositionPointer(props:any) {
  const pointer:any = useStore((s) => s.pointer)  
    
  return (
    <>
      <mesh position={pointer}>        
        <sphereGeometry args={[0.05, 16]} />
   
      </mesh>
      
    </>
  )
}