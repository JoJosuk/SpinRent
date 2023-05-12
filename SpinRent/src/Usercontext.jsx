import axios from "axios";
import { createContext, useEffect } from "react"
import { useState } from "react"
export const Usercontext=createContext({});
// eslint-disable-next-line react/prop-types
export function UsercontextProvider( {children} ){
const [user,setUser]=useState(null);//[state,setState
const [ready,setReady]=useState(false);//[state,setState
useEffect(()=>{

    if(!user){
        axios.get('/profile').then(({data})=>{
            setUser(data);
            setReady(true);
        });
        
    }
    else{
        setUser(null);
        
    }
},[]);
    return(
        <Usercontext.Provider value={{user,setUser,ready}}>
            {children}
        </Usercontext.Provider>
    
        )
}