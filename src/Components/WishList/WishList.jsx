import React, { useContext, useEffect, useState } from 'react'
import { wishListContext } from '../../WishListContext/WishListContext'
import $ from 'jquery'
import { toast } from 'react-hot-toast';
import { cartContext } from '../../CartContext/CartContext';
import { Helmet } from 'react-helmet';
export default function WishList() {

  let { getData, removeData } = useContext(wishListContext)
  let { addToCart, setCartNum, setcartItem } = useContext(cartContext)

  useEffect(() => {
    getWishList()
  }, [])
  let [wishList, setWishList] = useState(null)
  let [loading, setLoading] = useState(false)

  async function getWishList() {
    
    let { data } = await getData()
    console.log(data)
    setWishList(data)
    
  }

  async function removeWish(id) {
    let { data } = await removeData(id)
    console.log(data)
    if (data.status == 'success') {
      // setWishList(data.data)
      getWishList()
      toast.error('product Removed')
    }
  }

  if (wishList?.length == 0) {
    return <div className='info'>
      <h1 className=''>Wish List Is Empty</h1>
    </div>
  }




  async function addProductToCart(id) {
    let response = await addToCart(id)
    console.log(response)
    if (response.data.status == 'success') {
      toast.success('Added Successfully To Cart')
      setCartNum(response.data.numOfCartItems)
      setcartItem(response.data.data.totalCartPrice)
    }

    else {
      toast.danger('Error')
    }
  }


  if(wishList?.count == 0){
    return <div className='vh-100 text-center '>
      <h2 className='bg-danger text-light py-4'>No Data</h2>
    </div>
  }



  return <>

    

    {wishList ? <div className='container py-5'>
      <div className='row g-5'>
        {wishList?.data.map((wish,ind) => {
          return <div key={ind} className='col-md-6'>

            <div className='item bg-body-tertiary p-3 rounded-3'>
              <img className='w-25' src={wish.imageCover} alt="" />
              <div className='d-flex justify-content-around my-3'>
                <h4 className='text-main'>{wish.title}</h4>
                {/* <h4 className=''>{wish?.brand.name}</h4> */}
              </div>
              <h4 className='h5'>{wish.description}</h4>

              <div className='d-flex justify-content-around'>
                <span className='text-main'>{wish.price + ' EGP'}</span>
                <span >
                  <i className="fa-solid fa-star text-warning"></i>
                  {wish.ratingsAverage}</span>
              </div>

              <div className='d-flex justify-content-around'>
                <button onClick={() => removeWish(wish.id)} className='btn btn-danger  my-3'>Remove</button>
                <button onClick={() => addProductToCart(wish.id)} className='btn btn-success my-3'>Add To Cart</button>
              </div>

            </div>

          </div>
        })}
      </div>

      <Helmet>
    <title>WishList</title>
  </Helmet>

    </div> : <div className='loading '>
      <i className='fa fa-spinner fa-spin '></i>

    </div>}





  </>
}
