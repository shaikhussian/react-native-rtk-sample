import { configureStore } from "@reduxjs/toolkit";
import counterReducer  from '../slices/counterSlice';

const store = configureStore({
    reducer:{
        counter: counterReducer
    }
})

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;