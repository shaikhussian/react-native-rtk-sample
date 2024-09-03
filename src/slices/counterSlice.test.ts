import counterReducer, { increament, decrement, increamentByAmount } from './counterSlice';

describe('counterSlice', () =>{
    const initialState = {value:0}
    test ('should return the initial state',()=>{
        expect(counterReducer(undefined, {type: '@init'})).toEqual(initialState)
    });
    test('should handle increament', () =>{
        const action = increament();
        const nextState = counterReducer(initialState, action);
        expect(nextState.value).toEqual(1);
    })
    test('should handle decreament', () => {
        const action = decrement();
        const nextState = counterReducer({value:1}, action);
        expect(nextState.value).toEqual(0);
    })
    test('should handle increament by amount',()=>{
        const action = increamentByAmount(10);
        const nextState = counterReducer(initialState, action);
        expect(nextState.value).toEqual(10);
    })
})