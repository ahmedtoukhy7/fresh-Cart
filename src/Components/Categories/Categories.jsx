import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from './../../Redux/CategorySlice';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Categories() {
  let dispa= useDispatch()
  useEffect(()=>{
dispa (getCategory())

  },[])

 let {categoryList , loading } = useSelector((state)=>state.category)

 

 
  return <>
  

  <div className='container py-4'>
   
   
{console.log(categoryList)}
{console.log(loading)}
      <h1 className='text-center '>Categories</h1>
      <div className='row g-4 mt-4'>
        {loading==false ? <div className='loading '>
        <i className='fa fa-spinner fa-spin '></i>
    
      </div> : categoryList.map((cat)=>{
          return <div key={cat._id} className='col-md-3 col-sm-6'>
         <Link to={'/categoryDetails/'+ cat._id}>
         <div className='product p-3 cursor-pointer'>
            <img className='w-100 img' src={cat.image} alt="" />
            <h4 className='my-4'>{cat.name}</h4>
          </div>
         </Link>

         <Helmet>
    <title>Categories</title>
  </Helmet>
        </div>
        })  }
      </div>
    

   
  </div>
  

  
  </>
}
