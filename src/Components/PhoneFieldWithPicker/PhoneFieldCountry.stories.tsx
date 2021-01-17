import React from 'react'
import { StyleSheet } from 'react-native'

import CountryPicker from './CountryPicker'
import PhoneNumberInput from './PhoneNumberInput'
import CustomButton from '../Button/Button'
import CenterView from '../CenterView'

import { boolean, color, number, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { colors } from '../../Theme/Colors'

const phoneNoWithCountryPickerStories = storiesOf('Phone No and Country Picker', module)
phoneNoWithCountryPickerStories.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

phoneNoWithCountryPickerStories.add('Phone Number Field with Country Picker', () => (
  <PhoneNumberInput
    inputFieldPlaceholder={text('inputFieldPlaceholder', 'Enter Phone Number')}
    labelText={text('labelText', 'Phone Number')}
    errorLabelText={text('errorLabelText', 'Invalid Phone Number')}
    phoneNumberLength={number('phoneNumberLength', 11)}
    validPhoneCallback={action('Returns is_valid_phone and phone no value')}
    phone_number={text('phone_number', '+91 888 888 6754')}
    defaultCountryCode={text('defaultCountryCode', 'IN')}
    successColor={color('successColor', colors.green70)}
    inputTextColor={color('inputTextColor', colors.blue50)}
    errorColor={color('errorColor', colors.grey40)}
  />
))
let myCountryPicker: any

phoneNoWithCountryPickerStories.add('Country Picker', () => (
  <>
    <CountryPicker
      defaultCountry={object('defaultCountry', {
        name: 'India',
        flag: '🇮🇳',
        code: 'IN',
        dialCode: '+91',
        mask: '999999 99999'
      })}
      disableCountryChange={boolean('disableCountryChange', false)}
      textFieldPlaceholder={text('textFieldPlaceholder', 'Search Country Here...')}
      closeButtonTitle={text('closeButtonTitle', 'Dismiss')}
      onChangeText={action('Search text to search country')}
      modalContainer={object('modalContainer', styles.pickerStyle)}
      countryModalStyle={object('countryModalStyle', {})}
      modalFlagStyle={object('modalFlagStyle', {})}
      modalCountryItemCountryNameStyle={object('modalCountryItemCountryNameStyle', {})}
      modalCountryItemCountryDialCodeStyle={object('modalCountryItemCountryDialCodeStyle', {})}
      ref={(ref: any) => {
        myCountryPicker = ref
      }}
      onCountryChange={action('returns selected country')}
    />

    <CustomButton
      title={text('title', 'Show Picker')}
      borderStyle={styles.borderButton}
      shadowButton={boolean('shadowButton', true)}
      onPress={() => myCountryPicker?.showModal()}
    />
  </>
))

const styles = StyleSheet.create({
  pickerStyle: { width: '100%', justifyContent: 'center' },
  borderButton: { borderColor: 'darkgreen', borderWidth: 2 }
})
