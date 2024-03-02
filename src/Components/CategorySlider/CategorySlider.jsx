import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../Redux/CategorySlice'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function CategorySlider() {

    let dispa= useDispatch()
    useEffect(()=>{
  dispa (getCategory())
  
    },[])
  
   let {categoryList} = useSelector((state)=>state.category)
  
  return <>

<div className='container'>
<OwlCarousel className='owl-theme' items={7} autoplay loop  >
   
   {categoryList.map((cat,ind)=>{
             return  <div className='item' key={ind}>
               <img className='w-100 img' src={cat.image} alt={cat.name} />
              
             </div>
           
           })}
       
       
   </OwlCarousel>;
</div>
  
  
  
  </>
}
