import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';

export default function Brands() {


     function getBrands(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')

    }
    
    let {data , isLoading}= useQuery('brands',getBrands)
    console.log(data)



  return <>

  {isLoading ?  <div className='loading '>
    <i className='fa fa-spinner fa-spin '></i>

  </div>:  <div className='container py-5'>

<div className='row g-4'>
 {data?.data.data.map((brand,ind)=>{
  return  <div key={ind} className='col-md-3 col-sm-6 productBr'>
 <Link to={'/brandsDetails/' + brand._id}>
 <div className=' text-center cursor-pointer'>
      <img className='w-100' src={brand.image} alt={brand.name} />
      <h4>{brand.name}</h4>


      <Helmet>
    <title>Brands</title>
  </Helmet>
      
  </div>
 </Link>
</div>
 })}
</div>

</div>

}
  

 
  
  
  </>
}
