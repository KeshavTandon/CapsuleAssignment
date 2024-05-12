import { createSlice } from "@reduxjs/toolkit";

const OrignalSlice=createSlice({
    name:"orignal",
    initialState:{},
    reducers:{
        addOrignalData: { reducer : (state,action)=>{
            return {
                orignalItems : action.payload
            }
        }
    },
}
})

export const {addOrignalData}=OrignalSlice.actions;
export default OrignalSlice.reducer;