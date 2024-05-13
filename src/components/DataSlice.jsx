import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name:"data",
    initialState:{},
    reducers:{
        addStore: { reducer : (state,action)=>{
            return {...state,
                items : action.payload
            }
        }},
        setAvailibilityMap: {
            reducer : (state,action)=>{
            return {...state,
                availibilityMap : action.payload
            }
        }
    }
}
})

export const {addStore, setAvailibilityMap}=DataSlice.actions;
export default DataSlice.reducer;