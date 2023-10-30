import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../authReducer/auth";
import  recordingsSlice  from "../recordingsReducer/recordings";

export const store =  configureStore({
    reducer: {
        authentication: authSlice.reducer,
        recordings: recordingsSlice,
    }
});