/* eslint-disable react-native/no-inline-styles */
import React from 'react'

import SearchField from './SearchField'
import CenterView from '../CenterView/index'

import { number, object, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import { colors } from '../../Theme/Colors'
import CustomButton from '../Button/Button'
import { action } from '@storybook/addon-actions'

const SearchFieldStories = storiesOf('Search Field', module)
SearchFieldStories.addDecorator((getStory: any) => (
  <CenterView customStyle={{ paddingHorizontal: 10 }}>{getStory()}</CenterView>
))

const Options = {
  default: 'default',
  numberPad: 'number-pad',
  decimalPad: 'decimal-pad',
  numeric: 'numeric',
  emailAddress: 'email-address',
  phonePad: 'phonePad'
}

SearchFieldStories.add('Basic Animated Search Filed', () => {
  let refSearchField: any
  return (
    <>
      <SearchField
        placeholderTxt={text('placeholderTxt', 'Search here ...')}
        ref={(ref: any) => (refSearchField = ref)}
        onTextChange={action('Function to be called on text change')}
      />
      {/* <CustomButton
        btnSize='medium'
        btnStyle={{ marginVertical: 40 }}
        title='Toggle Field'
        onPress={() => refSearchField.toggleAnimation()}
      /> */}
    </>
  )
})

SearchFieldStories.add('Animated Search Filed other props', () => {
  let refSearchField: any
  return (
    <>
      <SearchField
        placeholderTxt={text('placeholderTxt', 'Search here ...')}
        cancelText={text('cancelText', 'Cancel')}
        ref={(ref: any) => (refSearchField = ref)}
        onTextChange={action('Function to be called on text change')}
        searchOnSubmit={action('Function to call on submit of keyboard')}
        clearSearchResult={action('Clear Search result')}
        onCancel={action('Function to call on cacel click')}
        maxLength={number('maxLength', 50)}
        keyboardType={select('keyboardType', Options, 'default', 'keyboardType')}
        animatedContainerStyle={object('animatedContainerStyle', {})}
        cancelTextStyle={object('cancelTextStyle', {})}
        cancelAreaStyle={object('cancelTextStyle', {})}
        searchAreaStyle={object('searchAreaStyle', {})}
        txtContainerStyle={object('txtContainerStyle', {})}
      />
      <CustomButton
        btnSize='medium'
        btnStyle={{ marginVertical: 40 }}
        title='Toggle Field'
        onPress={() => refSearchField.toggleAnimation()}
      />
    </>
  )
})
