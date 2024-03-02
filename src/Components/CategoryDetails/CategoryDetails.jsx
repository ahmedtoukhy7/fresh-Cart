import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';

export default function CategoryDetails() {

    let {id}= useParams()
    let [DetailsList,setDetailsList]=useState(null)
    useEffect(()=>{
        getCatDet(id)
    },[])

   async function getCatDet(id){
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        console.log(data.data)
        setDetailsList(data.data)
    }

  return <>
  <div className='container py-5'>
   <div className='row align-items-center'>
    {DetailsList ? <>
      <div className='col-md-4'>
      <img className='w-100' src={DetailsList?.image} alt={DetailsList?.name} />
    </div>
    <div className='col-md-8'>
    <h4>{DetailsList?.name}</h4>
    </div>


    <Helmet>
    <title>{DetailsList?.name}</title>
  </Helmet>
    
    </> :  <div className='loading '>
    <i className='fa fa-spinner fa-spin '></i>

  </div>}
   </div>
  
  
  </div>
  </>
}
