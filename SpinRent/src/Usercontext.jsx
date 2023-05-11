import { createContext } from "react"
import { useState } from "react"
export const Usercontext=createContext({});
// eslint-disable-next-line react/prop-types
export function UsercontextProvider({children}){
const [user,setUser]=useState(null);//[state,setState

    return(
        <Usercontext.Provider value={{user,setUser}}>
            {children}
        </Usercontext.Provider>
    
        )
}