import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AlertType } from '../Components/Alert/AlertComponent'
import AlertView from '../Components/Alert/AlertView'
import Button from '../Components/Button/Button'
import CountryPicker from '../Components/PhoneFieldWithPicker/CountryPicker'
import PhoneNumberInput from '../Components/PhoneFieldWithPicker/PhoneNumberInput'

import { colors } from '../Theme/Colors'
import { spacing } from '../Theme/Constants'

const PhoneFieldWithCountryPickerDemo = () => {
  const selectCountry = (country: any, dialCodeText?: any) => {
    console.log('Selected Country', country, 'dialCode', dialCodeText)
    AlertView.show(JSON.stringify(country), AlertType.SUCCESS, 'Thanks', 'Error Title optional', 'Country Name')
  }

  const phoneNumberCallback = (is_valid_phone: boolean, phone_number: string) => {
    console.log(is_valid_phone, phone_number)
  }

  let myCountryPicker: any
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => myCountryPicker && myCountryPicker.showModal()}>
        <Text>Open Picker</Text>
      </TouchableOpacity>
      <View style={styles.phoneViewContainer}>
        <PhoneNumberInput
          validPhoneCallback={phoneNumberCallback}
          phone_number={'+20 888 888 6754'}
          successColor={colors.green70}
          inputTextColor={colors.blue50}
          errorColor={colors.grey40}
        />
      </View>
      <CountryPicker
        modalContainer={styles.pickerStyle}
        ref={(ref: any) => {
          myCountryPicker = ref
        }}
        onCountryChange={selectCountry}>
        <Button
          title='Close'
          borderStyle={styles.borderButton}
          shadowButton={true}
          onPress={() => myCountryPicker && myCountryPicker.hideModal()}
        />
      </CountryPicker>
    </View>
  )
}
export default PhoneFieldWithCountryPickerDemo

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: '4%',
    flexDirection: 'column',
    flex: 1
  },
  btn: {
    width: 150,
    height: 50,
    marginVertical: spacing.space16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cropwise_green
  },
  pickerStyle: { width: '100%', justifyContent: 'center' },
  borderButton: { borderColor: 'darkgreen', borderWidth: 2 },
  phoneViewContainer: { flexDirection: 'row', borderColor: colors.grey20, alignContent: 'center' }
})
