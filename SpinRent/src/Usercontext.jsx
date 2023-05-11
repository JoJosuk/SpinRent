import axios from "axios";
import { createContext, useEffect } from "react"
import { useState } from "react"
export const Usercontext=createContext({});
// eslint-disable-next-line react/prop-types
export function UsercontextProvider( {children} ){
const [user,setUser]=useState(null);//[state,setState
useEffect(()=>{
    if(!user){
        axios.get('/profile').then(({data})=>{
            setUser(data);
        });
        
    }
},[]);
    return(
        <Usercontext.Provider value={{user,setUser}}>
            {children}
        </Usercontext.Provider>
    
        )
}