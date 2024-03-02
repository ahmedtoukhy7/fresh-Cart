import React, { useContext, useState } from 'react'
import Products from './../Products/Products';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { cartContext } from '../../CartContext/CartContext';
import { tokenContext } from './../../Context/tokenContext';
import jwtDecode from 'jwt-decode';


export default function Navbar({userData ,signOut}) {
let nav = useNavigate()
  let {cartNum  }=useContext(cartContext)
  let {token , setToken }=useContext(tokenContext)

 


  





  //logout 


  function logOut(){
    setToken(null)
    localStorage.removeItem('dataToken')
    nav('/login')
  }











  return <>
 
 <div className='navv '>
 <nav className="navbar fixed-top py-3 navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="">
        <img src={logo} alt="logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token !=null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center ">
        
        <li className="nav-item">
          <Link className="nav-link" to="">Home</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/allOrders">All-Orders</Link>
        </li>


        <li className='nav-item mx-2 '>
<Link to='wishList'>
WishList
</Link>
        </li>

        <li className='nav-item'>
        <div className="dropdown">
  <Link to='categories' className=" dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
   Categories
  </Link>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to="categories">All-Categories</Link></li>
    <li><Link className="dropdown-item" to="allsubcategories">All-Sub-Categories</Link></li>
   
  </ul>
</div>

        </li>
       
       
        
        
          
       
      </ul>:''}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center ">
        
        <li className="nav-item d-flex align-items-center">
        <i className="fa-brands fa-facebook ms-3 cursor-pointer"></i>
        <i className="fa-brands fa-tiktok ms-3 cursor-pointer"></i>
        <i className="fa-brands fa-twitter ms-3 cursor-pointer"></i>
        <i className="fa-brands fa-instagram mx-3 cursor-pointer"></i>
        </li>
       {token==null?
       <>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
       
       </>
       
      
      :
      <>
  
     
       


      <li className="nav-item mx-4 my-2">
      <Link className="nav-link position-relative" to="cart">
    
      <i className="fa-solid fa-cart-shopping fs-4"></i>
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
 {cartNum}
    <span className="visually-hidden">unread messages</span>
  </span>

      </Link>
     
     
    </li>
      
      
      <li className="nav-item">
      <a onClick={()=>logOut()} className="nav-link btn">Signout</a>
    </li>

    
  
  </>}
        
      
     
        
        
          
       
      </ul>
     
    </div>
  </div>
</nav>


 </div>
  
  
  
  
  </>
}
