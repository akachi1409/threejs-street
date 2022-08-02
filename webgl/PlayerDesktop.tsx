import React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";

import useStore from "../helpers/store";

const PlayerDesktop = (props: any) => {
  
  const { camera } = useThree();
  // console.log("props", props);
  const [ref, api]: any = useSphere(() => ({
    mass: 100,
    type: "Dynamic",
    // type: 'Static',
    position: [0, 0.5, 0],
    rotation: [0, 0, 0],
    args: [0.2],
    ...props,
  }));

  const velocity = useRef([0, 0.0, 0]);
  const playerPosition: any = useStore((s) => s.playerPosition);
  const pointer: any = useStore((s) => s.pointer);

  useEffect(() => {
    api.velocity.subscribe((v: number[]) => (velocity.current = v));
  }, [api.velocity]);

  // console.log("playerPosition--", playerPosition, pointer)
  useFrame(() => {
    const pV = new THREE.Vector3(pointer[0], 0, pointer[2]);
    const avatarPos = new THREE.Vector3(playerPosition?.x, 0, playerPosition?.z);
    useStore.setState({ distance: pV.distanceTo(avatarPos) });
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
    
  });


  useStore.setState({
    playerPosition: ref?.current?.getWorldPosition(ref.current.position),
  });

  return (
    <>
      <mesh 
      ref={ref}
      position={props.position}
      ></mesh>
    </>
  );
};

export default PlayerDesktop;
