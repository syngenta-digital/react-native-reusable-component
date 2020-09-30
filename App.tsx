import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from './src/Theme/Colors'
import { fonts } from './src/Theme/Fonts'

const App = () => (
  <View style={styles.container}>
    <Text style={[styles.textStyle, fonts.body1SemiBold]}>React-Native Reusable Component</Text>
  </View>
)
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.blue10
  },
  textStyle: {
    color: colors.green70
  }
})
