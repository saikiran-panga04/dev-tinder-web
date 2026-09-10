import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
    name:'requests',
    initialState:[],
    reducers:{
        addRequest:(state,action)=> action.payload ?? state,
        removeRequest:(state,action) => {
            const newArray = state.filter((req)=>req._id !== action.payload);
            return newArray;
        }
    
    }
})

export const {addRequest,removeRequest} = requestSlice.actions;
export default requestSlice.reducer;