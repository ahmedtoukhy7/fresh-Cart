import React, { useContext, useEffect, useRef } from 'react'
import Products from '../Products/Products'
import { cartContext } from '../../CartContext/CartContext'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import {Helmet} from "react-helmet";


export default function Home(props) {

 
  
  



  let {addToCard}= useContext(cartContext)
  console.log(addToCard)
  return <>


<Helmet>
    <title>Home</title>
  </Helmet>
  

<MainSlider/>
<CategorySlider/>
  <Products/>
   
 
 
  </>
}
