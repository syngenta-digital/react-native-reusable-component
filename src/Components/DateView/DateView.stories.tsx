import React from 'react'
import { StyleSheet } from 'react-native'

import DateView from './DateView'
import CenterView from '../CenterView/index'

import { boolean, color, number, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { colors } from '../../Theme/Colors'

const DateViewStory = storiesOf('DateViewStory', module)
DateViewStory.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

DateViewStory.add('Basic DateView Area', () => (
  <DateView onPress={action('Click Event')} start={'20/12/1220'} end={'20/12/1220'} />
))

DateViewStory.add('DateView Area Other Style Features', () => (
  <DateView
    onPress={action('Click Event')}
    start={'20 Dec, 2019'}
    end={'01 Jan, 2020'}
    disabled={boolean('disabled', false)}
    containerStyle={object('containerStyle', {})}
    iconViewStyle={object('iconViewStyle', {})}
    dateViewStyle={object('dateViewStyle', style.dateViewStyle)}
    titleStyle={object('titleStyle', {})}
    dashStyle={object('dashStyle', style.dash)}
    iconName={text('iconName', 'calendar')}
    iconSize={number('iconSize', 40)}
    iconColor={color('iconColor', colors.grey50)}
  />
))

const style = StyleSheet.create({
  dateViewStyle: {
    borderColor: colors.blue50,
    borderWidth: 1
  },
  dash: { height: 2, backgroundColor: colors.blue70, width: 20 }
})
