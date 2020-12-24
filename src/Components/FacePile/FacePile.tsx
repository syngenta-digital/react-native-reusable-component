import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

import { SIZES } from '../../Assets/Font'
import { colors } from '../../Theme/Colors'
import AppStyles from '../../Utility/AppStyles'

interface props {
  array: Array<any>
  colorsArray?: Array<any>
  circleBgColor: string
  circleStyle?: any
  containerStyle?: any
  maxCircleValue: number
  type: string
  defaultCropIconName?: string | ''
  imageStyle?: any
}

const renderText = (
  array: Array<any>,
  type: string,
  index: number,
  element: any,
  maxCircleValue: number,
  defaultCropIconName: string | undefined,
  imageStyle: any
) => {
  switch (type) {
    case 'name':
      return (
        <Text style={styles.circleText}>
          {index === maxCircleValue ? '+' + String(array.length - maxCircleValue) : element.toUpperCase()}
        </Text>
      )
    case 'icon': {
      if (element) {
        return <Icon name={element} color={colors.white} size={20} />
      } else {
        return defaultCropIconName ? <Icon name={defaultCropIconName} color={colors.white} size={20} /> : <View />
      }
    }
    case 'imageUrls':
      return (
        <Image
          style={imageStyle}
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
  defaultCropIconName,
  imageStyle,
  containerStyle
}: props) => (
  <View style={[AppStyles.addRow, containerStyle]}>
    {array.map((element: string, index: number) => {
      if (index <= maxCircleValue) {
        return (
          <View
            style={[
              styles.circleView,
              { backgroundColor: colorsArray?.length ? colorsArray[index] : circleBgColor || colors.white },
              circleStyle
            ]}>
            {renderText(array, type, index, element, maxCircleValue, defaultCropIconName, imageStyle)}
          </View>
        )
      }
    })}
  </View>
)

FacePile.defaultProps = {
  maxCircleValue: 4,
  defaultCropIconName: ''
}

const styles = StyleSheet.create({
  circleView: {
    width: SIZES(25),
    height: SIZES(25),
    borderRadius: SIZES(32),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginLeft: -SIZES(5),
    borderWidth: 1,
    borderColor: colors.grey40,
    top: -SIZES(6)
  },
  circleText: {
    color: colors.black,
    fontSize: SIZES(11)
  }
})

export default FacePile
