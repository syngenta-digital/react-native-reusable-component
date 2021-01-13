import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native'

import { colors } from '../../Theme/Colors'
import { SIZES } from '../../Assets/Font'

import Icon from 'react-native-vector-icons/FontAwesome5'
import PropTypes from 'prop-types'

interface Props {
  title?: string
  onPress: any
  disabled?: boolean
  btnStyle?: object
  textStyle?: object
  borderButton?: boolean
  borderStyle?: object
  shadowButton?: boolean
  btnSize?: string
  noTitle?: boolean
  children?: React.ReactNode
  textProps?: any
  leftIconName?: string
  rightIconName?: string
  iconColor?: string
  iconStyle?: ViewStyle
}

const CustomButton = ({
  title,
  onPress,
  btnStyle,
  disabled,
  textStyle,
  borderButton,
  leftIconName,
  rightIconName,
  iconStyle,
  iconColor,
  borderStyle,
  shadowButton,
  btnSize,
  children,
  noTitle,
  textProps
}: Props) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            flexDirection: children ? 'column' : 'row',
            width: btnSize === 'small' ? '25%' : btnSize === 'medium' ? '50%' : '100%'
          },
          disabled && styles.disabledBtnView,
          shadowButton && styles.shadowButton,
          borderButton ? styles.borderButton : {},
          borderStyle,
          btnStyle
        ]}
        disabled={disabled}
        onPress={() => onPress()}>
        {leftIconName && (
          <Icon
            name={leftIconName}
            size={SIZES(14)}
            color={iconColor || colors.gray2}
            style={[styles.btnIcon || iconStyle]}
          />
        )}
        {!noTitle && (
          <Text
            {...textProps}
            style={[
              styles.title,
              borderButton && styles.borderButtonText,
              disabled && styles.btnDisabledTxt,
              textStyle
            ]}>
            {title}
          </Text>
        )}
        {rightIconName && (
          <Icon
            name={rightIconName}
            size={SIZES(14)}
            color={iconColor || colors.gray2}
            style={[styles.btnIcon || iconStyle]}
          />
        )}
        {children}
      </TouchableOpacity>
    </>
  )
}

export default CustomButton

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
CustomButton.defaultProps = {
  title: 'BorderButton',
  disabled: false,
  borderButton: false,
  onPress: () => {},
  shadowButton: false,
  btnSize: 'large'
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    minHeight: SIZES(44),
    backgroundColor: colors.green50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5
  },
  btnIcon: { marginHorizontal: 5 },
  shadowButton: {
    elevation: 7,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  title: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center'
  },
  borderButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.red60
  },
  borderButtonText: {
    color: colors.red60,
    fontSize: 16
  },
  disabledBtnView: {
    backgroundColor: colors.grey30
  },
  btnDisabledTxt: {
    color: colors.grey100
  }
})
