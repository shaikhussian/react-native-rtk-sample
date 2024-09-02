import { createSlice, PayloadAction } from  '@reduxjs/toolkit';

interface CounterState {
    value: number
}

const initialState: CounterState={
    value:0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increament: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        increamentByAmount: (state, action:PayloadAction<number>) => {
            state.value += action.payload;
        }
    }
});

export const {increament, decrement, increamentByAmount} = counterSlice.actions

export default counterSlice.reducer;