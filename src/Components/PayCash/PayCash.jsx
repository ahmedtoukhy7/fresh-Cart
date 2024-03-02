import React, { useContext, useState } from 'react'
import { cartContext } from './../../CartContext/CartContext';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
export default function PayCash() {

    let [pay,setpay]=useState(false)
let {id}= useParams()
let nav =useNavigate()
console.log(id)
    let validateYupSchema=Yup.object({
        city:Yup.string().required('city is Required'),
        phone:Yup.string().required('phone is Required').matches(/^01[0125][0-9]{8}$/,'invalid phone'),
        details:Yup.string().required('details is Required'),
    })

    let formik =useFormik({
        initialValues:{
            city:'',
            phone:'',
            details:'',
        },
        validationSchema:validateYupSchema,

        onSubmit:CheakPayCash,
    })
 
    

   let { CheakPay , setCartNum} = useContext(cartContext)
//    console.log(cartId)



   async function CheakPayCash(val){
    setpay(true)
    console.log(val)
    let {data}= await CheakPay(id,val)
    console.log(data)
   if(data.status=='success'){
    setCartNum(0)
    nav('/allOrders')
    setpay(false)
    
   }


  }







  return  <>

  <div className='container'>


<form onSubmit={formik.handleSubmit} className='py-5'>

    <label htmlFor="details">Details :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" id='details' name='details' className='form-control  mb-3' />
    {formik.errors.details && formik.touched.details ? <p className='alert alert-danger'>{formik.errors.details}</p>:''}

    <label htmlFor="phone">Phone :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id='phone' name='phone' className='form-control mb-3' />
    {formik.errors.phone && formik.touched.phone ? <p className='alert alert-danger'>{formik.errors.phone}</p>:''}

    <label htmlFor="city">City :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" id='city' name='city' className='form-control  mb-3' />
    {formik.errors.city && formik.touched.city ? <p className='alert alert-danger'>{formik.errors.city}</p>:''}


    {pay ? <button  type='button' className='btn btn-success d-block w-100 '>
        <i className="fa-solid fa-spinner fa-spin"></i>
        </button> :  <button className='btn btn-success d-block w-100' type='submit'>Pay</button>}

   
</form>
</div> 



 
  
  
  
  </>
}
