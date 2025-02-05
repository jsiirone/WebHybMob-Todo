import { View, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function Add({add}) {
    const [name, setName] = useState('')

    const save = () => {
        add(name)
        setName('')
    }

    return (
        <View style={styles.add}>
            <TextInput style={styles.form}
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Enter task..."
            />
            <Button title='Save' onPress={() => save(name)} />
        </View>
    )
}

const styles = StyleSheet.create({
    add: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 16
    },
});