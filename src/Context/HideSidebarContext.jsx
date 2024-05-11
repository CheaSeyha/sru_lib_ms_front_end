import { createContext, useContext, useState } from "react";

const HideSideBarContext = createContext()

export function useHideSideBar(){
  return useContext(HideSideBarContext)
}

export function HideSideBarProvidor({children}){
  //Set to false mean side bar is hiding bu defualt when in mobile screen
  const [isHideSideBar,setIsHideSideBar] = useState(false)

  return(
    <HideSideBarContext.Provider value={{isHideSideBar,setIsHideSideBar}}>
      {children}
    </HideSideBarContext.Provider>
  )
}
