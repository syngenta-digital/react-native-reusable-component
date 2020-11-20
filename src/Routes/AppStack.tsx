import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from '../Screens/Home'
import CardDemo from '../Screens/CardDemo'
import ColorDemo from '../Screens/ColorDemo'
import AvatarDemo from '../Screens/AvatarDemo'
import LoaderDemo from '../Screens/LoaderDemo'
import ButtonsDemo from '../Screens/ButtonsDemo'
import PhoneFieldWithCountryPickerDemo from '../Screens/PhoneFieldWithCountryPickerDemo'

const Stack = createStackNavigator()

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='CardDemo' component={CardDemo} />
      <Stack.Screen name='ColorDemo' component={ColorDemo} />
      <Stack.Screen name='AvatarDemo' component={AvatarDemo} />
      <Stack.Screen name='LoaderDemo' component={LoaderDemo} />
      <Stack.Screen name='ButtonsDemo' component={ButtonsDemo} />
      <Stack.Screen name='PhoneFieldWithCountryPickerDemo' component={PhoneFieldWithCountryPickerDemo} />
    </Stack.Navigator>
  )
}
