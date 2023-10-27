import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
    if(localStorage.getItem('dataToken')!=null){
        return props.children
    }
    else{
        return <Navigate to='/login' />
    }

  return <>   
 <h3>Protected</h3>
  </>
  
}
