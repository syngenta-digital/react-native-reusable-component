import React from 'react'
import { View, StyleSheet, Alert, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Button from '../Components/Button/Button'
import { colors } from '../Theme/Colors'

const onPress = (message: any) => {
  Alert.alert('Title', message)
}

const ButtonsDemo = () => (
  <>
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title='Small Button'
        btnSize='small'
        shadowButton={true}
        onPress={() => onPress('This is Small Size Shadow Button')}
      />
      <Button title='Medium Size Button' btnSize='medium' onPress={() => onPress('This is Medium Size Button')} />
      <Button title='Shadow Button' borderStyle={{borderColor: 'darkgreen', borderWidth: 2}} shadowButton={true} btnSize='medium' onPress={() => onPress('This is Medium Size Shadow Button')} />
      <Button title='Disabled Button' btnSize='medium' disabled={true} onPress={() => {}} />
      <Button title='Large Button' onPress={() => onPress('This is Large Button')} />
      <Button
        noTitle={true}
        shadowButton={true}
        borderStyle={styles.borderStyle}
        btnStyle={styles.customBtn}
        textStyle={styles.textStyle}
        onPress={() => onPress('This Is User Styles Button')}
      >
        <Text style={styles.textStyle}>Custom Style Button</Text>
        <Text style={styles.textStyle}>No. of Children Can Be Passed..</Text>
      </Button>
    </ScrollView>
  </>
)

export default ButtonsDemo

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin: 20,
    justifyContent: 'space-between',
    paddingBottom: 60
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
    fontSize: 16,
    paddingVertical: 5,
    textAlign: 'center'
  }
})
