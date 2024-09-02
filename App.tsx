/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, {RootState, AppDispatch} from './src/store/store';
import { increament, decrement, increamentByAmount } from './src/slices/counterSlice';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Counter = () =>{
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState)=> state.counter.value);

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <Button title='Increament' onPress={()=>dispatch(increament())}/>
      <Button title='Decreament' onPress={()=> dispatch(decrement())}/>
      <Button title='Increament by 5' onPress={()=> dispatch(increamentByAmount(5))}/>
    </View>
  )
}

const App = () =>{
  return(
    <Provider store={store}>
      <Counter/>
    </Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    fontSize: 20,
    marginBottom: 20
  }
});

export default App;
