import React from "react";
import useStore from "../../helpers/store"

const PlayerIntroduce = () => {

  const uiStep:number = useStore((s) => s.uiStep)

  const changeShowState = ()=>{
    useStore.setState({ startWorld: true, uiStep:4 });
  }

  return (
    <>
      <div
        className="player-introduce absolute top-0 left-0 w-screen h-screen overflow-hidden z-10"
        style={{display:uiStep===3?'block':'none'}} 
      >
        
        <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden flex items-center bg-cyan-600">
          <div className="max-w-[700px] mx-auto text-white p-8 flex justify-center ">
            <button className="relative w-[114px] h-[114px] flex justify-center items-center pointer-events-auto"
                onClick={()=>changeShowState()}
              > 
                <div className="absolute top-0 left-0 w-full h-full">
                  <svg width="114" height="114" viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M101.326 12.7015C90.7604 2.17558 75.567 1 57.0034 1C38.4398 1 23.1989 2.18918 12.6328 12.7423C2.0668 23.2954 1 38.4828 1 57.0544C1 75.6259 2.07359 90.8202 12.6396 101.38C23.2057 111.94 38.4126 113 57.0034 113C75.5942 113 90.8011 111.933 101.367 101.38C111.933 90.827 113 75.6259 113 57.0544C113 38.4828 111.913 23.2478 101.326 12.7015Z" fill="url(#paint0_radial_576_1642)" fillOpacity="0.1"/>
                    <path d="M101.679 12.3473C90.9484 1.65715 75.5433 0.5 57.0034 0.5C38.4634 0.5 23.0104 1.67074 12.2795 12.3885C1.54728 23.1076 0.5 38.5102 0.5 57.0544C0.5 75.5988 1.55415 91.0079 12.2862 101.734C23.0182 112.459 38.4403 113.5 57.0034 113.5C75.5667 113.5 90.9885 112.453 101.721 101.734C112.453 91.0147 113.5 75.5984 113.5 57.0544C113.5 38.51 112.432 23.0595 101.679 12.3473Z" stroke="white" strokeOpacity="0.6"/>
                    <defs>
                      <radialGradient id="paint0_radial_576_1642" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(57 57) rotate(90) scale(56)">
                        <stop offset="0.709214" stopColor="white" stopOpacity="0.1"/>
                        <stop offset="1" stopColor="white"/>
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
                <div className="text-white">Webiers</div>
            </button>

          </div>          
        </div>
      </div>
    </>
  )
}

export default PlayerIntroduce