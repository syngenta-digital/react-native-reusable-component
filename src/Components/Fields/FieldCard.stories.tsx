import React from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'

import FieldCard from './FieldCard'
import CenterView from '../CenterView/index'

import { array, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

const FieldCardStories = storiesOf('FieldCard', module)
FieldCardStories.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

FieldCardStories.add('Basic FieldCard with no boundry', () => (
  <FieldCard
    field={object('field', { name: 'This id field title' })}
    noBoundaryAlertText={text('noBoundaryAlertText', 'No Boundary Added')}
  />
))

FieldCardStories.add('Basic FieldCard with boundry', () => (
  <FieldCard
    field={object('field', { name: 'Filed having geometry value', geometry: '109' })}
    subtitle={text('subtitle', 'This is subtitle')}
  />
))

FieldCardStories.add('Other FieldCard Features', () => (
  <FieldCard
    field={object('field', { name: 'This id field title' })}
    subtitle={text('subtitle', 'Any subtitle')}
    noBoundaryAlertText={text('noBoundaryAlertText', 'No Boundary')}
    children={
      <TouchableOpacity onPress={() => Alert.alert('alert', 'Click Event')}>
        <Text>Click Me!</Text>
      </TouchableOpacity>
    }
    containerStyle={object('containerStyle', {})}
    leftIconViewStyle={object('leftIconViewStyle', {})}
    fieldDetailsStyle={object('fieldDetailsStyle', {})}
    fieldTitleStyle={object('fieldTitleStyle', {})}
    subTitleStyle={object('subTitleStyle', {})}
    boundryDescStyle={object('boundryDescStyle', {})}
    actionAreaStyle={object('actionAreaStyle', {})}
  />
))

FieldCardStories.add('FieldCard With Error Description', () => (
  <FieldCard
    field={object('field', { name: 'This id field title' })}
    subtitle={text('subtitle', 'Click on error to check click event')}
    children={
      <TouchableOpacity onPress={() => Alert.alert('alert', 'Click Event')}>
        <Text>Click Me!</Text>
      </TouchableOpacity>
    }
    syncError={array('syncError', ['this is error 1', 'this is error 2', 'this is error 3'])}
    syncErrorText={text('syncErrorText', 'Error: ')}
    errorDescription={text('errorDescription', ['this is error 1', 'this is error 2', 'this is error 3'].toString())}
    errorNavigation={() => Alert.alert('onclick', 'navigate to error details screen')}
    containerStyle={object('containerStyle', {})}
    leftIconViewStyle={object('leftIconViewStyle', {})}
    fieldDetailsStyle={object('fieldDetailsStyle', {})}
    fieldTitleStyle={object('fieldTitleStyle', {})}
    subTitleStyle={object('subTitleStyle', {})}
    boundryDescStyle={object('boundryDescStyle', {})}
    actionAreaStyle={object('actionAreaStyle', {})}
  />
))
