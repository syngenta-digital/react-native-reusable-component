import React from 'react'
import { View, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../Theme/Colors'
import { sizes } from '../../Theme/Constants'

interface Props {
  onPress?: () => void
  style?: ViewStyle
  children: React.ReactNode[] | React.ReactNode
}

const Card = ({ onPress, children }: Props) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View>{children}</View>
  </TouchableOpacity>
)
export default Card

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: sizes.cardRadius,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
