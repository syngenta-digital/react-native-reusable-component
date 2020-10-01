import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Animated, Easing } from 'react-native'

interface IndicatorProps {
  style?: any
  animationDuration: number
  hideAnimationDuration?: number
  animating: any
  interaction: boolean
  hidesWhenStopped: boolean
  count: number
  animationEasing?: any
  renderComponent: (
    index: number,
    count: number,
    progress: { interpolate: (arg0: { inputRange: number[] | number[]; outputRange: string[] | number[] }) => any }
  ) => void
}

interface IndicatorState {
  progress: any
  hideAnimation: any
}

export default class Indicator extends PureComponent<IndicatorProps, IndicatorState> {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    hideAnimationDuration: 200,

    animating: true,
    interaction: true,
    hidesWhenStopped: true,

    count: 1
  }

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,
    hideAnimationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,
    hidesWhenStopped: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number
  }
  animationState: number
  savedValue: number

  constructor(props: any) {
    super(props)
    this.animationState = 0
    this.savedValue = 0

    let { animating } = this.props

    this.state = {
      progress: new Animated.Value(0),
      hideAnimation: new Animated.Value(animating ? 1 : 0)
    }
  }

  componentDidMount() {
    let { animating } = this.props

    if (animating) {
      this.startAnimation()
    }
  }

  componentDidUpdate(prevProps: any) {
    let { animating } = this.props

    if (animating && !prevProps.animating) {
      this.resumeAnimation()
    }

    if (!animating && prevProps.animating) {
      this.stopAnimation()
    }

    if (animating ^ prevProps.animating) {
      let { hideAnimation } = this.state
      let { hideAnimationDuration: duration } = this.props

      Animated.timing(hideAnimation, { toValue: animating ? 1 : 0, duration, useNativeDriver: false }).start()
    }
  }

  startAnimation() {
    let { progress } = this.state
    let { interaction, animationEasing, animationDuration } = this.props

    if (this.animationState !== 0) {
      return
    }

    let animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1
    })

    Animated.loop(animation).start()

    this.animationState = 1
  }

  stopAnimation() {
    let { progress } = this.state

    if (this.animationState !== 1) {
      return
    }

    let listener = progress.addListener((value: any) => {
      progress.removeListener(listener)
      progress.stopAnimation(() => this.saveAnimation(value))
    })

    this.animationState = -1
  }

  saveAnimation(value: number) {
    let { animating } = this.props

    this.savedValue = value
    this.animationState = 0

    if (animating) {
      this.resumeAnimation()
    }
  }

  resumeAnimation() {
    let { progress } = this.state
    let { interaction, animationDuration } = this.props

    if (this.animationState !== 0) {
      return
    }

    Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - this.savedValue) * animationDuration,
      toValue: 1
    }).start(({ finished }) => {
      if (finished) {
        progress.setValue(0)

        this.animationState = 0
        this.startAnimation()
      }
    })

    this.savedValue = 0
    this.animationState = 1
  }

  renderComponent(item: any, index: any) {
    let { progress } = this.state
    let { renderComponent, count } = this.props

    if (typeof renderComponent === 'function') {
      return renderComponent(index, count, progress)
    }

    return null
  }

  render() {
    let { hideAnimation } = this.state
    let { count, hidesWhenStopped, ...props } = this.props

    if (hidesWhenStopped) {
      props.style = [].concat(props.style || [], { opacity: hideAnimation })
    }

    return <Animated.View {...props}>{Array.from(new Array(count), this.renderComponent, this)}</Animated.View>
  }
}
