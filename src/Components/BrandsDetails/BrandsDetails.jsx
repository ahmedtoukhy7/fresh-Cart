import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function BrandsDetails() {
    let {id}=useParams()
    console.log(id)
    let[bradsList,setBrandsList]= useState(null)
    useEffect(()=>{
        getBrandsetails(id)
    },[])

  


   
   async function getBrandsetails(id){
       let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
       console.log(data)
       setBrandsList(data)

    }

  

  


  return <>

  <div className='container'>
    <div className='col-md-12'>
        <div className='product text-center cursor-pointer'>
            <img className='w-50' src={bradsList?.data.image}alt={bradsList?.data.name} />
            <h4 className='fw-bold'>{bradsList?.data.name}</h4>
        </div>
    </div>
  </div>


  
  
  
  </>
}
