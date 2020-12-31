/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

import { SIZES } from '../../Assets/Font'
import { colors } from '../../Theme/Colors'
import AppStyles from '../../Utility/AppStyles'

interface props {
  array: Array<any>
  colorsArray?: Array<any>
  circleBgColor?: string
  circleStyle?: any
  containerStyle?: any
  maxCircleValue: number
  type: string
  defaultIconName: string | ''
  imageStyle?: any
  circleSize?: number
  textColor?: any
}

const renderText = (
  array: Array<any>,
  type: string,
  index: number,
  element: any,
  maxCircleValue: number,
  defaultIconName: string | '',
  imageStyle: any,
  circleSize?: number,
  textColor?: any
) => {
  const renderCircleText = (text: string | null | undefined) => (
    <Text style={[{ color: textColor || 'red', fontSize: 11 }, circleSize ? { fontSize: circleSize / 2.2 } : {}]}>
      {text}
    </Text>
  )

  if (index === maxCircleValue) {
    return <>{renderCircleText('+' + String(array.length - maxCircleValue))}</>
  }

  switch (type) {
    case 'name':
      return <>{renderCircleText(element.toUpperCase())}</>
    case 'icon':
      return (
        <Icon
          name={element || defaultIconName}
          color={textColor || colors.white}
          size={(circleSize && circleSize / 2.2) || 20}
          style={styles.centerAlign}
        />
      )
    case 'imageUrls':
      return (
        <Image
          style={[styles.imageInCircle, imageStyle]}
          source={{
            uri: element
          }}
        />
      )
    default:
      return <View />
  }
}

const FacePile = ({
  array,
  colorsArray,
  circleBgColor,
  circleStyle,
  maxCircleValue,
  type,
  circleSize,
  defaultIconName,
  imageStyle,
  containerStyle,
  textColor
}: props) => (
  <View style={[AppStyles.addRow, containerStyle]}>
    {array.map((element: string, index: number) => {
      if (index <= maxCircleValue) {
        return (
          <View
            key={index}
            style={[
              styles.circleView,
              { backgroundColor: colorsArray?.length ? colorsArray[index] : circleBgColor || colors.grey20 },
              circleSize && { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
              type === 'imageUrls' && { padding: 20 },
              circleStyle
            ]}>
            {renderText(
              array,
              type,
              index,
              element,
              maxCircleValue,
              defaultIconName,
              imageStyle,
              circleSize,
              textColor
            )}
          </View>
        )
      }
    })}
  </View>
)

FacePile.defaultProps = {
  maxCircleValue: 4,
  defaultIconName: '',
  textColor: colors.black
}

const styles = StyleSheet.create({
  circleView: {
    width: SIZES(25),
    height: SIZES(25),
    borderRadius: SIZES(32),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginLeft: -SIZES(8),
    borderWidth: 1,
    borderColor: colors.grey60,
    top: -SIZES(6)
  },
  circleText: {
    color: colors.black,
    fontSize: SIZES(11)
  },
  imageInCircle: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  centerAlign: { alignSelf: 'center' }
})

export default FacePile
