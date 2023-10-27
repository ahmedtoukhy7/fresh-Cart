import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../CartContext/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import { Helmet } from 'react-helmet';
export default function Cart() {
  let[userCart,setuserCart]=useState(null)
  
 let {displayUserCart, setcartId ,errorMsg, removeItem , updateItem , numCart , setCartNum, removeAll }= useContext(cartContext)
 useEffect(()=>{
console.log(userCart)

    getCart()

  
  
 },[])




 let[error,seterror]=useState('')
 
//display
async function getCart(){
  $('.loadingCard').fadeIn(1000)
let response= await displayUserCart()

console.log(response)

  if(response.status === 'failed')
  seterror(response.err.response.data.message)
 

else{
  setuserCart(response.response.data)
   setCartNum(response.response.data.numOfCartItems)
    setcartId(response.response.data.data._id)
}

// setuserCart(data)
$('.loadingCard').fadeOut(1000)
 }



 //removeitem

 async function deleteItem(id){
 
  let {data}=await removeItem(id)
  console.log(data)
  if(data.status==='success'){
    setuserCart(data)
toast.error('One Product Removed')
setCartNum(data.numOfCartItems)


  }

console.log(data.status)
  
 }

// updateitem

async function updateItm(id,count){
let {data}= await updateItem(id,count)
if(data.status=='success'){
  setuserCart(data)
  toast.success('Updated Successfully')
}
}

//Clear All


async function ClearAll(){
 let {data}= await removeAll()
 console.log(data)
 if(data.message=='success'){
   setuserCart(null)
   setCartNum(0)
  //  seterror('No data')
toast.error('All Card Removed')


  
}
}


// if(userCart?.data.products.length==0){
//   return <>
//  <div className='bg-info'>
//  <h1>No Data</h1>
//  </div>
  
//   </>
// }



//console.log(userCart?.data.products.length)


  return <>
{errorMsg.length>0 ? <h1 className='bg-danger'>{errorMsg}</h1>:null}


{/* {error.length>0 ? <h1 className='bg-danger'>{error}</h1> : null} */}

<div className='loadingCard '>
      
<i className="fa-solid fa-spinner fa-spin"></i>
</div>


  <div className='container'>

   
   <div className='cart'>
   {userCart ? <div className='w-75 mx-auto p-3 my-3 bg-body-secondary'>
      <div className='row d-flex justify-content-between  my-3'>
        <div className='col-md-4'>
        <h4 className='bg-success rounded-4 text-light p-3 text-center' >Cart Items : {userCart.numOfCartItems}</h4>
        </div>
        <div className='col-md-6'>
        <h4 className='bg-success rounded-4 text-light p-3 text-center' >Total Price : {userCart.data.totalCartPrice} EGP</h4>
        </div>
     
      
      </div>
    
      {console.log(userCart?._id)}
      
      { userCart?.data.products.map((product)=>{
        return <div className='row mb-3 align-items-center border-bottom my-2 py-3' key={product.product._id}>
          <div className='col-md-2'>
            <img className='w-100' src={product.product.imageCover} alt="" />
          </div>
          <div className='col-md-10'>

          <div className='d-flex justify-content-between align-items-center'>
           <div>
           <h4 >{product.product.title.split(' ').slice(0,2).join(' ')}</h4>
            <h4 className='text-main'>{product.price} EGP</h4>
            </div>

            <div className=''>
              <button  onClick={()=>updateItm(product.product._id , product.count + 1)} className='btn btn-success '>+</button>
              <span className='mx-3'>{product.count}</span>
              <button onClick={()=>updateItm(product.product._id , product.count - 1)} className='btn btn-danger'>-</button>
            </div>



          </div>
          <span onClick={()=>deleteItem(product.product._id)} className='text-danger cursor-pointer'><i className="fa-solid fa-trash-can"></i> Remove </span>
          </div>

         
         
          <Helmet>
    <title>Cart</title>
  </Helmet>

        </div>
      })}
<div className='pay d-flex justify-content-around'>
  
<Link className='btn btn-success me-2 ' to={'/checkout/' +userCart.data._id }>Check Out Visa</Link>
<Link className='btn btn-warning ' to={'/paycash/' +userCart.data._id }>Check Out Cash</Link>

</div>

      <button onClick={ClearAll} className='btn btn-danger my-4 w-100'>Remove All</button>

    </div>: <div className='vh-100'>

   
  <h2 className='bg-danger text-center text-light py-5 my-4 rounded-2 my-5'>No Data</h2>
  

  <h4 className='text-white'>{error}</h4>
  </div>}


   </div>

  
  </div>
  
  
  
  </>
}
