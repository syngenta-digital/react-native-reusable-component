import React from 'react'
import { StyleSheet } from 'react-native'

import RadioButtonList from './Index'
import CenterView from '../CenterView/index'

import { boolean, color, number, object, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import { colors } from '../../Theme/Colors'

const RadioButtonListStories = storiesOf('RadioButtonList', module)
RadioButtonListStories.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

RadioButtonListStories.add('Radio Buttons List', () => (
  <RadioButtonList
    data={[
      {
        label: text('label', 'data 1')
      },
      {
        label: text('label', 'data 2')
      }
    ]}
    circleSize={number('circleSize', 25)}
    selectedBtn={(e: any) => console.log(e)}
    activeColor={color('activeColor', colors.blue50)}
    deactiveColor={color('deactiveColor', colors.grey80)}
    box={boolean('box', true)}
    boxActiveBgColor={color('boxActiveBgColor', colors.grey10)}
    boxDeactiveBgColor={color('boxDeactiveBgColor', colors.white)}
    textColor={color('textColor', colors.blue80)}
    duration={number('duration', 500)}
    initial={number('initial', 1)}
    animationTypes={[
      select(
        'animationTypes',
        {
          zoomIn: 'zoomIn',
          pulse: 'pulse',
          shake: 'shake',
          rotate: 'rotate'
        },
        'zoomIn'
      )
    ]}
    textStyle={object('textStyle', styles.textStyle)}
    boxStyle={object('boxStyle', {})}
    style={object('style', {})} // style for main container view
  />
))

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 17
  }
})
