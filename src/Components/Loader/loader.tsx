import React from 'react'
import { View, Text, TextStyle, ActivityIndicator } from 'react-native'
import SkypeIndicator from './SkypeIndicator/Index'
import { StyleSheet } from 'react-native'
import { colors } from '../../Theme/Colors'
import { fonts } from '../../Theme/Fonts'
import { SIZES } from '../../Assets/Font'

export interface AppLoaderProps {
  loaderText?: string
  showLoader: boolean
  containerStyle?: any
  textStyle?: TextStyle
  loaderColor?: string
  type?: string
  size: any
}

const renderLoader = (type: any, loaderColor: string | undefined, size: any) => {
  switch (type) {
    case 'skype':
      return <SkypeIndicator color={loaderColor} size={size} />
    default:
      return <ActivityIndicator color={loaderColor} size={size} />
  }
}

const AppLoader = ({ loaderText, showLoader, containerStyle, textStyle, type, loaderColor, size }: AppLoaderProps) =>
  showLoader ? (
    <View style={AppLoaderStyles.mainContainer}>
      <View style={[AppLoaderStyles.container, containerStyle]}>
        <View style={AppLoaderStyles.loaderContainer}>{renderLoader(type, loaderColor, size)}</View>
        <Text style={[fonts.subtitle1, AppLoaderStyles.textStyle, textStyle]}>{loaderText}</Text>
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

AppLoader.defaultProps = {
  loaderColor: colors.blue50,
  size: SIZES(20)
}

export default AppLoader
