import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Button from '../Components/Button/Button'
import { colors } from '../Theme/Colors'

const onPress = (message: any) => {
    Alert.alert('Title', message);
}

const ButtonsDemo = () => (
    <View style={styles.container}>
        <Button title='Large Button' onPress={() => onPress('This is Large Button')}/>
        <Button title='Medium Size Border Button' btnSize='medium' onPress={() => onPress('This is Medium Size Border Button')}/>
        <Button title='Small Size Shadow Button' btnSize='small' shadowButton={true} onPress={() => onPress('This is Large Button')}/>
        <Button title='Large Size Disabled Button' disabled={true} onPress={() => {}}/>
    </View>
)

export default ButtonsDemo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: colors.white,
        justifyContent: 'space-between'
    }
})