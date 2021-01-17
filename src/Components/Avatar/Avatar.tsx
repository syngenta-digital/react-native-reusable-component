import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, ViewStyle } from 'react-native'

import { SIZES } from '../../Assets/Font'
import { colors } from '../../Theme/Colors'
import { fonts } from '../../Theme/Fonts'

interface AvatarProp {
  text?: string
  onPress?: () => void
  style?: ViewStyle
  source?: any //Find proper type
  shape?: 'circle' | 'square' //To be implemented
  size?: 'large' | 'small' | 'default' | number //To be implemented
}

const Avatar = ({ text, source, style, onPress }: AvatarProp) => (
  <TouchableOpacity onPress={onPress} style={[styles.avatarStyle, style]}>
    {source ? (
      <Image
        style={styles.image}
        source={source}
        resizeMode={'cover'} // <- needs to be "cover" for borderRadius to take effect on Android
      />
    ) : (
      <Text style={[fonts.h3]}>{text}</Text>
    )}
  </TouchableOpacity>
)
export default Avatar

const styles = StyleSheet.create({
  avatarStyle: {
    height: SIZES(64),
    width: SIZES(64),
    borderRadius: SIZES(32),
    backgroundColor: colors.grey20,
    borderWidth: 1,
    borderColor: colors.grey30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: SIZES(64),
    width: SIZES(64),
    borderRadius: SIZES(32),
    borderWidth: 1,
    borderColor: colors.grey30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
