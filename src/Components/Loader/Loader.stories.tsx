/* eslint-disable react-native/no-inline-styles */
import React from 'react'

import Loader from './loader'
import CenterView from '../CenterView/index'

import { boolean, color, number, object, radios, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import { SIZES } from '../../Assets/Font'
import { colors } from '../../Theme/Colors'
import { Platform } from 'react-native'

const LoaderStories = storiesOf('Loader Story', module)
LoaderStories.addDecorator((getStory: any) => (
  <CenterView customStyle={{ paddingHorizontal: 0, marginTop: 0 }}>{getStory()}</CenterView>
))

const label = 'Loader Type'
const typeOptions = {
  skype: 'skype',
  default: 'default'
}
const defaultType = 'default'
const groupId = 'Loader Type'

LoaderStories.add('Default Loader', () => (
  <Loader
    showLoader={boolean('showLoader', true)}
    type={radios(label, typeOptions, defaultType, groupId)}
    loaderText={text('loaderText', 'Loading...')}
    containerStyle={object('containerStyle', {})}
    textStyle={object('textStyle', { fontSize: SIZES(14), color: colors.blue80 })}
    loaderColor={color('loaderColor', colors.blue60)}
    size={
      Platform.OS === 'ios'
        ? select(
            'size',
            {
              small: 'small',
              large: 'large',
              medium: 'medium'
            },
            'large'
          )
        : number('size', 50)
    }
  />
))

LoaderStories.add('Skype Indicator Loader', () => (
  <Loader
    showLoader={boolean('showLoader', true)}
    type={radios(label, typeOptions, 'skype', groupId)}
    loaderText={text('loaderText', 'Loading...')}
    containerStyle={object('containerStyle', {})}
    textStyle={object('textStyle', { fontSize: SIZES(14), color: colors.blue80 })}
    loaderColor={color('loaderColor', colors.blue60)}
    size={number('size', 50)}
  />
))
