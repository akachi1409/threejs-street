import React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";

import useStore from "../helpers/store";

const OtherDesktop = (props: any) =>{
    const [ref, api]: any = useSphere(() => ({
        mass: 100,
        type: "Dynamic",
        // type: 'Static',
        position: [1, 1.5, 1],
        rotation: [0, 0, 0],
        args: [0.2],
        ...props,
      }));
    
    const velocity = useRef([0, 0.0, 0]);
    const otherPosition: any = useStore((s) => s.otherPosition);
    const otherPointer: any = useStore((s) => s.otherPointer);
    const otherDistance: any = useStore((s) => s.otherDistance)
    useEffect(() => {
        api.velocity.subscribe((v: number[]) => (velocity.current = v));
      }, [api.velocity]);

    // console.log("otherPosition--", otherPosition, otherPointer)
    useFrame(() => {
        // console.log("otherPosition", otherPosition, otherPointer)
        const pV = new THREE.Vector3(otherPointer[0], 0, otherPointer[2]);
        const avatarPos = new THREE.Vector3(otherPosition?.x, 0, otherPosition?.z);
        useStore.setState({ otherDistance: pV.distanceTo(avatarPos) });
        const direction = new THREE.Vector3(0, 0, 0);
        if (pV.distanceTo(avatarPos) >= 0.1) {
        const l = pV.distanceTo(avatarPos);
        direction.x =
            l > 2 ? ((pV.x - avatarPos.x) * 2) / l : (pV.x - avatarPos.x) * 1.5;
        direction.z =
            l > 2 ? ((pV.z - avatarPos.z) * 2) / l : (pV.z - avatarPos.z) * 1.5;
        }
        // apply the velocity to our sphere
        api.velocity.set(direction.x, 0, direction.z);
        ref.current.getWorldPosition(ref.current.position);
        useStore.setState({
            otherPosition: ref?.current?.getWorldPosition(ref.current.position),
        })
        // console.log("ref",ref.current.position, ref.current.getWorldPosition(ref.current.position))
    })
    // console.log("ref",ref)
    
    return (
    <>
        <mesh 
            ref={ref}
            position={otherPosition}
            ></mesh>
    </>
    );
}

export default OtherDesktop;