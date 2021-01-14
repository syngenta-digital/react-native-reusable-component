import React from 'react'
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native'
import { colors } from '../../Theme/Colors'
import { Icon } from '../../Theme/Icon'

interface props {
  syncStatus: string
  onPress?: () => void
  containerStyle?: ViewStyle
}

const RenderSyncIcon = ({ syncStatus, onPress, containerStyle }: props) => {
  if (syncStatus && syncStatus !== 'none') {
    return (
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
        style={[
          SeasonCardStyles.statusView,
          {
            backgroundColor:
              syncStatus === 'success' ? colors.green : syncStatus === 'error' ? colors.damageRed : colors.yellow
          },
          containerStyle
        ]}>
        <Icon
          name={syncStatus === 'success' ? 'check' : 'syncError'}
          size={syncStatus === 'success' ? 12 : 20}
          color={colors.white}
        />
      </TouchableOpacity>
    )
  }
  return <View />
}

export default RenderSyncIcon

const SeasonCardStyles = StyleSheet.create({
  statusView: {
    height: 30,
    width: 30,
    backgroundColor: colors.green,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})
