/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Animated, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

interface props {
  animationTypes: Array<any> //array of string having following types- 'zoomIn', 'pulse', 'shake', 'rotate', you can use one or more of this value for exaple: ['pulse'] or ['pulse', 'rotate']
  selectedBtn: (data: any) => void //this is callback function which calls when radio button is selected and returns selected element
  boxStyle?: ViewStyle
  style?: ViewStyle
  circleSize: number
  textStyle: TextStyle
  data: Array<any>
  icon?: any
  activeColor: string
  deactiveColor: string
  boxActiveBgColor: string
  boxDeactiveBgColor: string
  box: boolean
  textColor?: string
  duration?: number
  initial: number
}

interface state {
  fadeAnim: any
  activeIndex: number
  animations: Array<any>
}

class RadioButtonRN extends React.PureComponent<props, state> {
  static propTypes = {
    style: PropTypes.object,
    boxStyle: PropTypes.object,
    textStyle: PropTypes.object,
    initial: PropTypes.number,
    circleSize: PropTypes.number,
    duration: PropTypes.number,
    data: PropTypes.array,
    animationTypes: PropTypes.array,
    selectedBtn: PropTypes.func,
    activeColor: PropTypes.string,
    deactiveColor: PropTypes.string,
    boxActiveBgColor: PropTypes.string,
    boxDeactiveBgColor: PropTypes.string,
    textColor: PropTypes.string,
    box: PropTypes.bool
  }

  static defaultProps = {
    style: {},
    boxStyle: {},
    textStyle: {},
    initial: -1,
    circleSize: 18,
    duration: 500,
    data: [],
    animationTypes: [],
    selectedBtn: () => {},
    activeColor: '#03a9f4',
    deactiveColor: '#e2e2e2',
    boxActiveBgColor: '#e1f5fe33',
    boxDeactiveBgColor: '#fff',
    textColor: '#383838',
    box: true
  }
  animations: (
    | { name: string; animation: { scale: any; rotate?: undefined } }
    | { name: string; animation: { rotate: any; scale?: undefined } }
  )[]
  constructor(props: props) {
    super(props)

    this.state = {
      activeIndex: -1,
      fadeAnim: new Animated.Value(0),
      animations: []
    }

    this.animations = [
      {
        name: 'zoomIn',
        animation: {
          scale: this.state.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }
      },
      {
        name: 'pulse',
        animation: {
          scale: this.state.fadeAnim.interpolate({
            inputRange: [0, 0.4, 0.7, 1],
            outputRange: [0.7, 1, 1.3, 1]
          })
        }
      },
      {
        name: 'shake',
        animation: {
          scale: this.state.fadeAnim.interpolate({
            inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
            outputRange: [0.8, 1.2, 0.8, 1.2, 0.8, 1]
          })
        }
      },
      {
        name: 'rotate',
        animation: {
          rotate: this.state.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      }
    ]

    this._changeRadio = this._changeRadio.bind(this)
    this._checkAnimatons = this._checkAnimatons.bind(this)
  }

  componentDidMount() {
    this._checkAnimatons()
  }

  componentDidUpdate(prevProps: { initial: any; animationTypes: any }) {
    if (this.state.activeIndex === -1 && this.props.initial > 0) {
      const initialActive = this.props.initial - 1
      this._changeRadio(this.props.data[initialActive], initialActive)
    }
    if (this.props.initial !== prevProps.initial) {
      const initialActive = this.props.initial - 1
      this._changeRadio(this.props.data[initialActive], initialActive)
    }
    if (this.props.animationTypes !== prevProps.animationTypes) {
      this._checkAnimatons()
    }
  }

  _checkAnimatons() {
    const { animationTypes } = this.props

    this.setState({ animations: [] })
    const newAnim: ({ scale: any; rotate?: undefined } | { rotate: any; scale?: undefined })[] = []
    animationTypes &&
      animationTypes.map((item: string) => {
        const itm = this.animations.find(e => e.name === item)
        if (itm) {
          newAnim.push(itm.animation)
        }
      })
    this.setState({ animations: newAnim })
  }

  _changeRadio(item: any, activeIndex: number) {
    this.setState({ activeIndex })
    if (activeIndex !== this.state.activeIndex) {
      this.fadeInAnimation()
    }
    this.props.selectedBtn(item)
  }

  fadeInAnimation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: this.props.duration,
        delay: 10,
        useNativeDriver: true
      }).start()
    })
  }

  render() {
    let { activeIndex, fadeAnim, animations } = this.state
    let {
      boxStyle,
      style,
      circleSize,
      textStyle,
      data,
      icon,
      activeColor,
      deactiveColor,
      boxActiveBgColor,
      boxDeactiveBgColor,
      box,
      textColor
    } = this.props
    circleSize = circleSize || 20
    return (
      <View style={style}>
        {data.map((item: { label: React.ReactNode }, index: string | number | null | undefined) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                box ? styles.productBox : styles.productBoxLess,
                box && {
                  backgroundColor: activeIndex === index ? boxActiveBgColor : boxDeactiveBgColor,
                  borderColor: activeIndex === index ? activeColor : deactiveColor
                },
                boxStyle
              ]}
              activeOpacity={0.9}
              onPress={() => this._changeRadio(item, Number(index))}>
              <View style={styles.leftProductBox}>
                <View
                  style={[
                    icon ? styles.icon : styles.circle,
                    {
                      borderColor: activeIndex === index ? activeColor : deactiveColor,
                      width: circleSize + 8,
                      height: circleSize + 8
                    },
                    icon && {
                      borderColor: activeIndex === index ? 'transparent' : deactiveColor
                    }
                  ]}>
                  <Animated.View
                    style={{
                      opacity: activeIndex === index ? fadeAnim : 0
                    }}>
                    <Animated.View
                      style={{
                        transform: animations
                      }}>
                      {icon ? (
                        icon
                      ) : (
                        <View
                          style={[
                            styles.circleFill,
                            {
                              backgroundColor: activeIndex === index ? activeColor : deactiveColor,
                              borderColor: activeIndex === index ? activeColor : deactiveColor,
                              width: circleSize,
                              height: circleSize
                            }
                          ]}
                        />
                      )}
                    </Animated.View>
                  </Animated.View>
                </View>
              </View>

              <View style={[styles.centerProductBox]}>
                <Text
                  style={[
                    {
                      color: textColor
                    },
                    textStyle
                  ]}>
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

/* Styles ====================================== */
const styles = StyleSheet.create({
  productBox: {
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10
  },
  productBoxLess: {
    flexDirection: 'row',
    marginTop: 10
  },
  leftProductBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerProductBox: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 4
  },
  circle: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleFill: {
    borderWidth: 1,
    borderRadius: 10000
  }
})

/* Export Component ============================ */
export default RadioButtonRN
