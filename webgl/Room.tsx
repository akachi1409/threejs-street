import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import useStore from '../helpers/store';

export default function Room(props: any) {
  let scene;
  let localItem = localStorage.getItem('model');
  if (!localItem) {
    scene = 'airport';
  } else {
    scene = localItem;
  }

  const gltf = useLoader(GLTFLoader, `/assets/models/${scene}/${scene}.gltf`);
  let geo1, geo2, geo3, geo4;
  if (scene === 'airport') {
    gltf.scene.position.set(-700, -1, 200);
    gltf.scene.scale.set(2, 2, 2);
  } else if (scene === 'city') {
    gltf.scene.position.set(0, -1, 0);
    gltf.scene.scale.set(0.8, 0.8, 0.8);
  } else if (scene === 'office') {
    gltf.scene.position.set(0, 0.7, 8);
    gltf.scene.scale.set(1, 1, 1);
  } else if (scene === 'cabin') {
    gltf.scene.position.set(0, -2, 0);
    gltf.scene.scale.set(1.5, 1.5, 1.5);
  }
  gltf.scene.traverse((c: any) => {
    c.castShadow = true;
  });
  let playerPosition: any = useStore((s) => s.playerPosition);

  const pointerDown = (x: number, y: number, z: number) => {
    const v = new THREE.Vector3(x, 0, z);
    useStore.setState({
      pointer: [x, y, z],
      distance: v.distanceTo(playerPosition),
    });
  };

  return (
    <>
      <primitive
        object={gltf.scene}
        position={props.position}
        scale={props.scale}
        visible={props.visible}
      />
      <mesh
        scale={[30, 0.05, 30]}
        position={[0, -1.5, 0]}
        // position={[-9.4, 2.51, 8.93]}
        rotation={[0, 0, 0]}
        onPointerDown={(e) => pointerDown(e.point.x, e.point.y, e.point.z)}
      >
        <boxGeometry args={[10, 10, 10]} />
        <meshBasicMaterial color={0x3189c4} opacity={0} transparent={true} />
      </mesh>
    </>
  );
}
