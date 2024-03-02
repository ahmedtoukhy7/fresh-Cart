import {configureStore} from '@reduxjs/toolkit' 

import {caregoryReducer}from '../Redux/CategorySlice'
export let store= configureStore({
    reducer:{
       category:caregoryReducer,


    }
})
