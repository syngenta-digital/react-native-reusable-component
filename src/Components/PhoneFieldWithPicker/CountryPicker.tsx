import React, { Component } from 'react'
import { View, Text, Modal, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { colors } from '../../Theme/Colors'
import { fonts } from '../../Theme/Fonts'
import Countries from './Countries'

interface CountryProps {
  defaultCountry?: any
  disableCountryChange?: any
  onChangeText?: any
  textFieldPlaceholder?: string
  countryModalStyle?: any
  modalContainer?: any
  modalFlagStyle?: any
  modalCountryItemCountryNameStyle?: any
  modalCountryItemCountryDialCodeStyle?: any
  onCountryChange: any
  closeButtonTitle?: string
}

interface CountryState {
  defaultCountry: any
  flag: any
  modalVisible: boolean
  dialCode: any
  phoneNumber: string
  mask: any
  countryData: any
  closeButtonTitle: string
}
export default class CountryPicker extends Component<CountryProps, CountryState> {
  constructor(props: CountryProps) {
    super(props)

    const defaultCountry =
      Countries.filter((country_item: any) => country_item.code === props.defaultCountry)[0] ||
      Countries.filter(country_item => country_item.code === 'TR')[0]

    this.state = {
      defaultCountry,
      flag: defaultCountry.flag,
      modalVisible: false,
      dialCode: defaultCountry.dialCode,
      phoneNumber: '',
      mask: defaultCountry.mask,
      countryData: Countries,
      closeButtonTitle: this.props.closeButtonTitle ? this.props.closeButtonTitle : 'Dismiss'
    }
  }

  showModal = () => (this.props.disableCountryChange ? null : this.setState({ modalVisible: true }))

  hideModal = () => {
    this.setState({
      modalVisible: false,
      countryData: Countries
    })
  }

  onCountryChange = (item: any) => {
    const countryData = Countries
    try {
      const country = countryData.filter((country_item: any) => country_item.name === item.name)[0]
      this.setState({
        dialCode: country.dialCode,
        flag: country.flag,
        mask: country.mask,
        phoneNumber: ''
      })
      this.props.onCountryChange(country)
      this.hideModal()
    } catch (err) {
      const defaultCountry = this.state.defaultCountry
      this.setState({
        dialCode: defaultCountry.dialCode,
        flag: defaultCountry.flag,
        mask: defaultCountry.mask,
        phoneNumber: ''
      })
    }
  }

  filterCountries = (value: string) => {
    const countryData = Countries.filter(
      (country_item: any) =>
        country_item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 || country_item.dialCode.indexOf(value) > -1
    )
    this.setState({ countryData })
  }

  listSeparator = () => {
    return <View style={styles.listSeparator} />
  }

  render() {
    const {
      countryModalStyle,
      modalContainer,
      modalFlagStyle,
      modalCountryItemCountryNameStyle,
      modalCountryItemCountryDialCodeStyle,
      children
    } = this.props

    return (
      <Modal animationType='slide' transparent={true} visible={this.state.modalVisible}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={[styles.modalContainer, modalContainer]}>
            <View style={styles.filterInputStyleContainer}>
              <TextInput
                onChangeText={this.filterCountries}
                placeholder={this.props?.textFieldPlaceholder || 'Search Country'}
                style={styles.countryModalStyle}
              />
            </View>
            <FlatList
              data={this.state.countryData}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.listSeparator}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.onCountryChange(item)}>
                  <View style={[styles.countryModalStyle, countryModalStyle]}>
                    <Text style={[styles.modalFlagStyle, modalFlagStyle]}>{item.flag}</Text>
                    <View style={styles.modalCountryItemContainer}>
                      <Text style={[styles.modalCountryItemCountryNameStyle, modalCountryItemCountryNameStyle]}>
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          styles.modalCountryItemCountryDialCodeStyle,
                          modalCountryItemCountryDialCodeStyle
                        ]}>{`  ${item.dialCode}`}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            <View style={styles.bottomButtonContainer}>
              {children ? (
                children
              ) : (
                <TouchableOpacity
                  style={[styles.buttonStyle, { backgroundColor: colors.blue30 }]}
                  onPress={() => this.hideModal()}>
                  <Text>{this.state.closeButtonTitle}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalCountryItemCountryDialCodeStyle: {
    ...fonts.h4
  },
  modalCountryItemCountryNameStyle: {
    flex: 1,
    paddingHorizontal: 10,
    ...fonts.h4
  },
  modalCountryItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row'
  },
  modalFlagStyle: {
    fontSize: 25
  },
  safeAreaContainer: { flex: 1, backgroundColor: colors.blackOpacity2 },
  modalContainer: {
    paddingTop: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: '75%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  bottomButtonContainer: { width: '80%', alignSelf: 'center', paddingVertical: 15 },
  countryModalStyle: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  filterInputStyleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  phoneInputStyle: {
    flex: 1,
    borderColor: '#0000',
    ...fonts.h4
  },

  buttonStyle: {
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3
  },
  listSeparator: { height: 2, backgroundColor: colors.grey40, width: '100%' }
})
