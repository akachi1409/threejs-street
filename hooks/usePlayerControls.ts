import { useEffect, useState, useRef } from 'react'

import useStore from '../helpers/store'

const moveFieldByKey = (key: string) => {

  const keys:any = {
    ArrowUp: 'forward',
    ArrowLeft: 'left',
    ArrowDown: 'backward',
    ArrowRight: 'right',
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump',
    ShiftLeft: 'speed'
  }
  return keys[key]
}

const usePlayerControls = () => {

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    speed: 2.5
  })  

  const startWorld:boolean = useStore((s) => s.startWorld)
  const uiLockRef = useRef(startWorld)

  useEffect(() => {
    const handleKeyDown = (e: { code: string }) => {      

      switch (e.code) {
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowRight':
        case 'KeyW': //forward
        case 'KeyA': // left
        case 'KeyS': // backwards
        case 'KeyD': // right
        case 'Space': // jump
          setMovement((m) => ({
            ...m,
            [moveFieldByKey(e.code)]: true
          }))
          return
        case 'ShiftLeft':
          setMovement((m) => ({
            ...m,
            [moveFieldByKey(e.code)]: 2.5
          }))
          return
        default:
          return
      }
    }

    const handleKeyUp = (e: { code: string }) => {

      // if(!uiLockRef.current) return

      switch (e.code) {
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowRight':
        case 'KeyW': //forward
        case 'KeyA': // left
        case 'KeyS': // backwards
        case 'KeyD': // right
        case 'Space': // jump
          setMovement((m) => ({
            ...m,
            [moveFieldByKey(e.code)]: false
          }))
          return
        case 'ShiftLeft':
          setMovement((m) => ({
            ...m,
            [moveFieldByKey(e.code)]: 2.5
          }))
          return
        default:
          return
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return movement
}

export default usePlayerControls
