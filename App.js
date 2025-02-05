import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import uuid from 'react-native-uuid';
import React, { useState, useCallback, useEffect } from 'react'
import Row from './components/Row.js';
import Add from './components/Add.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const STORAGE_KEY = '@items_key'

export default function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    AsyncStorage.clear()
    getData()
  }, [])

  useEffect(() => {
    storeData(data)
  }, [data])

  const add = useCallback((name) => {
    const newItem = {
      id: uuid.v4(),
      name: name,
      isChecked: false
    }
    const tempData = [...data, newItem]
    setData(tempData)
    console.log(tempData)

  }, [data])

  /*
  const renderItem = ({ item }) => {
    return (<Text>{item.name}</Text>)
  }
*/
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json === null) {
        json = []
      }
      setData(json)
    } catch (ex) {
      console.log(ex)
    }
  }

  const storeData = async (value) => {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY, json)
    } catch (ex) {
      console.log(ex)
    }
  }

  const toggleCheck = (itemid) => {
    const nextData = [...data]
    const itemToToggle = nextData.find(
        a => a.id === itemid
      );
      itemToToggle.isChecked=!itemToToggle.isChecked
      setData(nextData)
      console.log(nextData)
}

  return (
    <SafeAreaProvider>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Todo list" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>

        <Add add={add} />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Pressable onPress={() => toggleCheck(item.id)}>
              <Row item={item}
              />
            </Pressable>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '20'
  },
});
