import React, { useState } from 'react'
import { Text, StyleSheet, View, FlatList, ViewStyle } from 'react-native'

import { colors } from '../../Theme/Colors'

import CheckBox from '@react-native-community/checkbox'

interface CheckboxList {
  array: Array<any>
  elementStyle?: any
  labelStyle?: any
  checkboxStyle?: any
  rightSideText?: boolean
  onClick?: (data?: any) => void
}

interface CheckboxList {
  array: Array<any>
  elementStyle?: any
  labelStyle?: any
  checkboxStyle?: any
  rightSideText?: boolean
  onClick?: (data?: any) => void
}

interface Checkbox {
  item: { title: string; isSelected: boolean }
  disabledClick?: boolean
  rightSideText?: boolean
  elementStyle?: ViewStyle
  onClick?: (data?: any) => void
  labelStyle?: ViewStyle
  checkboxStyle?: any
}

export const Checkbox = ({ ...props }: Checkbox) => {
  const [element, setSelection] = useState(props.item)
  let { disabledClick, checkboxStyle, rightSideText, elementStyle, onClick, labelStyle } = props
  return (
    <View style={[styles.container, elementStyle]}>
      {!rightSideText && <Text style={[styles.label, labelStyle]}>{element?.title}</Text>}
      <CheckBox
        disabled={disabledClick}
        value={element?.isSelected}
        onValueChange={(newValue: any) => {
          setSelection({ title: element.title, isSelected: newValue })
          if (onClick) {
            onClick(element)
          }
        }}
        style={[styles.checkbox, checkboxStyle]}
        tintColors={{ true: checkboxStyle.activeColor, false: checkboxStyle.inactiveColor }}
        {...props}
      />
      {rightSideText && <Text style={[styles.label, labelStyle]}>{element?.title}</Text>}
    </View>
  )
}

Checkbox.defaultProps = {
  checkboxStyle: { activeColor: colors.syngenta_green, inactiveColor: colors.grey90 }
}

const CheckboxList = ({ ...props }: CheckboxList) => {
  const [list, setSelection] = useState(props.array)
  let { elementStyle, labelStyle, checkboxStyle, rightSideText, onClick } = props
  return (
    <FlatList
      data={list}
      renderItem={(item: any) => {
        item = item?.item
        return (
          <View style={[styles.checkboxContainer, styles.container, elementStyle]}>
            {!rightSideText && <Text style={[styles.label, labelStyle]}>{item?.title}</Text>}
            <CheckBox
              disabled={item?.disabledClick}
              value={item?.isSelected}
              onValueChange={(newValue: any) => {
                setSelection(
                  list.map((el: { title: any }) => (el.title === item?.title ? { ...el, isSelected: newValue } : el))
                )
                if (onClick) {
                  onClick(item)
                }
              }}
              style={[styles.checkbox, checkboxStyle]}
              tintColors={{ true: checkboxStyle.activeColor, false: checkboxStyle.inactiveColor }}
              {...props}
            />
            {rightSideText && <Text style={[styles.label, labelStyle]}>{item?.title}</Text>}
          </View>
        )
      }}
      keyExtractor={(item, index: { toString: () => any }) => index.toString()}
      {...props}
    />
  )
}

CheckboxList.defaultProps = {
  checkboxStyle: { activeColor: colors.syngenta_green, inactiveColor: colors.grey90 }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flex: 1
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  checkbox: {
    alignSelf: 'center'
  },
  label: {
    flex: 1,
    color: colors.black,
    fontSize: 16,
    margin: 8
  }
})

export default CheckboxList
