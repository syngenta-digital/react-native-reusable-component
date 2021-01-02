import React from 'react'
import { View, Text, StyleSheet, Easing } from 'react-native'
import SliderArea from './SliderArea'
import CenterView from '../CenterView/index'

import { number, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import CustomButton from '../Button/Button'

const SliderAreaStories = storiesOf('Animated/Sliding area Story', module)
SliderAreaStories.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

SliderAreaStories.add('Animated/Sliding area', () => {
  let refSlideArea: any
  return (
    <View style={styles.container}>
      <CustomButton
        btnStyle={styles.btnStyle}
        title='Toggle View'
        btnSize='medium'
        onPress={() => refSlideArea.toggleAnimation()}
      />
      <SliderArea
        ref={(ref: any) => (refSlideArea = ref)}
        maxHeight={number('maxHeight', 250)}
        animationDuration={number('animationDuration', 500)}
        onHide={action('Function to call when view gets invisible')}
        onShow={action('Function to call when animated view is visible')}
        animationType={Easing.linear}
        minHeight={number('minHeight', 0)}
        containerStyle={object('containerStyle', styles.parentCard)}
        animationStyle={object('animationStyle', styles.slideArea)}>
        <View style={styles.innerView}>
          <Text style={styles.text}>This is Sample Text...</Text>
          <Text style={styles.text}>Text has been passed from parent file...</Text>
          <Text style={styles.text}>Any custom style can be applied...</Text>
        </View>
      </SliderArea>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  btnStyle: {
    marginVertical: 30
  },
  slideArea: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerView: { paddingTop: 5 },
  text: {
    color: 'white'
  },
  parentCard: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})
