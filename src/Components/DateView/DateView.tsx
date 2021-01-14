import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import { colors } from '../../Theme/Colors'

import PropTypes from 'prop-types'
import { SIZES } from '../../Assets/Font'
import { Icon } from '../../Theme/Icon'

interface Props {
  start: string
  onPress?: any
  end: string
  disabled?: boolean
  containerStyle?: object
  dateViewStyle?: object
  titleStyle?: object
  dashStyle?: object
  iconViewStyle?: object
  iconName?: string
  iconSize?: number
  iconColor?: string
}

const DateView = ({ ...props }: Props) => (
  <TouchableOpacity
    disabled={props.disabled}
    onPress={() => {
      props.onPress()
    }}
    style={[styles.dateRangeView, props.containerStyle]}>
    <View style={[styles.calendarButton, props.dateViewStyle]}>
      <Text style={[styles.dateTitle, props.titleStyle]}>{props.start}</Text>
      <View style={[styles.thinLine, props.dashStyle]} />
      <Text style={[styles.dateTitle, props.titleStyle]}>{props.end}</Text>
    </View>
    <View style={[styles.calendarIcon, props.iconViewStyle]}>
      {props.iconName && <Icon name={props.iconName} size={props.iconSize} color={props.iconColor} />}
    </View>
  </TouchableOpacity>
)

export default DateView

DateView.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired
}
DateView.defaultProps = {
  start: 'Start Date',
  end: 'End Date',
  iconName: 'calendar',
  iconSize: 30,
  disabled: false,
  iconColor: colors.grey30
}

const styles = StyleSheet.create({
  dateRangeView: {
    height: SIZES(50),
    alignItems: 'center',
    flexDirection: 'row'
  },
  calendarButton: {
    flex: 1,
    height: '90%',
    borderColor: colors.grey40,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.grey20
  },
  calendarIcon: {
    minWidth: '15%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateTitle: {
    fontSize: 16,
    color: colors.blue50
  },
  thinLine: {
    width: 10,
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: colors.grey90
  }
})
