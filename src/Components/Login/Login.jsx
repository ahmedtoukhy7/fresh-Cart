import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/tokenContext'

export default function Login(props) {

   let {setToken}= useContext(tokenContext)
 
    let [error,setError]=useState('')
    let [loading,setLoading]=useState(false)
    let nav =useNavigate()

        //yup
    let validationSchema= Yup.object({
      
        email:Yup.string().email('email is invalid').required('email is required'),
     
        password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,15}$/,'must starting with Uppercase'),
        
    })

    //formik

  async function submitLogin(values){

setLoading(true)
let { data }= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
    console.log(err.response.data.message)
    setError(err.response.data.message)
    setLoading(false)
})

console.log(data)

if(data.message=="success"){
    setLoading(false)
    
    setToken(data.token)

   localStorage.setItem('dataToken',data.token)
   nav('/')
}
}

    
let formik =useFormik({
    initialValues:{
    
        email:'',
       
        password:'',
        
    },
    validationSchema:validationSchema,

    onSubmit:submitLogin
})



  return <>
<div className='container py-5'>

    <h1 className='text-center mb-3'>Login Now</h1>
    {error==""? "" : <div className='alert alert-danger'>{error}</div>}

    <form onSubmit={formik.handleSubmit}>
       

        <label htmlFor="email">Email :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className='form-control my-2'id='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}

        

        <label htmlFor="password">Password :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className='form-control my-2'id='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:null}

      

       {loading==true? <button  type='button' className='bg-main text-light btn '>
        <i className="fa-solid fa-spinner fa-spin"></i>
        </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='bg-main text-light btn '>Login</button>}
       
        <Link className='ms-4 text-main' to='/forgetpassword'>Forget Password ?...</Link>
    </form>


</div>
  
  
  
  
  
  </>
}
