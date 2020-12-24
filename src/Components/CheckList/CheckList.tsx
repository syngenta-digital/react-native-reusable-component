import React, { useState } from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'

import { colors } from '../../Theme/Colors'

import CheckBox from '@react-native-community/checkbox'

interface CheckboxList {
  array: Array<any>
  elementStyle?: any
  labelStyle?: any
  checkboxStyle?: any
  rightSideText?: boolean
}

const CheckboxList = ({ ...props }: CheckboxList) => {
  const [list, setSelection] = useState(props.array)
  let { elementStyle, labelStyle, checkboxStyle, rightSideText } = props
  return (
    <FlatList
      data={list}
      renderItem={(item: any) => {
        item = item?.item
        return (
          <View style={[styles.checkboxContainer, elementStyle]}>
            {!rightSideText && <Text style={[styles.label, labelStyle]}>{item?.title}</Text>}
            <CheckBox
              disabled={item?.disabledClick}
              value={item?.isSelected}
              onValueChange={newValue => {
                setSelection(
                  list.map((el: { title: any }) => (el.title === item?.title ? { ...el, isSelected: newValue } : el))
                )
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
    flex: 1,
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
