import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface User {
    id: number;
    name: string;
}

interface UserState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    users: [],
    status: 'idle',
    error: null
};

// Create an async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(fetchUsers.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>)=>{
            state.status = 'succeeded';
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message || 'Unknown error';
        })
    }
});

export default userSlice.reducer;