import { createContext, useEffect, useState } from "react";



export let tokenContext= createContext()

export function TokenContextProvider(props){


    useEffect(()=>{

        if(localStorage.getItem('dataToken')!=null){
            setToken(localStorage.getItem('dataToken'))
        }

    },[])


    let [token ,setToken]=useState(null)


    return <>

    <tokenContext.Provider value={{token , setToken}}>

    {props.children}
    </tokenContext.Provider>
    
    
    
    </>
}