import React from 'react'
import { StyleSheet, Alert } from 'react-native'

import Histogram from './Histogram'
import CenterView from '../CenterView/index'

import { boolean, color, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import { colors } from '../../Theme/Colors'

const HistogramStories = storiesOf('Histogram', module)
HistogramStories.addDecorator((getStory: any) => (
  <CenterView customStyle={{ paddingHorizontal: 0 }}>{getStory()}</CenterView>
))

HistogramStories.add('Histogram', () => <Histogram />)
