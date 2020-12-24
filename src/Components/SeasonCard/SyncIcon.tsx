import React, { useState } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { colors } from '../../Theme/Colors'

interface props {
  syncStatus: string
}

const RenderSyncIcon = ({ syncStatus }: props) => {
  const [isSyncMsgVisible, setSyncVisibility] = useState(false)
  if (syncStatus && syncStatus !== 'none') {
    return (
      <TouchableOpacity
        onPress={() => {
          setSyncVisibility(!isSyncMsgVisible)
        }}
        style={[
          SeasonCardStyles.statusView,
          {
            backgroundColor:
              syncStatus === 'success' ? colors.green : syncStatus === 'error' ? colors.damageRed : colors.yellow
          }
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
    alignSelf: 'flex-start'
  }
})
