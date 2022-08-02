/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useBox, useCylinder, usePlane } from '@react-three/cannon';
import * as THREE from 'three';
import useStore from '../helpers/store';

export default function Collisions(props: any) {
  const collisionMaterial = new THREE.MeshBasicMaterial({
    color: 0x00dd00,
    transparent: true,
    opacity: 0,
    side: 2,
  });

  const [refPlane]: any = usePlane(() => ({
    type: 'Static',
    material: 'ground',
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1.001, 0],
    ...props,
  }));
  let scene = localStorage.getItem('model');
  if (scene === 'city') {
    const [borderRef1]: any = useBox(() => ({
      type: 'Static',
      args: [1, 10, 95],
      rotation: [0, 0, 0],
      position: [-9.8, 4, -10],
      ...props,
    }));
    const [borderRef2]: any = useBox(() => ({
      type: 'Static',
      args: [1, 10, 95],
      rotation: [0, 0, 0],
      position: [9.8, 4, 0],
      ...props,
    }));
    const [borderRef3]: any = useBox(() => ({
      type: 'Static',
      args: [80, 10, 1],
      rotation: [0, 0, 0],
      position: [0, 4, 9.8],
      ...props,
    }));
    const [borderRef4]: any = useBox(() => ({
      type: 'Static',
      args: [80, 24, 1],
      rotation: [0, 0, 0],
      position: [0, 4, -9.8],
      ...props,
    }));

    const [park]: any = useBox(() => ({
      type: 'Static',
      args: [5, 1, 8.3],
      rotation: [0, 0, 0],
      position: [-7.2, -0.81, -5.2],
      ...props,
    }));

    const [house]: any = useBox(() => ({
      type: 'Static',
      args: [8, 1, 8.2],
      rotation: [0, 0, 0],
      position: [5, -1, -6.5],
      ...props,
    }));
    const [houseBoundary]: any = useBox(() => ({
      type: 'Static',
      args: [0.3, 1, 8.2],
      rotation: [0, 0, 0],
      position: [0, -1, -7.5],
      ...props,
    }));
    const [electricPoll]: any = useBox(() => ({
      type: 'Static',
      args: [0.2, 3, 0.2],
      rotation: [0, 0, 0],
      position: [0.35, 0, -1.5],
      ...props,
    }));
    const [electricPollOne]: any = useBox(() => ({
      type: 'Static',
      args: [0.2, 3, 0.2],
      rotation: [0, 0, 0],
      position: [4.13, 0, -1.5],
      ...props,
    }));
    const [electricPollTwo]: any = useBox(() => ({
      type: 'Static',
      args: [0.2, 3, 0.2],
      rotation: [0, 0, 0],
      position: [8.77, 0, -1.5],
      ...props,
    }));

    const [pot]: any = useBox(() => ({
      type: 'Static',
      args: [1, 1, 0.5],
      rotation: [0, 0, 0],
      position: [6.45, -1, -1.6],
      ...props,
    }));
    const [car]: any = useBox(() => ({
      type: 'Static',
      args: [1.5, 2, 3.5],
      rotation: [0, 0, 0],
      position: [5.9, 0, 5.8],
      ...props,
    }));
    const [dustbinOne]: any = useBox(() => ({
      type: 'Static',
      args: [1, 1, 1.8],
      rotation: [0, -1.2, 0],
      position: [-7.2, -0.3, 5],
      ...props,
    }));
    const [dustbinTwo]: any = useBox(() => ({
      type: 'Static',
      args: [1.3, 2, 2],
      rotation: [0, 0, 0],
      position: [-7.8, 0, 7.5],
      ...props,
    }));
    const [roadBlockOne]: any = useBox(() => ({
      type: 'Static',
      args: [0.3, 1, 1],
      rotation: [0, 0, 0],
      position: [0.37, -0.5, 2.6],
      ...props,
    }));
    const [roadBarricade]: any = useBox(() => ({
      type: 'Static',
      args: [0.5, 3, 0.5],
      rotation: [0, 0, 0],
      position: [-4.7, 0, 4.3],
      ...props,
    }));
    const [Barricade]: any = useBox(() => ({
      type: 'Static',
      args: [0.2, 3, 0.2],
      rotation: [0, 0, 0],
      position: [-5, 0, 3.8],
      ...props,
    }));
    const [RoadBlockTwo]: any = useBox(() => ({
      type: 'Static',
      args: [1, 1, 0.1],
      rotation: [0, 0, 0],
      position: [3.5, -0.5, 3.6],
      ...props,
    }));
    const [RoadBlockThree]: any = useBox(() => ({
      type: 'Static',
      args: [1, 1, 0.1],
      rotation: [0, 0, 0],
      position: [5.8, -0.5, 3.6],
      ...props,
    }));
    const [RoadBlockFour]: any = useBox(() => ({
      type: 'Static',
      args: [1, 1, 0.1],
      rotation: [0, 0, 0],
      position: [8.2, -0.5, 3.6],
      ...props,
    }));
    const [TrafficConeOne]: any = useBox(() => ({
      type: 'Static',
      args: [0.3, 2, 0.3],
      rotation: [0, 0, 0],
      position: [2.8, 0, 1.1],
      ...props,
    }));
    const [TrafficConeTwo]: any = useBox(() => ({
      type: 'Static',
      args: [0.3, 2, 0.3],
      rotation: [0, 0, 0],
      position: [4.25, 0, 1],
      ...props,
    }));
    const [TrafficConeThree]: any = useBox(() => ({
      type: 'Static',
      args: [0.3, 2, 0.3],
      rotation: [0, 0, 0],
      position: [5.1, 0, -0.2],
      ...props,
    }));
    const [TrafficConeFour]: any = useBox(() => ({
      type: 'Static',
      args: [0.3, 2, 0.3],
      rotation: [0, 0, 0],
      position: [0.67, 0, 6.5],
      ...props,
    }));
    const [TrafficConeFive]: any = useBox(() => ({
      type: 'Static',
      args: [0.3, 2, 0.3],
      rotation: [0, 0, 0],
      position: [1.7, 0, 6.5],
      ...props,
    }));
    const [IronRod]: any = useBox(() => ({
      type: 'Static',
      args: [0.1, 2, 0.1],
      rotation: [0, 0, 0],
      position: [-0.25, 0, 4.5],
      ...props,
    }));

    return (
      <group>
        <mesh ref={refPlane} position={[0, -1.5, 0]}>
          <planeGeometry args={[23.5, 23.5]} />
          <meshStandardMaterial
            color="#2f302f"
            opacity={0}
            transparent={false}
          />
        </mesh>
        <mesh ref={borderRef1} material={collisionMaterial}>
          <boxGeometry args={[1, 10, 95]} />
        </mesh>

        <mesh ref={borderRef2} material={collisionMaterial}>
          <boxGeometry args={[1, 10, 95]} />
        </mesh>

        <mesh ref={borderRef3} material={collisionMaterial}>
          <boxGeometry args={[80, 10, 1]} />
        </mesh>

        <mesh ref={borderRef4} material={collisionMaterial}>
          <boxGeometry args={[80, 24, 1]} />
        </mesh>

        <mesh ref={park} material={collisionMaterial}>
          <boxGeometry args={[5, 1, 8.3]} />
        </mesh>

        <mesh ref={house} material={collisionMaterial}>
          <boxGeometry args={[8, 1, 8.2]} />
        </mesh>

        <mesh ref={houseBoundary} material={collisionMaterial}>
          <boxGeometry args={[0.3, 1, 8.2]} />
        </mesh>
        <mesh ref={electricPoll} material={collisionMaterial}>
          <boxGeometry args={[0.2, 3, 0.2]} />
        </mesh>
        <mesh ref={electricPollOne} material={collisionMaterial}>
          <boxGeometry args={[0.2, 3, 0.2]} />
        </mesh>
        <mesh ref={electricPollTwo} material={collisionMaterial}>
          <boxGeometry args={[0.2, 3, 0.2]} />
        </mesh>
        <mesh ref={pot} material={collisionMaterial}>
          <boxGeometry args={[1, 1, 0.5]} />
        </mesh>
        <mesh ref={car} material={collisionMaterial}>
          <boxGeometry args={[1.5, 2, 3.5]} />
        </mesh>
        <mesh ref={dustbinOne} material={collisionMaterial}>
          <boxGeometry args={[1, 1, 1.8]} />
        </mesh>
        <mesh ref={dustbinTwo} material={collisionMaterial}>
          <boxGeometry args={[1.3, 2, 2]} />
        </mesh>

        <mesh ref={roadBlockOne} material={collisionMaterial}>
          <boxGeometry args={[0.3, 1, 1]} />
        </mesh>
        <mesh ref={roadBarricade} material={collisionMaterial}>
          <boxGeometry args={[0.5, 3, 0.5]} />
        </mesh>
        <mesh ref={Barricade} material={collisionMaterial}>
          <boxGeometry args={[0.2, 3, 0.2]} />
        </mesh>
        <mesh ref={RoadBlockTwo} material={collisionMaterial}>
          <boxGeometry args={[1, 1, 0.1]} />
        </mesh>
        <mesh ref={RoadBlockThree} material={collisionMaterial}>
          <boxGeometry args={[1, 1, 0.1]} />
        </mesh>
        <mesh ref={RoadBlockFour} material={collisionMaterial}>
          <boxGeometry args={[1, 1, 0.1]} />
        </mesh>

        <mesh ref={TrafficConeOne} material={collisionMaterial}>
          <boxGeometry args={[0.3, 2, 0.3]} />
        </mesh>
        <mesh ref={TrafficConeTwo} material={collisionMaterial}>
          <boxGeometry args={[0.3, 2, 0.3]} />
        </mesh>
         <mesh ref={TrafficConeThree} material={collisionMaterial}>
          <boxGeometry args={[0.3, 2, 0.3]} />
        </mesh>
       <mesh ref={TrafficConeFour} material={collisionMaterial}>
          <boxGeometry args={[0.3, 2, 0.3]} />
        </mesh>
        <mesh ref={TrafficConeFive} material={collisionMaterial}>
          <boxGeometry args={[0.3, 2, 0.3]} />
        </mesh>
        <mesh ref={IronRod} material={collisionMaterial}>
          <boxGeometry args={[0.1, 2, 0.1]} />
        </mesh>
      </group>
    );
  } else if (scene === 'cabin') {
    const [borderRef1]: any = useBox(() => ({
      type: 'Static',
      args: [1, 10, 95],
      rotation: [0, 0, 0],
      position: [-2.4, 4, -10],
      ...props,
    }));
    const [borderRef2]: any = useBox(() => ({
      type: 'Static',
      args: [1, 10, 95],
      rotation: [0, 0, 0],
      position: [2.4, 4, 0],
      ...props,
    }));
    const [borderRef3]: any = useBox(() => ({
      type: 'Static',
      args: [80, 10, 1],
      rotation: [0, 0, 0],
      position: [0, 4, 10.5],
      ...props,
    }));
    const [borderRef4]: any = useBox(() => ({
      type: 'Static',
      args: [80, 24, 1],
      rotation: [0, 0, 0],
      position: [0, 4, -12],
      ...props,
    }));

    const [leftSeat]: any = useBox(() => ({
      type: 'Static',
      args: [1, 1, 19],
      rotation: [0, 0, 0],
      position: [1, -0.2, -0.6],
      ...props,
    }));
    const [rightSeat]: any = useBox(() => ({
      type: 'Static',
      args: [1, 1, 19],
      rotation: [0, 0, 0],
      position: [-1, -0.2, -0.6],
      ...props,
    }));

    return (
      <group>
        <mesh ref={refPlane} position={[0, -2, 0]}>
          <planeGeometry args={[23.5, 23.5]} />
          <meshStandardMaterial
            color={0x507fcc}
            opacity={0}
            transparent={true}
          />
        </mesh>

        <mesh ref={borderRef1} material={collisionMaterial}>
          <boxGeometry args={[1, 10, 95]} />
        </mesh>

        <mesh ref={borderRef2} material={collisionMaterial}>
          <boxGeometry args={[1, 10, 95]} />
        </mesh>

        <mesh ref={borderRef3} material={collisionMaterial}>
          <boxGeometry args={[80, 10, 1]} />
        </mesh>
        <mesh ref={borderRef4} material={collisionMaterial}>
          <boxGeometry args={[80, 24, 1]} />
        </mesh>
        <mesh ref={leftSeat} material={collisionMaterial}>
          <boxGeometry args={[1, 1, 19]} />
        </mesh>
        <mesh ref={rightSeat} material={collisionMaterial}>
          <boxGeometry args={[1, 1, 19]} />
        </mesh>
      </group>
    );
  } else {
    return null;
  }
}
