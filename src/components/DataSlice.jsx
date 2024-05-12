import { createSlice } from "@reduxjs/toolkit";

const DataSlice=createSlice({
    name:"data",
    initialState:{},
    reducers:{
        addStore: { reducer : (state,action)=>{
            return {
                items : action.payload
            }
        }
    }
}
})

export const {addStore}=DataSlice.actions;
export default DataSlice.reducer;