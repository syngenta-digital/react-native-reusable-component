import React from 'react'
import { StyleSheet, Alert } from 'react-native'

import Histogram from './Histogram'
import CenterView from '../CenterView/index'

import { array, color, number, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import { colors } from '../../Theme/Colors'
import { fontFamily } from '../../Assets/Font'

const HistogramStories = storiesOf('Histogram', module)
HistogramStories.addDecorator((getStory: any) => (
  <CenterView customStyle={{ paddingHorizontal: 0 }}>{getStory()}</CenterView>
))

HistogramStories.add('Histogram', () => (
  <Histogram
    graphData={[
      { svg: { fill: '#808080' }, value: 25.26 },
      { svg: { fill: '#FF0E00' }, value: 10.4 },
      { svg: { fill: '#FF4500' }, value: 1.57 },
      { svg: { fill: '#FF7E00' }, value: 0.19 },
      { svg: { fill: '#FFB800' }, value: 0 },
      { svg: { fill: '#FFFE00' }, value: 0 },
      { svg: { fill: '#C6DD00' }, value: 0 },
      { svg: { fill: '#8EBC00' }, value: 0 },
      { svg: { fill: '#549B00' }, value: 0 },
      { svg: { fill: '#0E7000' }, value: 0 }
    ]}
    totalHistogramArea={number('totalHistogramArea', 37.42)}
    yMax={number('yMax', 26)}
    dataY={[0, 26]}
    dataX={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}
    areaLable={text('areaLable', 'Area')}
    areaUnit={text('areaUnit', 'ha')}
    chartBgHeight={number('chartBgHeight', 250)}
    title={text('title', 'Vegetation Index')}
    histogramText={text('histogramText', 'Histogram')}
    highTitle={text('highTitle', 'High')}
    lowTitle={text('lowTitle', 'Low')}
    gradientColorsArray={array('gradientColorsArray', [colors.damageRed, colors.yellow, '#ABB926', colors.green90])}
    barchartAreaStyle={object('barchartAreaStyle', {})}
    sliderAreaStyle={object('sliderAreaStyle', {})}
    animatedViewStyle={object('animatedViewStyle', {})}
    graphContainerStyle={object('graphContainerStyle', {})}
    fontFamilyName={text('fontFamilyName', fontFamily.notosans_regular)}
  />
))
