import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function Row({item}) {
    return (
        <Text style={{padding:10, textDecorationLine: item.isChecked==false ? 'none' : 'line-through' }}
        >{item.name}</Text>
    )
}

