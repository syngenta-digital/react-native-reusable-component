/**
 * 
 * PhoneTextField support Country code and phone number
 * user can select Country from picker view and enter upto Max limit of number 
 *
 * Use Case 
 *  
 * <View style={{ flexDirection: 'row', borderColor: colors.grey20, alignContent: 'center' }}>
        <PhoneNumberInput
          validPhoneCallback={phoneNumberCallback}
          phone_number={'+20 888 888 6754'}
          successColor={colors.green70}
          inputTextColor={colors.blue50}
          errorColor={colors.grey40}
        />
      </View>
 * 
 *  @param validPhoneCallback 
 * validPhoneCallback function is callback it return two values (boolean value is phone is valid or not, and phone number entered by user)
 *  
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { colors } from '../../Theme/Colors'
import CountryPicker from './CountryPicker'
import Countries from './Countries'

const PHONE_NUMBER_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
let PHONE_NUMBER_LENGTH = 14

interface PhoneNumberInputProps {
  validPhoneCallback: any // callback
  phone_number?: any // + country_code xxx xxx xxxx
  defaultCountryCode?: string // IN
  inputFieldPlaceholder?: string
  labelText?: string
  errorLabelText?: string
  phoneNumberLength?: number
  successColor?: string
  errorColor?: string
  inputTextColor?: string
}

interface PhoneNumberInputState {
  phoneNumber: any
  countryCode: any
  dialCode: any
  hasFocus: boolean
  pickerData: any
  flag: any
  validCountry: any
  validPhone: any
  defaultCountryCode: string
  inputFieldPlaceholder: string
}

export default class PhoneNumberInput extends Component<PhoneNumberInputProps, PhoneNumberInputState> {
  myCountryPicker: any
  constructor(props: PhoneNumberInputProps) {
    super(props)
    let { phone_number, defaultCountryCode, inputFieldPlaceholder, phoneNumberLength } = this.props
    let countryCode = ''
    let phoneNumber = ''
    let dialCode = ''
    let defaultCountry = 'IN'

    phoneNumberLength && (PHONE_NUMBER_LENGTH = phoneNumberLength)

    if (phone_number) {
      dialCode = phone_number.trim().split(' ')[0]
      phoneNumber = phone_number.trim().replace(dialCode, '').trim()
    }

    defaultCountryCode && (defaultCountry = defaultCountryCode)

    countryCode = dialCode !== undefined && dialCode !== '' ? this.getIsoCOde(dialCode, defaultCountry) : defaultCountry
    let country = this.getCountryFromList(countryCode)

    this.state = {
      validCountry: true,
      validPhone: true,
      phoneNumber: phoneNumber,
      countryCode: countryCode, //IN
      flag: country ? country.flag : '🏳️', //flag
      dialCode: country ? country.dialCode : dialCode, //+91
      hasFocus: false,
      pickerData: [],
      defaultCountryCode: defaultCountry,
      inputFieldPlaceholder: inputFieldPlaceholder ? inputFieldPlaceholder : 'Phone Number'
    }
  }

  updateInfo = (text: any) => {
    text = text.replace(/[^0-9 ]/g, '').trim()
    let strText = text
    this.setState(
      {
        validPhone: strText.trim().length === 0 || strText.replace(/ /g, '').length < 6 ? false : true,
        phoneNumber: text
      },
      () => {
        this.props.validPhoneCallback(
          this.state.validCountry && this.state.validPhone,
          this.state.dialCode + ' ' + this.state.phoneNumber
        )
      }
    )
  }

  getIsoCOde = (countryCode: any, defaultCountry: string) => {
    console.log(this.state)
    let obj = Countries.find(country => country.dialCode === countryCode.toString()) as any
    if (obj !== undefined) return obj.code
    else return defaultCountry
  }

  onPressFlag = () => {
    this.myCountryPicker.showModal()
  }

  selectCountry = (country: any, dialCodeText?: any) => {
    this.setState(
      {
        dialCode: country ? country.dialCode : dialCodeText,
        countryCode: country ? country.code : 'UNKNOWN',
        flag: country ? country.flag : '🏳️'
      },
      () => {
        this.props.validPhoneCallback(
          this.state.validCountry && this.state.validPhone,
          this.state.dialCode + ' ' + this.state.phoneNumber
        )
      }
    )
  }

  setFocus = (hasFocus: boolean) => {
    this.setState({ hasFocus })
  }

  getCountryFromList = (countryCode: any) => {
    return Countries.find((country: any) => country.code === countryCode)
  }

  getCountryFromDialCodeList = (dialCode: any) => {
    return Countries.find((country: any) => {
      return country.dialCode == dialCode
    })
  }

  render() {
    const { validCountry, validPhone } = this.state
    const { errorLabelText, labelText, inputTextColor, errorColor, successColor } = this.props

    let topLabelText = labelText ? labelText : this.state.inputFieldPlaceholder
    const errorMessageText = errorLabelText ? errorLabelText : 'Invalid phone number'

    const successBorderColor = { borderColor: successColor ? successColor : colors.blue50 }
    const errorBorderColor = { borderColor: errorColor ? errorColor : colors.red50 }

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.labelTextStyle}>{topLabelText}</Text>
        <View
          style={
            this.state.hasFocus
              ? validCountry && validPhone
                ? [styles.container, successBorderColor]
                : [styles.container, errorBorderColor]
              : validCountry && validPhone
              ? [styles.container, styles.inputStyleColor]
              : [styles.container, errorBorderColor]
          }>
          <View style={styles.flagView}>
            <TouchableOpacity style={styles.openDialogView} onPress={() => this.onPressFlag()}>
              <Text style={styles.flagStyle}>{this.state.flag}</Text>
              <Text style={styles.verticalSeparator} />
              <TextInput
                style={[styles.countryCodeField, { color: inputTextColor ? inputTextColor : colors.blue50 }]}
                value={
                  this.state.dialCode.includes('+')
                    ? '+' + this.state.dialCode.replace('+', '')
                    : '+' + this.state.dialCode
                }
                placeholder={this.state.dialCode}
                keyboardType='phone-pad'
                maxLength={5}
                onChangeText={text => {
                  text = text.replace(/[^+0-9 ]/g, '').trim()
                  let dialCode = text
                  let country = this.getCountryFromDialCodeList(dialCode)

                  let validate = text
                  validate = validate.replace('+', '')

                  this.setState(
                    {
                      dialCode: dialCode,
                      validCountry: validate.trim().length === 0 ? false : true,
                      countryCode: country ? country.code : 'UNKNOWN',
                      flag: country ? country.flag : '🏳️'
                    },
                    () => {
                      this.props.validPhoneCallback(
                        this.state.validCountry && this.state.validPhone,
                        this.state.dialCode + ' ' + this.state.phoneNumber
                      )
                    }
                  )
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.numberView}>
            <Text style={styles.verticalSeparator} />
            <TextInput
              style={[styles.phoneTextfield, { color: inputTextColor ? inputTextColor : colors.blue50 }]}
              keyboardType='number-pad'
              placeholder={this.state.inputFieldPlaceholder}
              autoCorrect={false}
              secureTextEntry={false}
              maxLength={PHONE_NUMBER_LENGTH}
              value={this.state.phoneNumber}
              onChangeText={phoneNumber => {
                let match = phoneNumber.match(PHONE_NUMBER_REGEX)
                let number = phoneNumber
                if (match) {
                  number = [match[1], ' ', match[2], ' ', match[3]].join('')
                }
                this.updateInfo(number)
              }}
              onFocus={() => {
                this.setFocus(true)
              }}
              onBlur={() => {
                this.setFocus(false)
              }}
            />
          </View>
          <CountryPicker
            ref={(ref: any) => {
              this.myCountryPicker = ref
            }}
            onCountryChange={this.selectCountry}
          />
        </View>
        {!validCountry || !validPhone ? (
          <View style={styles.errorViewStyle}>
            <Text style={[styles.errorLabelStyle, { color: errorColor ? errorColor : colors.red50 }]}>
              {'❗️' + errorMessageText}
            </Text>
          </View>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    height: 48
  },
  labelTextStyle: {
    paddingLeft: 6,
    marginBottom: 6,
    color: colors.grey50
  },

  flagStyle: {
    width: '50%',
    textAlign: 'center',
    fontSize: 28
  },
  errorViewStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginVertical: 3
  },
  imagesView: {
    alignSelf: 'center',
    paddingRight: 4
  },
  image: {
    height: 16,
    width: 16
  },
  errorLabelStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    fontSize: 12,
    color: colors.red50
  },
  inputStyleColor: {
    borderColor: colors.grey20
  },

  openDialogView: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  flagView: {
    width: '35%',
    height: 40
  },
  numberView: { width: '65%', height: 40, flexDirection: 'row' },
  verticalSeparator: { height: '100%', width: 1, backgroundColor: colors.grey20 },
  countryCodeField: { width: '50%', textAlign: 'center', fontSize: 16, color: colors.blue50 },
  phoneTextfield: { marginLeft: 5, width: '100%', height: '100%', fontSize: 16, color: colors.blue50 }
})
