import React from 'react'
import img1 from '../../Assets/images/slider-image-1.jpeg'
import img2 from '../../Assets/images/slider-image-2.jpeg'
import img3 from '../../Assets/images/slider-image-3.jpeg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function MainSlider() {
  return <>
  <div className='container '>
  <div className='row g-0'>
      <div className='col-md-9'>
      <OwlCarousel className='owl-theme' items={1} autoplay loop  >
    <div className='item'>
       <img className='w-100 imgslider' src={img1} alt="img slide" />
    </div>
    <div className='item'>
    <img className='w-100 imgslider' src={img2} alt="img slide" />
    </div>
    <div  className='item'>
    <img className='w-100 imgslider' src={img3} alt="img slide" />
    </div>
    
</OwlCarousel>;
      </div>
      <div className='col-md-3'>
      <img className='w-100 img' src={img2} alt="img slide" />
      <img className='w-100 img' src={img3} alt="img slide" />
      </div>
    </div>
  </div>
  
  </>
}
