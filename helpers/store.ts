import create from 'zustand'

const useStore = create(() => {
  return {
    startWorld: false,
    playerPosition: [0, 0.5, 0],
    pointer:[0, 0, 0],
    distance : 0,
    uiStep:3,
    newPositionFlag:false, 
    newPosition:[0.0, 0.0, 1.0],    
    emojiAnimation:'Idle',

    otherPosition: [2, 0.5, 2],
    otherPointer: [1, 0.5, 1],
    otherDistance: 0,
    otherAnimation:'Idle',

    name:'',
    hairStyle:8,
    hairColor:0,
    glasses:0,
    beardStyle:0,
    beardColor:0,
    skinColor:0,
    topStyle:5,
    topColor:0,
    trousersStyle:0,
    trousersColor:0,
    accessoriesStyle:0,
    accessoriesColor:0,
    shoesStyle:0,
    shoesColor:0,
  }
})

export default useStore