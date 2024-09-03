// store.test.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../slices/counterSlice';
import userReducer from '../slices/userSlice';
import { RootState } from './store'; // adjust the path accordingly

// Custom logging middleware
const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
    console.log('dispatching', action);
    return next(action);
};

// Configure store with the custom middleware
const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware),
});

// Test cases
describe('Redux Store', () => {
    it('should be configured with the correct reducers', () => {
        const state: RootState = store.getState();
        expect(state.counter).toBeDefined();
        expect(state.users).toBeDefined();
    });

    it('should have the custom middleware applied', () => {
        const dispatchedActions: any[] = [];
        const customLoggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
            dispatchedActions.push(action);
            return next(action);
        };

        // Create a new store with the custom logger middleware
        const testStore = configureStore({
            reducer: {
                counter: counterReducer,
                users: userReducer
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(customLoggerMiddleware),
        });

        // Dispatch a test action
        testStore.dispatch({ type: 'counter/increment' });

        expect(dispatchedActions.length).toBeGreaterThan(0);
        expect(dispatchedActions[0].type).toBe('counter/increment');
    });

    it('should allow dispatching actions', () => {
        // Example action and expected state change
        const action = { type: 'counter/increment' };
        
        // Dispatch action
        store.dispatch(action);

        // Get the updated state
        const state: RootState = store.getState();
        
        // Check if the state has changed as expected
        // Assuming you have an initial state and counter reducer has an 'increment' action
        // you should adapt the following expectation according to your actual state and actions
        expect(state.counter.value).toBe(0); // Adjust based on your actual reducer logic
    });
});
