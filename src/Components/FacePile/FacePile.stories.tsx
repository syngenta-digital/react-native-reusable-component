import React from 'react'

import FacePile from './FacePile'
import CenterView from '../CenterView/index'

import { array, color, number, object, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import { colors } from '../../Theme/Colors'

const FacePileStories = storiesOf('FacePile', module)
FacePileStories.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

FacePileStories.add('Basic FacePile List', () => (
  <FacePile
    array={array('array', ['a', 'v', 'd', 'n'])}
    maxCircleValue={number('maxCircleValue', 4)}
    type={select(
      'type',
      {
        name: 'name',
        icon: 'icon',
        imageUrls: 'imageUrls'
      },
      'name'
    )}
    textColor={color('textColor', colors.black)}
    circleSize={number('circleSize', 50)}
    circleBgColor={color('circleBgColor', colors.grey20)}
    imageStyle={object('imageStyle', {})}
    circleStyle={object('circleStyle', {})}
    containerStyle={object('containerStyle', {})}
  />
))

FacePileStories.add('Maximum circle length', () => (
  <FacePile
    array={array('array', ['a', 'v', 'd', 'n'])}
    circleBgColor={color('circleBgColor', colors.grey20)}
    circleStyle={object('circleStyle', {})}
    maxCircleValue={number('maxCircleValue', 2)}
    type={select(
      'type',
      {
        name: 'name',
        icon: 'icon',
        imageUrls: 'imageUrls'
      },
      'name'
    )}
    circleSize={number('circleSize', 50)}
    imageStyle={object('imageStyle', {})}
    containerStyle={object('containerStyle', {})}
  />
))

FacePileStories.add('Circles with different BG colors', () => (
  <FacePile
    array={array('array', ['a', 'v', 'd', 'n', 'B', 'g'])}
    circleStyle={object('circleStyle', {})}
    maxCircleValue={number('maxCircleValue', 4)}
    colorsArray={[colors.red50, colors.green50, colors.blue50, colors.syngenta_green, colors.orange40]}
    type={select(
      'type',
      {
        name: 'name',
        icon: 'icon',
        imageUrls: 'imageUrls'
      },
      'name'
    )}
    circleSize={number('circleSize', 50)}
    imageStyle={object('imageStyle', {})}
    containerStyle={object('containerStyle', {})}
  />
))

FacePileStories.add('FacePile for Icons', () => (
  <FacePile
    array={array('array', ['apple', 'calendar', 'acerolacherry', 'clock'])}
    circleBgColor={color('circleBgColor', colors.grey20)}
    circleStyle={object('circleStyle', {})}
    maxCircleValue={number('maxCircleValue', 3)}
    colorsArray={[colors.red50, colors.green50, colors.blue50, colors.syngenta_green]}
    type={select(
      'type',
      {
        name: 'name',
        icon: 'icon',
        imageUrls: 'imageUrls'
      },
      'icon'
    )}
    circleSize={number('circleSize', 80)}
    imageStyle={object('imageStyle', {})}
    containerStyle={object('containerStyle', {})}
  />
))

FacePileStories.add('FacePile for Images', () => (
  <FacePile
    array={array('array', [
      'https://reactnative.dev/img/tiny_logo.png',
      'https://reactnative.dev/img/tiny_logo.png',
      'https://reactnative.dev/img/tiny_logo.png',
      'https://reactnative.dev/img/tiny_logo.png'
    ])}
    circleBgColor={color('circleBgColor', colors.black)}
    circleStyle={object('circleStyle', {})}
    maxCircleValue={number('maxCircleValue', 3)}
    type={select(
      'type',
      {
        name: 'name',
        icon: 'icon',
        imageUrls: 'imageUrls'
      },
      'imageUrls'
    )}
    textColor={color('textColor', colors.white)}
    circleSize={number('circleSize', 90)}
    imageStyle={object('imageStyle', {})}
    containerStyle={object('containerStyle', {})}
  />
))
