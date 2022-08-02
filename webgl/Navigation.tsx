import React, { useEffect, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { useAnimations, OrbitControls, useFBX } from "@react-three/drei";
import useStore from "../helpers/store";
import usePlayerControls from "../hooks/usePlayerControls";
import * as THREE from "three";
import gsap from "gsap";

export default function Navigation(props: any) {
  const clicked: boolean = false;
  const state = useThree();

  useEffect(() => {
    console.log("working");
  }, []);

  // gsap.to(camera.position, 0.3, {
  //   x: 0,
  //   y: 0.5,
  //   z: 10,
  //   // ease:'Power1.easeOut',
  //   ease: "Power4.easeOut",
  // });
  return console.log("working");
}
