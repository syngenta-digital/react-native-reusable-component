import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const App = () => (
  <View style={styles.container}>
    <Text>Reusable Components</Text>
  </View>
)
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
