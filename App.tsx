/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { startTransition, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, {RootState, AppDispatch} from './src/store/store';
import { increament, decrement, increamentByAmount } from './src/slices/counterSlice';
import { fetchUsers } from './src/slices/userSlice';

import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Counter: React.FC = () =>{
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

const UsersList: React.FC =() => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error} = useSelector((state: RootState)=> state.users);

  useEffect(()=>{
    if(status === 'idle') {
      dispatch(fetchUsers());
    }
  },[dispatch, status]);
  if(status === 'loading') return <Text>Loading....</Text>
  if(status === 'failed') return <Text>Eror: {error}</Text>

  return (
    <FlatList
      data = {users}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item})=>(
        <View style={styles.userItem}>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  )
}

const App = () =>{
  return(
    <Provider store={store}>
      <Counter/>
      <UsersList/>
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
  },
  userItem: {
    padding:10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

export default App;
