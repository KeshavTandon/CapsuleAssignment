import  {configureStore} from "@reduxjs/toolkit";
import DataSlice from "./DataSlice";
import OrignalSlice from "./OrignalSlice";

const store=configureStore({
    reducer:{
        stores:DataSlice,
        orignalData: OrignalSlice
    },
});

export default store;