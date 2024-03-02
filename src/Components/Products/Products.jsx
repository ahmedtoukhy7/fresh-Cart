import axios from 'axios'
import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { Link } from 'react-router-dom';

import { Offline, Online } from "react-detect-offline";
import { useContext } from 'react';
import { cartContext } from '../../CartContext/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../../WishListContext/WishListContext';
import { Helmet } from 'react-helmet';


export default function Products() {

  let [products,setProducts]=useState([])
  let [favicon,setFav]=useState(false)

  let [newProduct,setNewProduct]=useState([])

  let [location,setlocation]=useState(false)

 let [arr,setArr]=useState([])

 

//console.log(query)

// useContext

let {addToCart, setCartNum ,setcartItem}= useContext(cartContext)

let {addtoWishList , getData:wish , removeData}=useContext(wishListContext)

//addtocart

 async function addProductToCart(id){
  let response= await addToCart(id)
  console.log(response)
  if (response.data.status=='success'){
toast.success('Added Successfully To Cart')
setCartNum(response.data.numOfCartItems)
setcartItem(response.data.data.totalCartPrice)
}
 
  else{
    toast.danger('Error')
  }
}


//addtowishlist


async function addWish(id){
  
  
  
  if(document.getElementById(`${id}`).classList.contains("text-dark")){
    let response = await addtoWishList(id)
    document.getElementById(`${id}`).classList.replace("text-dark" , "text-danger")
    if(response.data.status=='success'){
      toast.success('Added Successfully To WishList')
      //document.getElementById(`${id}`).classList.replace("text-dark" , "text-danger")
    }
    
    
  }else{
    document.getElementById(`${id}`).classList.replace("text-danger" , "text-dark")
    let { data } = await removeData(id)
    if(data.status=='success'){
      toast.success('Removed Successfully From WishList')
    }
}




}





 
useEffect(()=>{


for(let x=0 ; x<arr.length ; x++) {
  console.log(document.getElementById(arr[x].id))
}

  
  if(window.location.pathname=='/products'){
    setlocation(false)
  }
  else{
    setlocation(true)
  }
  
  //searchName('Woman Shawl')

  getData()

  $('.page-link').on('click',function(e){
 let page= $(e.target).html()
 getData(page)
  })
 
 
 
},[])

  async function getData(num=1){
    $('.loading').fadeIn(1000)
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${num}`)
    console.log(data)




    let res =await wish();


    console.log(data.data);
    console.log(res.data);

    for(let i=0 ; i<data.data.length ; i++) {
      for(let x=0 ; x<res.data.data.length ; x++) {
       if(data.data[i].id == res.data.data[x].id){
          data.data[i].color = true
      }
    }
    }


    setProducts(data.data)
    setNewProduct(data.data)
    $('.loading').fadeOut(1000)
  }



  //search 

  function searchName(val){

    //console.log(val)

    let newpro= newProduct.filter((pro)=> pro.title.toLowerCase().includes(val.toLowerCase())==true)
    
              
      setProducts(newpro)

   
  
     }
   
 

  
  
  //console.log(newProduct)

  return <>

  
  <Offline>
  <div className='offline position-fixed top-50 start-50 translate-middle alert alert-danger  p-4'>
  Only Shown Offline (surprise!)
  </div>
    </Offline>
  

  <div className='loading '>
    <i className='fa fa-spinner fa-spin '></i>

  </div>

  <div className='container py-5'>
  
   <h1 className='text-center'>Featured Products </h1>

   <input onChange={(e)=> searchName(e.target.value)} type="text" className='form-control my-4' placeholder='Search By Name' />
    
    <div className='row g-3'>
     {products.map((product)=>{
  
      return <div key={product._id} className='col-md-3 col-sm-6'>
      <div className=' product p-3 cursor-pointer'>
      <Link to={'/productsDetails/'+product._id}>
        <img className='w-100' src={product.imageCover} alt={product.category.name} />
        <h3 className='h6 text-main'>{product.category.name}</h3>
        <h2 className='h5'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
        <div className='rate d-flex justify-content-between'>
          <span>{`${product.price} EGP`}</span>
          <span className='rating-color'>
          <i className="fa-solid fa-star"></i>
            {product.ratingsAverage}</span>
        </div>
      </Link>
     <div className='d-flex justify-content-between'>
     <button onClick={()=>addProductToCart(product._id)} className='btn btn-success  my-2'>Add To Cart
     <i className="fa-solid fa-cart-shopping mx-2"></i>
     </button>

    <button className='btn'>
    <i onClick={()=>addWish(product._id)}  id={product.id} className= {`fa-solid fa-heart cursor-pointer fs-4 ${product?.color ? 'text-danger': 'text-dark'}` } ></i>

      </button>

     
     {location==false ?  <Helmet>
    <title>Products</title>
    </Helmet> :  <Helmet>
    <title>Home</title>
    </Helmet>}
     
     

     </div>
      </div>
     </div>
})}

    </div>
  </div>

  <div className='d-flex justify-content-center'>
  <nav aria-label="Page navigation example">
  <ul className="pagination">
    
    <li className="page-item cursor-pointer"><a className="page-link" >1</a></li>
    <li className="page-item cursor-pointer"><a className="page-link" >2</a></li>
    
    
  </ul>
</nav>
 
  </div>
  </>
}
