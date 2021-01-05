import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Card from '../Card/Card'

import { colors } from '../../Theme/Colors'
import { SIZES } from '../../Assets/Font'
import AppStyles from '../../Utility/AppStyles'
import { Icon } from '../../Theme/Icon'

interface FieldCardProps {
  syncError?: any
  syncErrorText?: string
  errorDescription?: string
  errorNavigation: () => void
  field: any
  subtitle?: string
  noBoundaryAlertText?: string
  children?: React.ReactNode
  leftIconViewStyle?: any
  containerStyle?: any
  fieldDetailsStyle?: any
  errorViewStyle?: any
  fieldTitleStyle?: any
  subTitleStyle?: any
  boundryDescStyle?: any
  actionAreaStyle?: any
}

const FieldCard = ({
  syncError,
  syncErrorText,
  errorNavigation,
  errorDescription,
  field,
  subtitle,
  children,
  noBoundaryAlertText,
  containerStyle,
  leftIconViewStyle,
  fieldDetailsStyle,
  errorViewStyle,
  fieldTitleStyle,
  subTitleStyle,
  boundryDescStyle,
  actionAreaStyle
}: FieldCardProps) => (
  <Card style={Object.assign(styles.cardStyle, containerStyle)}>
    <View style={[styles.fieldIconView, leftIconViewStyle]}>
      <Icon name='location' color={colors.blue} size={SIZES(20)} />
    </View>
    <View style={[styles.detailView, fieldDetailsStyle]}>
      {syncError && syncError.length && (
        <TouchableOpacity style={[AppStyles.rowDirection, errorViewStyle]} onPress={() => errorNavigation()}>
          <Text numberOfLines={1} style={styles.errorText}>
            {syncErrorText}: {errorDescription}
          </Text>
          <Icon name='indicationRight' size={SIZES(14)} color={colors.baseRed} />
        </TouchableOpacity>
      )}
      <Text numberOfLines={1} style={[styles.titleText, fieldTitleStyle]}>
        {field.name}
      </Text>
      <Text numberOfLines={2} style={[styles.subTitleText, subTitleStyle]}>
        {subtitle}
        {!field.geometry && (
          <Text numberOfLines={2} style={[styles.textView, boundryDescStyle]}>
            {'  (' + noBoundaryAlertText + ')'}
          </Text>
        )}
      </Text>
    </View>
    <View style={[styles.actionView, AppStyles.alignCenter, actionAreaStyle]}>{children}</View>
  </Card>
)

FieldCard.defaultProps = {
  errorNavigation: () => {},
  field: {},
  noBoundaryAlertText: 'No Boundary Added'
}

export default FieldCard

const styles = StyleSheet.create({
  cardStyle: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: SIZES(80),
    maxHeight: SIZES(90),
    flexDirection: 'row',
    alignItems: 'center'
  },
  fieldIconView: {
    width: SIZES(50),
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: colors.blue10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailView: {
    flex: 1,
    paddingVertical: SIZES(15),
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actionView: {
    flex: 0.2,
    height: '100%'
  },
  errorText: {
    flex: 1,
    fontSize: SIZES(14),
    paddingBottom: '2%',
    marginHorizontal: 14,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: colors.baseRed
  },
  titleText: {
    fontSize: SIZES(16),
    marginLeft: SIZES(12),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: colors.gray1
  },
  subTitleText: {
    fontSize: SIZES(14),
    marginLeft: SIZES(12),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: colors.gray3
  },
  textView: {
    color: colors.baseRed,
    fontSize: SIZES(14)
  }
})
