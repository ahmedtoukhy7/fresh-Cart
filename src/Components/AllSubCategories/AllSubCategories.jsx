import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function AllSubCategories() {

   function getAllSubCat(){
        return axios.get('https://route-ecommerce.onrender.com/api/v1/subcategories')
    }


   let{data,isLoading}= useQuery('subcat',getAllSubCat)
   console.log(data)
  return <>

  {isLoading ? <div className='loading '>
    <i className='fa fa-spinner fa-spin '></i>

  </div>:  <div className='container py-5'>
    <div className='row g-5'>
       {data?.data.data.map((sub,ind)=>{
        return  <div key={ind} className='col-md-4 col-sm-12'>
        <div className='itemSub'>
            <h3>{sub.name}</h3>
        </div>
    </div>
       })}
    </div>
  </div> }
 
  
  </>
}
