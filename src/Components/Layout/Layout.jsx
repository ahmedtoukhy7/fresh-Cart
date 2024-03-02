import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout({userData,signOut}) {
  console.log(userData)
  return <>

  <Navbar userData={userData} signOut={signOut}/>


 <Outlet/>



  <Footer/>
  
  
  
  </>
}
