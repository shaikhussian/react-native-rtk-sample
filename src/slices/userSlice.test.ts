import { configureStore } from "@reduxjs/toolkit";
import { fetchUsers } from "./userSlice";
import useReducer from "./userSlice";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
interface User {
    id: number;
    name: string;
}
interface UserState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

describe('userSlice', () =>{
    
    const initialState: UserState = {
        users: [],
        status: 'idle',
        error: null
    };
    

    it('should return the initial state', ()=>{
        expect(useReducer(undefined,{type:'@input'})).toEqual(initialState)
    });
    it('should handle fetchUsers.pending', ()=>{
        const action = fetchUsers.pending.type;
        const state = useReducer(initialState, {type:action})
        expect(state.status).toEqual('loading');
    })
    it('should handle fetchUsers.fulfilled', async() =>{
        const users = [{id:1, name:'Hussian'}]
        mock.onGet('https://jsonplaceholder.typicode.com/users').reply(200,users);
        const store = configureStore({
            reducer: { users: useReducer}
        });
        await store.dispatch(fetchUsers());
        const state = store.getState();
        expect(state.users.users).toEqual(users);
        expect(state.users.status).toEqual('succeeded');
        expect(state.users.error).toBeNull();
    })

    it('should handle fetchUsers.rejected', async()=>{
        mock.onGet('https://jsonplaceholder.typicode.com/users').reply(500);
        const store = configureStore({
            reducer: {users: useReducer}
        });
        await store.dispatch(fetchUsers());
        const state = store.getState();
        expect(state.users.status).toEqual('failed');
        expect(state.users.error).toBe('Request failed with status code 500')
    })
})