/**
 * AlertComponent is use to show alert on screen, AlertComponent support button actions
 *
 * Title, Message Title, Success button Title/Action , Cancel Button Title/Action
 *
 * Use Case
 *AlertComponent will directly use in xml of component
 *
 */

import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native'

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Utility/ResponsiveDimension'
import { colors } from '../../Theme/Colors'
import { fonts } from '../../Theme/Fonts'

const guidelineBaseWidth = 360
const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size

function normalize(size: any, factor: any = 0.5) {
  let newSize = size + (scale(size) - size) * factor
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export enum AlertType {
  ERROR,
  SUCCESS,
  NONE
}

export interface AlertProps {
  onPressOk: any
  onPressCancel?: any
  alertTitle: string
  alertMsg: string
  alertType?: AlertType
  cancelTitle?: any
  okTitle: string
  productName?: string
  visible?: boolean
  successColor?: string
  errorColor?: string
  normalColor?: string
}

class AlertComponent extends React.Component<AlertProps> {
  constructor(props: AlertProps) {
    super(props)
  }

  showCancelButton = () => this.props.onPressCancel && this.props.cancelTitle

  alertStatusColor = () => {
    if (this.props.alertType === undefined || this.props.alertType === AlertType.SUCCESS) {
      return this.props.successColor ? this.props.successColor : colors.blue40
    } else {
      if (this.props.alertType === AlertType.ERROR) {
        return this.props.errorColor ? this.props.errorColor : colors.red60
      } else if (this.props.alertType === AlertType.NONE) {
        return this.props.normalColor ? this.props.normalColor : colors.grey100
      }
      return colors.blue40
    }
  }

  actionButton = (onPress: any, buttonTitle: string, textColor: string, backgroundColor: string) => (
    <TouchableOpacity onPress={() => onPress()} style={[alertStyles.buttonStyle, { backgroundColor: backgroundColor }]}>
      <View>
        <Text
          style={{
            color: textColor,
            ...fonts.h4
          }}>
          {buttonTitle}
        </Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    let useColor = this.alertStatusColor()
    let cancelButtonShow = this.showCancelButton()
    let { alertTitle, productName, alertMsg } = this.props
    return (
      <Modal visible={this.props.visible} transparent={true}>
        <View style={alertStyles.container}>
          <View style={alertStyles.popContainer}>
            <View style={[alertStyles.title, { borderBottomColor: useColor }]}>
              <Text style={[alertStyles.titleText, { color: useColor }]}>{alertTitle}</Text>
            </View>

            <View style={[alertStyles.line, { backgroundColor: useColor }]} />

            <View style={alertStyles.msgContainer}>
              {productName ? (
                <Text>
                  <Text style={fonts.body1SemiBold}>{alertMsg}</Text>
                  <Text style={alertStyles.msgBoldTextStyle}>{productName?.toString()}</Text>
                  <Text style={fonts.body1SemiBold}>{' ?'} </Text>
                </Text>
              ) : (
                <Text style={alertStyles.msgTextStyle}>{alertMsg}</Text>
              )}
            </View>

            <View style={alertStyles.buttonContainer}>
              {cancelButtonShow && (
                <View style={alertStyles.popButton}>
                  {this.actionButton(this.props.onPressCancel, this.props.cancelTitle, colors.black, colors.grey20)}
                </View>
              )}

              {this.actionButton(this.props.onPressOk, this.props.okTitle, colors.white, useColor)}
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const alertStyles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: colors.blackOpacity3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flex: 1
  },
  popContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: colors.white,
    width: '85%',
    padding: normalize(2),
    borderRadius: 8
  },
  header: {},
  imgStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    left: '40%',
    top: '6%'
  },
  line: {
    width: '100%',
    height: '1%'
  },

  title: {
    paddingHorizontal: normalize(18),
    width: '100%',
    height: normalize(48),
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  titleText: {
    textAlign: 'center',
    ...fonts.h4SemiBold
  },
  popBody: {
    left: normalize(80),
    alignItems: 'center'
  },
  popBodyWithCancel: {
    left: normalize(80),
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: normalize(10),
    paddingVertical: normalize(10),
    marginTop: normalize(10)
  },
  popButton: {
    marginRight: '5%'
  },
  msgContainer: {
    width: '100%',
    padding: normalize(10),
    backgroundColor: colors.white
  },
  msgTextStyle: {
    ...fonts.h4
  },
  msgBoldTextStyle: {
    ...fonts.h4SemiBold
  },
  buttonStyle: {
    minWidth: normalize(98),
    height: normalize(40),
    borderRadius: 4,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(10)
  }
})
export default AlertComponent
