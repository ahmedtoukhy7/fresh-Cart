import logo from './logo.svg';
import './App.css';
import {Navigate, RouterProvider, createBrowserRouter, createHashRouter, useNavigate} from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Notfound from './Components/Notfound/Notfound';
import { useContext, useEffect, useState } from 'react';
import jwtDecde from 'jwt-decode'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ProductsDetails from './Components/ProductsDetails/ProductsDetails';
import CartContextProvieder, { cartContext } from './CartContext/CartContext'
import  { Toaster } from 'react-hot-toast';
import CheakOut from './Components/CheackOut/CheakOut';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import { TokenContextProvider } from './Context/tokenContext';
import PayCash from './Components/PayCash/PayCash';
import AllOrders from './Components/AllOrders/AllOrders';
import Brands from './Components/Brands/Brands';
import {QueryClientProvider, QueryClient} from 'react-query'
import BrandsDetails from './Components/BrandsDetails/BrandsDetails';
import AllSubCategories from './Components/AllSubCategories/AllSubCategories';
import WishListContextProvieder from './WishListContext/WishListContext';
import WishList from './Components/WishList/WishList';
function App() {


  // useEffect(()=>{
  //   if(localStorage.getItem('dataToken')){
  //     let data=jwtDecde(localStorage.getItem('dataToken'))
  //     console.log(data)
  //     saveUser(data)

  //   }
  // },[])


  let [userData,setData]=useState(null)

  // function saveUser(data){
  //   setData(data)
  // }
//signout
  // function signOut(){
    

  //   setData(null)

   
  //   localStorage.removeItem('datatoken')
   
  //   return <Navigate to='/login'/>
  // }




let routes= createHashRouter([
  {path:'',element:<Layout  />,children:[
    {index:true,element:<ProtectedRoute><Home /></ProtectedRoute>},
    {path:'login',element:<Login />},
    {path:'register',element:<Register/>},
    {path:'cart',element:<ProtectedRoute><Cart /></ProtectedRoute>},
    {path:'allOrders',element:<ProtectedRoute><AllOrders /></ProtectedRoute>},
    {path:'products',element:<ProtectedRoute><Products /></ProtectedRoute>},
    {path:'paycash/:id',element:<ProtectedRoute><PayCash /></ProtectedRoute>},
    {path:'checkout/:id',element:<ProtectedRoute><CheakOut /></ProtectedRoute>},
    {path:'productsDetails/:id',element:<ProtectedRoute><ProductsDetails /></ProtectedRoute>},
    {path:'forgetpassword',element:<ForgetPassword/>},
    {path:'updatepassword',element:<UpdatePassword/>},
    {path:'categories',element:<ProtectedRoute><Categories /></ProtectedRoute>},
    {path:'wishList',element:<ProtectedRoute><WishList /></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands /></ProtectedRoute>},
    {path:'allsubcategories',element:<ProtectedRoute><AllSubCategories /></ProtectedRoute>},
    {path:'brandsDetails/:id',element:<ProtectedRoute><BrandsDetails /></ProtectedRoute>},
    {path:'categoryDetails/:id',element:<ProtectedRoute><CategoryDetails /></ProtectedRoute>},
    {path:'*',element:<Notfound/>},
  ]}
])


let clientQuery = new QueryClient()






  
  return <>



<QueryClientProvider client={clientQuery}>

<WishListContextProvieder>
<TokenContextProvider >

<CartContextProvieder>
<Provider store={store}>
<RouterProvider router={routes}/>
<Toaster />
</Provider>
</CartContextProvieder>

</TokenContextProvider>
</WishListContextProvieder>

  
  </QueryClientProvider>
  


  
  
  
  
  </>
}

export default App;
