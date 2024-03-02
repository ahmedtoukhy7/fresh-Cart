import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { cartContext } from './../../CartContext/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { wishListContext } from '../../WishListContext/WishListContext';
export default function ProductsDetails() {

  let {addToCart, setCartNum , setcartItem}= useContext(cartContext)

  let { id } = useParams()
  let [product, setProduct] = useState(null)
  useEffect(() => {
    prodDetails(id)

  }, [])


  let {getData , addtoWishList , removeData }=useContext(wishListContext)

 //adtocart


 async function addProductToCart(id){
  let response= await addToCart(id)
  console.log(response)
  if (response.data.status=='success'){
toast.success(response.data.message)
setCartNum(response.data.numOfCartItems)
setcartItem(response.data.data.totalCartPrice)
}
 
  else{
    toast.danger('Error')
  }
}


 async function addandremove(id){
if(document.getElementById(`${id}`).classList.contains('text-black')==true){
  let res= await addtoWishList(id)
  document.getElementById(`${id}`).classList.replace('text-black','text-danger')
  if(res.data.status=='success'){
    toast.success('added Successfully')
  }
  
}
else{
  let {data}= await removeData(id)
  document.getElementById(`${id}`).classList.replace('text-danger','text-black')
  if(data.status=='success'){
    toast.error('Removed Successfully')
  }
}

  }


  async function prodDetails(id) {
    $('.loading').fadeIn(1000)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   
   
    $('.loading').fadeOut(1000)

    let res= await getData()
    
    

    for(let i=0;i<res.data.data.length;i++){

      if(res.data.data[i].id === id){
        data.data.fav=true
        console.log(data)
      }
    }

    setProduct(data.data)

  }
  //  console.log(product.category.name)
  return <>
    <div className='loading '>
      <i className='fa fa-spinner fa-spin '></i>

    </div>
    <div className='container py-5'>
      {product ? <>
        <h1 className='text-center'>Product Details</h1>
        <div className='row g-3 mt-3 align-items-center'>
          <div className='col-md-4'>

            <OwlCarousel className='owl-theme' items={1} autoplay loop  >
              {product?.images.map((ele , ind) => {
                return <div key={ind} className='item'>
                  <img src={ele} alt="" />
                </div>
              })}




            </OwlCarousel>
          </div>
          <div className='col-md-8'>
            <h3 className=' text-main'>{product?.category.name}</h3>
            <h2>{product?.title}</h2>
            <div className='rate d-flex justify-content-between'>
              <span className='fs-3'>{ ` Price : ${product?.price} EGP`}</span>
              <span className='rating-color'>
                <i className="fa-solid fa-star"></i>
                {product?.ratingsAverage}</span>
            </div>
           <div className='d-flex gap-5 align-items-center'>
           <button onClick={()=>addProductToCart(product?.id)} className='btn btn-success  my-4' >Add To Card</button>
            <i onClick={()=>addandremove(product?.id)}  id={product?.id} className= {product?.fav ? 'text-danger fa-solid fa-heart cursor-pointer fs-4' : 'text-black fa-solid fa-heart cursor-pointer fs-4 ' }></i>
           </div>

          </div>

          <Helmet>
    <title>{product?.title.split(' ').slice(0,2).join(' ')}</title>
  </Helmet>



        </div></> : ""}

    </div>


  </>
}
