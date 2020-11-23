import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { colors } from '../../Theme/Colors'
import PropTypes from 'prop-types'

interface Props {
  start: string
  onPress?: any
  end: string
  disabled?: boolean
  container?: object
  dateViewStyle?: object
  titleStyle?: object
  dash?: object
  borderStyle?: object
  iconViewStyle?: object
  iconName?: string
  iconSize?: number
  iconColor?: string
}

const DateView = ({ ...props }) => (
  <TouchableOpacity
    disabled={props.disabled}
    onPress={() => {
      props.onPress()
    }}
    style={[styles.dateRangeView, props.container, props.borderStyle]}>
    <View style={[styles.calendarButton, props.dateViewStyle]}>
      <Text style={[styles.dateTitle, props.titleStyle]}>{props.start}</Text>
      <View style={[styles.thinLine, props.dash]} />
      <Text style={[styles.dateTitle, props.titleStyle]}>{props.end}</Text>
    </View>
    <View style={[styles.calendarIcon, props.iconViewStyle]}>
      <Icon name={props.iconName} size={props.iconSize} color={props.iconColor} />
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
    height: '12%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  calendarButton: {
    minWidth: '78%',
    marginLeft: '6%',
    height: '50%',
    borderColor: colors.grey40,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.grey20
  },
  calendarIcon: {
    width: '15%',
    height: '50%',
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
