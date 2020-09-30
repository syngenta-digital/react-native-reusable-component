import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Card from './src/Components/Card/Card'
import { colors } from './src/Theme/Colors'
import { sizes } from './src/Theme/Constants'
import { fonts } from './src/Theme/Fonts'

const App = () => (
  <View style={styles.container}>
    <Card
      children={
        <View>
          <Text style={[fonts.body1SemiBold]}>This is a</Text>
          <Text style={[fonts.h1]}>Card Component</Text>
        </View>
      }
    />
  </View>
)
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey10,
    paddingHorizontal: sizes.size12
  }
})
