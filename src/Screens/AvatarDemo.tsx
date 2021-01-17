import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Avatar from '../Components/Avatar/Avatar'
import { colors } from '../Theme/Colors'
import { spacing } from '../Theme/Constants'

const AvatarDemo = () => (
  <View style={styles.container}>
    <Avatar
      style={styles.avatarStyle}
      source={{
        uri: 'http://bootstrap.gallery/everest-v3/img/user7.jpg'
      }}
    />

    <Avatar style={styles.avatarStyle} text='AK' onPress={() => Alert.alert('AK')} />

    <Avatar
      style={styles.avatarStyle}
      source={{
        uri: 'https://rb.gy/overpp'
      }}
    />
  </View>
)
export default AvatarDemo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white
  },
  avatarStyle: {
    marginVertical: spacing.space16
  }
})
