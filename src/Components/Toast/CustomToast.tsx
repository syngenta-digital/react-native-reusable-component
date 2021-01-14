import React from 'react'
import { View, StyleSheet, Text, Animated, Dimensions } from 'react-native'
import { colors } from '../../Theme/Colors'
import { normalize } from '../../Utility/ResponsiveDimension'
import { fontFamily, sizes } from '../../Assets/Font'
import { isTablet } from 'react-native-device-info'
import { Icon } from '../../Theme/Icon'
const height = Dimensions.get('screen').height

interface CustomToastProps {}

interface CustomToastState {
  showToast: boolean
  message: string
  alertType: string
  toastColor: any
  position?: any
}

export default class CustomToast extends React.Component<CustomToastProps, CustomToastState> {
  static shared: any
  animateOpacityValue: Animated.Value
  timerID: any

  constructor(props: CustomToastProps) {
    super(props)
    CustomToast.shared = this
    this.animateOpacityValue = new Animated.Value(height)
    this.state = {
      showToast: false,
      message: '',
      alertType: 'success',
      toastColor: 'blue',
      position: 'bottom'
    }
  }

  componentWillUnmount() {
    this.timerID && clearTimeout(this.timerID)
  }

  static show(message: string, alertType?: string, duration?: number, position?: any) {
    setTimeout(() => {
      this.shared.setToastType(alertType)
      this.shared.setToastPosition(position ? position : 'bottom')
      this.shared.ShowToast(message, alertType, duration)
    }, 50)
  }

  showToast(message: any, alertType: string, duration: number = 2000) {
    this.setState({ showToast: true, message, alertType }, () => {
      Animated.timing(this.animateOpacityValue, {
        toValue: -40,
        duration: 450,
        useNativeDriver: false
      }).start(() => this.hideToast(duration))
    })
  }
  hideToast = (duration: number) => {
    this.timerID = setTimeout(() => {
      Animated.timing(this.animateOpacityValue, {
        toValue: height,
        duration: 450,
        useNativeDriver: false
      }).start(() => {
        this.setState({ showToast: false })
        clearTimeout(this.timerID)
      })
    }, duration)
  }
  setToastType(type) {
    let color
    if (type === 'error') color = colors.damageRed
    if (type === 'primary') color = colors.blue
    if (type === 'warning') color = colors.yellow
    if (type === 'success') color = colors.blue
    this.setState({ toastColor: color })
  }

  setToastPosition(position: any) {
    position ? this.setState({ position: position }) : null
  }

  render() {
    if (this.state.showToast) {
      return (
        <Animated.View
          style={[
            styles.animatedToastView,
            {
              transform: [{ translateY: this.animateOpacityValue }],
              // top: this.state.position == 'top' ? height / 2 : '85%',
              top: 10
            }
          ]}>
          <View style={[styles.bottomPopup, { borderColor: this.state.toastColor }]}>
            <View
              style={[
                styles.tickView,
                {
                  backgroundColor: this.state.toastColor
                }
              ]}>
              <Icon name='success' size={sizes.size20} color={colors.white} />
            </View>
            <View style={styles.popupTextView}>
              <Text style={styles.popupText} numberOfLines={3}>
                {this.state.message}
              </Text>
            </View>
          </View>
        </Animated.View>
      )
    } else return <View  />
  }
}

const styles = StyleSheet.create({
  animatedToastView: {
    width: '90%',
    minHeight: normalize(70),
    borderRadius: 4,
    position: 'absolute',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  bottomPopup: {
    width: isTablet() ? '80%' : '100%',
    minHeight: normalize(70),
    elevation: 3,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    shadowOffset: { width: 1, height: 2 },
    shadowColor: colors.gray1,
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  tickView: {
    height: '100%',
    width: normalize(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  },
  popupTextView: {
    paddingHorizontal: sizes.size10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  popupText: {
    width: '90%',
    fontFamily: fontFamily.notosans_regular,
    fontSize: sizes.size16,
    lineHeight: 22
  },
  ToastBoxInsideText: {
    fontSize: 15,
    alignSelf: 'stretch',
    textAlign: 'center'
  }
})
