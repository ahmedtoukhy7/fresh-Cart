import axios from "axios";
import { createContext, useEffect } from "react";



export let wishListContext= createContext()


export default function WishListContextProvieder(props){


    //addtoWish

    useEffect(()=>{
       
    },[])


    function addtoWishList(id){
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
            productId:id
        },
        {
            headers:{
                token:localStorage.getItem('dataToken')
            }
        })
    }

    //getdata


    function getData(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers:{
                token:localStorage.getItem('dataToken')
            }
        })
    }


    //remove


    function removeData(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:{
                token:localStorage.getItem('dataToken')
            }
        })

    }




    return <wishListContext.Provider value={{addtoWishList , getData , removeData}}>
        {props.children}
    </wishListContext.Provider>
}