import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Button from '../Components/Button/Button'
import { colors } from '../Theme/Colors'

const onPress = (message: any) => {
  Alert.alert('Title', message)
}

const ButtonsDemo = () => (
  <>
    <View style={styles.container}>
      <Button
        title='Small Button'
        btnSize='small'
        shadowButton={true}
        onPress={() => onPress('This is Small Size Shadow Button')}
      />
      <Button title='Medium Size Button' btnSize='medium' onPress={() => onPress('This is Medium Size Button')} />
      <Button title='Large Button' onPress={() => onPress('This is Large Button')} />
      <Button title='Large Size Disabled Button' disabled={true} onPress={() => {}} />
      <Button
        title='Any Cutom Button'
        shadowButton={true}
        borderStyle={styles.borderStyle}
        btnStyle={styles.customBtn}
        textStyle={styles.textStyle}
        onPress={() => onPress('This Is User Styles Button')}
      />
    </View>
    <View style={{ flex: 1 }} />
  </>
)

export default ButtonsDemo

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin: 20,
    justifyContent: 'space-between'
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.blue50,
    borderStyle: 'solid'
  },
  customBtn: {
    width: '75%',
    backgroundColor: colors.white
  },
  textStyle: {
    color: colors.blue50,
    fontSize: 16
  }
})
