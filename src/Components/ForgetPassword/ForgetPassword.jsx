import axios from 'axios'
import { useFormik, validateYupSchema } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup' 
export default function ForgetPassword() {

    let [loading,setLoading]=useState(false)
  
    let [error,setError]=useState(null)
   

let nav =useNavigate()

    let validationSchema=Yup.object({
        email:Yup.string().required('email is required').email('email is valid')
    })

    let validationSchema2=Yup.object({
        resetCode:Yup.string().required('resetcode is required').matches(/^[0-9]+$/,'enter Numbers only')
    })

   async function forgetPassword(values){
        //console.log(values)
        setLoading(true)
        let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values).catch((err)=> {
            setError(err.response.data.message)
            setLoading(false)

        })
        console.log(data)
        
        if(data.statusMsg =='success'){
            setLoading(false)
document.querySelector('.forgetpassword').classList.add('d-none')
document.querySelector('.resetcode').classList.remove('d-none')
        }
    }


   async function resetcode(values){
        //console.log(values)
        setLoading(true)
        let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values).catch((err)=>
        {
            setError(err.response.data.message)
            setLoading(false)

        })
        console.log(data)
       
        if(data.status=='Success'){
            setLoading(false)
            nav('/updatepassword')
        }
    }


    

    let formik =useFormik({
        initialValues:{
            email:''
        },
        validationSchema,
        onSubmit:forgetPassword,
    })

    let formikCode=useFormik({
        initialValues:{
            resetCode:''
        },
        validationSchema:validationSchema2,
        onSubmit:resetcode,
    })

   
  return<>
 

  <form onSubmit={formik.handleSubmit} action="" className='my-5 forgetpassword'>
  {error!=null ?<div className='alert alert-danger'>{error}</div>:''}
    <label htmlFor="email">Email :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control'  type="email" name='email' id='email'  />
    {formik.touched.email && formik.errors.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:""}
    {loading==false ?  <button disabled={!(formik.dirty && formik.isValid)} className='btn btn-success mt-2' type='submit'>Send</button>:  <button className='btn btn-success mt-2' type='button'><i className='fa fa-spinner fa-spin'></i></button>}
   
   
  </form>
{/* resetcode */}

  <form className=' resetcode d-none my-5' action="" onSubmit={formikCode.handleSubmit}>
  {error!=null ?<div className='alert alert-danger'>{error}</div>:''}
    <label htmlFor="resetCode">Reset Code :</label>
    <input className='form-control' type="text" id='resetCode' name='resetCode' onChange={formikCode.handleChange} onBlur={formikCode.handleBlur} value={formikCode.values.resetCode} />
    {formikCode.touched.resetCode && formikCode.errors.resetCode ? <div className='alert alert-danger'>{formikCode.errors.resetCode}</div>:""}
    {loading==false ?  <button disabled={!(formikCode.dirty && formikCode.isValid)} className='btn btn-success mt-2' type='submit'>Reset Code</button>:  <button className='btn btn-success mt-2' type='button'><i className='fa fa-spinner fa-spin'></i></button>}
  </form>
  
  
  
  
  </>

}