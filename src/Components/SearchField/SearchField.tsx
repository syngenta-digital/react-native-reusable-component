import React, { useRef, useState } from 'react'
import { Animated, Easing, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { isTablet } from 'react-native-device-info'

import { SIZES } from '../../Assets/Font'
import { colors } from '../../Theme/Colors'
import { Icon } from '../../Theme/Icon'
import AppStyles from '../../Utility/AppStyles'

interface searchProps {
  searchOnSubmit: (data: any) => void
  clearSearchResult: () => void
  onTextChange: (data: any) => void
  onCancel?: () => void
  maxLength?: number
  keyboardType?: string
  placeholderTxt?: string | ''
  cancelText?: string
  animatedContainerStyle?: any
  searchAreaStyle?: any
  txtContainerStyle?: any
  imagePath?: any
  cancelAreaStyle?: any
  cancelTextStyle?: any
  clearIcon?: any
  inputFieldProps?: any
  ref?: any
}

const SearchField = ({ ...props }: searchProps) => {
  let {
    searchOnSubmit,
    onCancel,
    clearSearchResult,
    onTextChange,
    maxLength,
    inputFieldProps,
    placeholderTxt,
    cancelText,
    animatedContainerStyle,
    searchAreaStyle,
    txtContainerStyle,
    imagePath,
    cancelTextStyle,
    cancelAreaStyle,
    keyboardType,
    clearIcon
  } = props
  const [showValues, setValues] = useState({ searchText: '', activeSearch: true })

  const visibility = useRef(new Animated.Value(1)).current

  const animatedStyle = {
    opacity: visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    }),
    transform: [
      {
        translateX: visibility.interpolate({
          inputRange: [-50, 1],
          outputRange: [150, 0]
        })
      },
      { perspective: 1000 }
    ]
  }

  const toggleAnimation = () => {
    if (showValues.activeSearch) {
      Animated.timing(visibility, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear
      }).start(() => {
        setValues({ activeSearch: false, searchText: '' })
      })
    } else {
      Animated.timing(visibility, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear
      }).start(() => setValues({ activeSearch: true, searchText: '' }))
    }
  }

  return (
    <Animated.View style={[AppStyles.rowDirection, animatedStyle, animatedContainerStyle]}>
      <View style={[styles.searchContainer, styles.border, searchAreaStyle]}>
        <TextInput
          placeholder={placeholderTxt}
          style={[styles.searchTextContainer, txtContainerStyle]}
          onChangeText={value => {
            setValues({ activeSearch: showValues.activeSearch, searchText: value })
            onTextChange(value)
          }}
          contextMenuHidden={true}
          autoCorrect={false}
          value={showValues.searchText}
          maxLength={maxLength}
          keyboardType={keyboardType || 'default'}
          returnKeyLabel='search'
          returnKeyType='search'
          onSubmitEditing={() => searchOnSubmit(showValues.searchText)}
          {...inputFieldProps}
        />
        <TouchableOpacity
          style={styles.clear}
          onPress={() => {
            setValues({ activeSearch: showValues.activeSearch, searchText: '' })
            clearSearchResult()
          }}>
          {imagePath?.name ? (
            <Image source={{ uri: imagePath?.name }} style={[styles.clearSearchIcon, imagePath?.style]} />
          ) : (
            <Icon name={clearIcon?.name} size={20 || clearIcon?.size} color={clearIcon?.color} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.clear, styles.closeSearch, cancelAreaStyle]}
        onPress={() => {
          toggleAnimation()
          if (onCancel) {
            onCancel()
          }
        }}>
        <Text style={[styles.cancelTxt, cancelTextStyle]}>{cancelText}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

SearchField.defaultProps = {
  maxLength: 50,
  placeholderTxt: '',
  cancelText: 'Cancel',
  searchOnSubmit: () => {},
  onTextChange: () => {},
  clearSearchResult: () => {},
  clearIcon: { name: 'times', size: SIZES(20), color: colors.grey60 }
}

export default SearchField

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: isTablet() ? SIZES(55) : SIZES(40),
    flex: isTablet() ? 1 : 0.8,
    alignItems: 'center',
    paddingHorizontal: SIZES(5),
    borderRadius: SIZES(50)
  },
  clear: {
    marginRight: 10,
    height: isTablet() ? SIZES(55) : SIZES(40),
    justifyContent: 'center'
  },
  searchTextContainer: {
    flex: 1,
    height: isTablet() ? SIZES(55) : SIZES(40),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: SIZES(18),
    paddingHorizontal: SIZES(15),
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: colors.grey50,
    borderBottomColor: colors.grey50,
    borderRadius: SIZES(50)
  },
  closeSearch: {
    flex: 0.2,
    height: SIZES(35),
    padding: SIZES(3),
    backgroundColor: 'rgba(211,211,211,0.05)',
    borderRadius: SIZES(25),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  clearSearchIcon: {
    width: '100%',
    height: '100%'
  },
  border: {
    borderWidth: isTablet() ? 1 : 0.5,
    borderColor: colors.grey50
  },
  cancelTxt: {
    fontSize: isTablet() ? SIZES(16) : SIZES(14),
    color: colors.green80,
    alignSelf: 'center'
  }
})
