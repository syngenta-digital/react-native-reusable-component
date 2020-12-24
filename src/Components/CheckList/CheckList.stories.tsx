import React from 'react'
import { StyleSheet, Alert } from 'react-native'

import CheckboxList from './CheckList'
import { Checkbox } from './CheckList'
import CenterView from '../CenterView/index'

import { boolean, color, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import { colors } from '../../Theme/Colors'

const checkboxStories = storiesOf('CheckBoxList', module)
checkboxStories.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

checkboxStories.add('Default CheckBox', () => (
  <Checkbox
    item={{ title: text('title', 'Checkbox Lable'), isSelected: boolean('isSelected', true) }}
    checkboxStyle={{
      activeColor: color('activeColor', colors.blue50),
      inactiveColor: color('inactiveColor', colors.grey60)
    }}
    rightSideText={boolean('rightSideText', false)}
    elementStyle={object('elementStyle', styles.elementStyle)}
    disabledClick={boolean('disabledClick', false)}
    labelStyle={object('labelStyle', {})}
    onClick={value => Alert.alert('Alert', value.title + ' is Selected')}
  />
))

checkboxStories.add('Disable CheckBox Click', () => (
  <Checkbox
    item={{ title: text('title', 'This is Lable'), isSelected: boolean('isSelected', true) }}
    rightSideText={boolean('rightSideText', false)}
    elementStyle={object('elementStyle', styles.elementStyle)}
    disabledClick={boolean('disabledClick', true)}
  />
))

checkboxStories.add('CheckBox List', () => (
  <CheckboxList
    array={object('array', [
      { title: 'First Element', isSelected: false },
      { title: 'Second Element', isSelected: true },
      { title: 'Third Element', isSelected: false },
      { title: 'Disabled Element..click me to confirm', isSelected: true, disabledClick: true }
    ])}
    labelStyle={object('labelStyle', { color: colors.blue50 })}
    checkboxStyle={{
      activeColor: color('activeColor', colors.blue50),
      inactiveColor: color('inactiveColor', colors.grey60)
    }}
    rightSideText={boolean('rightSideText', false)}
    elementStyle={object('elementStyle', styles.elementStyle)}
  />
))

checkboxStories.add('CheckList Text Variant', () => (
  <CheckboxList
    array={object('array', [
      { title: 'First Element', isSelected: false },
      { title: 'Second Element', isSelected: true },
      { title: 'Third Element', isSelected: false },
      { title: 'Fourth Element', isSelected: true }
    ])}
    rightSideText={boolean('rightSideText', true)}
    elementStyle={object('elementStyle', styles.elementStyle)}
  />
))

const styles = StyleSheet.create({
  elementStyle: {
    backgroundColor: colors.white,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.blue50,
    padding: 10,
    borderRadius: 5
  }
})
