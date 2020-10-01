import React from 'react'
import { View, Text } from 'react-native'
import SkypeIndicator from './SkypeIndicator/Index'
import { StyleSheet } from 'react-native'
import { colors } from '../../Theme/Colors'
import { fonts } from '../../Theme/Fonts'
export interface AppLoaderProps {
  loaderText?: string
  showLoader: boolean
  containerStyle?: any
}
const AppLoader = ({ loaderText, showLoader, containerStyle }: AppLoaderProps) =>
  showLoader ? (
    <View style={AppLoaderStyles.mainContainer}>
      <View style={[AppLoaderStyles.container, containerStyle]}>
        <View style={AppLoaderStyles.loaderContainer}>
          <SkypeIndicator color={colors.blue50} />
        </View>
        <Text style={[fonts.subtitle1, AppLoaderStyles.textStyle]}>{loaderText}</Text>
      </View>
    </View>
  ) : null

const AppLoaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  loaderContainer: { width: '20%', height: '10%' },
  textStyle: {
    alignSelf: 'center',

    color: colors.blue50
  },
  mainContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1
  }
})
export default AppLoader
