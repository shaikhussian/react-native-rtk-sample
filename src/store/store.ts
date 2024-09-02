import { configureStore } from "@reduxjs/toolkit";
import counterReducer  from '../slices/counterSlice';
import  useReducer from '../slices/userSlice';

// Custom logging middleware
const loggerMiddleware = (storeAPI:any)=> (next: any) => (action: any) => {
    console.log('dispatching', action);
    return next(action);
}

const store = configureStore({
    reducer:{
        counter: counterReducer,
        users: useReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware),
})

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;