
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useState } from 'react';

export let getCategory= createAsyncThunk('category/getCategory',async ()=>{

    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    return data.data
})


let categorySlice= createSlice({
    name:'category',
    initialState:{
        categoryList:[],
        loading:false,
    },
    extraReducers: (build)=>{
        build.addCase(getCategory.fulfilled,(state,action)=>{
            state.categoryList=action.payload
            state.loading=true
        })

    }
})

export let caregoryReducer= categorySlice.reducer