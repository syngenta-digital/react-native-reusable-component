import React, { PureComponent } from 'react'
import { StyleSheet, Animated, Easing, View } from 'react-native'
import PropTypes from 'prop-types'

interface AnimatedAreaProps {
  maxHeight: any
  animationDuration?: number
  animationStyle?: object
  containerStyle?: object
  ref: any
  children?: React.ReactNode[] | React.ReactNode
  onHide?: () => void
  onShow?: () => void
  animationType?: any
  minHeight?: number
}

interface AnimatedAreaState {
  animationValue: any
  visibility: boolean
}

export default class AnimatedArea extends PureComponent<AnimatedAreaProps, AnimatedAreaState> {
  static propTypes: {
    maxHeight: PropTypes.Validator<number>
    minHeight: PropTypes.Requireable<number>
    animationDuration: PropTypes.Requireable<number>
    onShow: PropTypes.Requireable<any>
    onHide: PropTypes.Requireable<any>
  }

  static defaultProps = {
    animationDuration: 500,
    onShow: () => {},
    onHide: () => {},
    animationType: Easing.linear,
    minHeight: 0
  }

  constructor(props: AnimatedAreaProps) {
    super(props)
    this.state = {
      animationValue: new Animated.Value(props.minHeight || 0),
      visibility: false
    }
  }

  toggleAnimation = () => {
    let { animationDuration, animationType, onHide, onShow, maxHeight, minHeight } = this.props
    let { visibility, animationValue } = this.state
    if (visibility) {
      Animated.timing(animationValue, {
        toValue: minHeight || 0,
        duration: animationDuration,
        useNativeDriver: false,
        easing: animationType
      }).start(() => {
        this.setState({ visibility: false }, () => {
          if (onHide) {
            onHide()
          }
        })
      })
    } else {
      Animated.timing(animationValue, {
        toValue: maxHeight,
        duration: animationDuration,
        useNativeDriver: false,
        easing: animationType
      }).start(() =>
        this.setState({ visibility: true }, () => {
          if (onShow) {
            onShow()
          }
        })
      )
    }
  }

  render() {
    const animatedStyle = {
      height: this.state.animationValue,
      opacity: this.state.animationValue
    }
    let { animationStyle, containerStyle } = this.props
    return (
      <View style={[styles.animatedArea, containerStyle]}>
        <Animated.View style={[animationStyle, animatedStyle]}>{this.props.children}</Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  animatedArea: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%'
  }
})
