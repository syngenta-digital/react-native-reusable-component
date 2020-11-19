import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppStack } from './src/Routes/AppStack'
import AlertView from './src/Components/Alert/AlertView'

const App = () => (
  <NavigationContainer>
    <AppStack />
    <AlertView />
  </NavigationContainer>
)
export default App
