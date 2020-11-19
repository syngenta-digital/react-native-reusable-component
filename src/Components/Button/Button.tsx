import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '../../Theme/Colors'

interface Props {
  title?: string
  onPress?: any
  disabled?: boolean
  btnStyle?: object
  textStyle?: object
  borderButton?: boolean
  borderStyle?: object
  shadowButton?: boolean
  btnSize?: string
  noTitle?: boolean
  children?: React.ReactNode
}

interface State {}

export default class Button extends PureComponent<Props, State> {
  static propTypes: {
    title: PropTypes.Validator<string>
    onPress: PropTypes.Validator<(...args: any[]) => any>
  }
  static defaultProps: {
    title: string
    disabled?: boolean
    borderButton?: boolean
    onPress: () => void
    shadowButton?: boolean
    btnSize?: string
  }

  render() {
    const {
      title,
      onPress,
      btnStyle,
      disabled,
      textStyle,
      borderButton,
      borderStyle,
      shadowButton,
      btnSize,
      children,
      noTitle
    } = this.props
    let inlineStyle = { width: btnSize === 'small' ? '25%' : btnSize === 'medium' ? '50%' : '100%' }
    return (
      <>
        <TouchableOpacity
          style={[
            styles.container,
            inlineStyle,
            disabled && styles.disabledBtnView,
            shadowButton && styles.shadowButton,
            borderButton ? styles.borderButton : {},
            borderStyle,
            btnStyle
          ]}
          disabled={disabled}
          onPress={() => onPress()}>
          {!noTitle && (
            <Text
              style={[
                styles.title,
                borderButton && styles.borderButtonText,
                disabled && styles.btnDisabledTxt,
                textStyle
              ]}>
              {title}
            </Text>
          )}
          {children}
        </TouchableOpacity>
      </>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
Button.defaultProps = {
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
    minHeight: 44,
    backgroundColor: colors.green50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5
  },
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