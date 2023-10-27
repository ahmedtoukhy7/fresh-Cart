import React, { useState } from 'react'
import img from '../../../src/Assets/images/360_F_473846184_0k637f6855ZJqaulKqAmgJTEVGVibR1P.jpg'
import img2 from '../../../src/Assets/images/apple-app-store-logo.jpg'
import img3 from '../../../src/Assets/images/download.png'
export default function Footer() {

  let[fav,setfav]=useState(false)

  function change(){
    setfav(true)
  }

  return <>


  
  <div className='footer bg-body-tertiary py-5'>

  <div className='container'>
    <div className='row'>
    <div className='col-md-12 my-3'>
    <div className='item'>
  <h3>Get The FreshCart App</h3>
  <p>We Will Send Your Link , open it on your phone to download the app</p>
 <div className='forma d-flex align-items-center gap-5 my-4'>
 <input type="text" placeholder='Email' className='form-control w-75' />
 <button className='btn btn-success'>Share App Link</button>
 </div>
 <div className='row justify-content-between my-4'>
  <div className='col-md-4'>
   <div className='item d-flex gap-5 justify-content-between align-items-center'>
   <span>Payment Partners</span>
    <img className='w-50' src={img} alt="img" />
   </div>
  </div>
  <div className='col-md-4'>
<div className='item d-flex gap-5 justify-content-between align-items-center'>
<span>Get Deliveries With FreshCart</span>
<div>
<img className='apple' src={img2} alt="img" />
<img className='apple' src={img3} alt="img" />
</div>
</div>
  </div>
 </div>
</div>
    </div>
    </div>
  </div>

  </div>
  
  </>
}
