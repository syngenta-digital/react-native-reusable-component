import React from 'react'
import { ViewStyle, StyleSheet, TouchableOpacity } from 'react-native'

import { colors } from '../../Theme/Colors'
import { spacing } from '../../Theme/Constants'

interface CardProps {
  onPress?: () => void
  style?: ViewStyle
  children: React.ReactNode[] | React.ReactNode
  disabled?: boolean
}

const Card = ({ onPress, children, style, disabled }: CardProps) => (
  <TouchableOpacity disabled={disabled} style={[styles.container, style]} onPress={onPress}>
    <>{children}</>
  </TouchableOpacity>
)
export default Card

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: spacing.space12,
    paddingHorizontal: spacing.space16,
    shadowColor: colors.grey40,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8
  }
})
