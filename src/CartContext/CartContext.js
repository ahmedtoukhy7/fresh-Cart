import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let cartContext= createContext()

export default function CartContextProvider(props){


    let [cartNum,setCartNum]=useState(0)
    let [cartItem,setcartItem]=useState(0)
    let [errorMsg,seterror]=useState('')

   let [cartId,setcartId]=useState(null)




let headers= {
    token:localStorage.getItem('dataToken')
}

useEffect(()=>{
    displayUserCart()
    //setCartNum(response.data.numOfCartItems)
},[])



// AddtoCart
function addToCart(id){
       return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
        productId: id
        },
        {
            headers:headers
        }
        
        ).then((response)=>response).catch((err)=>err)
    
}

//  DisplayCart

function displayUserCart(){
    //  axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
    //     headers:headers
    // }).then((response)=>{
    //     setCartNum(response.data.numOfCartItems)
    // })

    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers:headers
    }).then((response)=>{ return  setCartNum(response.data.numOfCartItems),
         {response:response , status:'success'}}).catch((err)=>{return {err:err, status:'failed'}})
}

//remove

function removeItem(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:headers
    }).then((response)=>response).catch((err)=>err)

}


async function removeAll(){
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
        headers:headers
    }).then((response)=>response).catch((err)=>err)
}


function updateItem(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count:count
    },{
        headers:headers
    }).then((response)=>response).catch((err)=>err)
}


//cheackout


function cheackOut(id,shiping){
return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/`,{
    shippingAddress:shiping
},
{
    headers:headers
}).then((response)=>response).catch((err)=>err)
}


//paycash 


 function CheakPay(id,shiping){
   
       return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,{
            shippingAddress:shiping},
            {
            headers:headers
        })
       

    }




    return <cartContext.Provider value={{addToCart,CheakPay, setcartId, cartId, errorMsg, removeAll , displayUserCart , removeItem , updateItem , cheackOut , setCartNum , cartNum ,cartItem, setcartItem}}>
        {props.children}
    </cartContext.Provider>
}