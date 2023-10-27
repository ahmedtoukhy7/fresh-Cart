import React, { useEffect, useState } from 'react'
import  jwtDecde  from 'jwt-decode';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function AllOrders() {

  let[ordersList,setordersList]=useState(null)
  let [loading,setLoading]=useState(false)
  
  useEffect(()=>{
    
    let result =jwtDecde(localStorage.getItem('dataToken'))
    console.log(result)
  
    let userId=result.id

   
    getAllOrders(userId)
  },[])


  async function getAllOrders(userId){
    setLoading(true)
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    console.log(data)
    setordersList(data)
    setLoading(false)
  }

  return <>

  {loading ? <div className='loading '>
    <i className='fa fa-spinner fa-spin '></i>

  </div>  :  <div className='container py-3 fw-bold'>

<h2 className='text-center fa-3x my-5 '>All Orders</h2>

<div className='row g-5 '>

  {ordersList ? ordersList.map((order,ind)=>{
    return <div key={ind} className='col-md-12 col-sm-12 dataOrder text-center py-5'>

    <div className='data mb-3 '>
 
     <h4> Phone : {order.shippingAddress.phone}</h4>
      <h4> City : {order.shippingAddress.city}</h4>
      <h4> Details : {order.shippingAddress.details}</h4>
    </div>

   <div className='row g-5'>
   {order.cartItems.map((item,index)=>{
      return <div key={index} className=' my-5'>
        <h5> Count :{item.count}</h5>
      <h5> Price : {item.price}</h5>
      <img className='w-25' src={item.product.imageCover} alt="" />
      <h5>Title : {item.product.title}</h5>
      </div>
     

     



    })}
   </div>

    <div className='price'>
    <h4> Payment Type : {order.paymentMethodType}</h4>
      <h4> Total Price : {order.totalOrderPrice}</h4>
    </div>

    </div>
  }): <h2>no Orders</h2>}


<Helmet>
    <title>All Orders</title>
  </Helmet>

</div>

</div> }



 
  
  
  
  </>
}
