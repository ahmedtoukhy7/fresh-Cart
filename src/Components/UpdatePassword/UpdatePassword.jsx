import React, { useState } from 'react'
import * as Yup from 'yup'
    import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function UpdatePassword() {

    let [loading,setLoading]=useState(false)
  
    let [error,setError]=useState(null)
   

let nav =useNavigate()

    let validationSchema=Yup.object({
        email:Yup.string().required('email is required').email('email is valid'),
       newPassword:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,15}$/,'must starting with Uppercase'),

    })

    let formik =useFormik({
        initialValues:{
            email:'',
            newPassword:''
        },
        validationSchema,
        onSubmit:resetPassword,
    })


    async function resetPassword(values){
        console.log(values)
        setLoading(true)
        let {data}= await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values).catch((err)=> {
            setError(err.response.data.message)
            setLoading(false)

        })
        console.log(data)
        if(data.token){
            nav('/login')
        }
    }
    return <>
    <div className='container py-5'>
    
        <h1 className='text-center mb-3'>Reset Password</h1>
        
        {error!=null? <div className='alert alert-danger'>{error}</div> : ''}
        <form onSubmit={formik.handleSubmit}>
           
    
            <label htmlFor="email">Email :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className='form-control my-2'id='email' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}
    
            
    
            <label htmlFor="newPassword">New Password :</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="password" className='form-control my-2'id='newPassword' />
            {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger'>{formik.errors.newPassword}</div>:null}
    
          
    
          {loading==false? 
             <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='bg-main text-light btn '>Reset Password</button>:<button type='button' className='bg-main text-light btn '>
             <i className='fa fa-spinner fa-spin'></i>
          </button>}
             
           
            
        </form>
    
    
    </div>
      
      
      
      
      
      </>
}
