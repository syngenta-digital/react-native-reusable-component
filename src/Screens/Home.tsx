import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../Theme/Colors'
import { spacing } from '../Theme/Constants'
import NetworkStatus from '../Utility/NetState'

//Add proper type for navigation prop
const HomeScreen = ({ navigation }: any) => {
  const [netState, setNetState] = useState()

  const fetchNetStateFromFetch = async () => {
    let resp = await NetworkStatus.sharedInstance.checkFetchStatus()
    console.log('return call', resp)
  }

  useEffect(() => {
    console.log('use Effect')
    NetworkStatus.sharedInstance.initiateNetworkListener()
    fetchNetStateFromFetch()
    NetworkStatus.sharedInstance.sendConnectionStatus = (state: any) => {
      setNetState(state)
    }
    return () => {
      console.log('return call')
      NetworkStatus.sharedInstance.unsubscribeNetworkListener()
    }
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ColorDemo')}>
        <Text>Color System</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CardDemo')}>
        <Text>Card Component</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AvatarDemo')}>
        <Text>Avatar Component</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('LoaderDemo')}>
        <Text>Loader Component</Text>
      </TouchableOpacity>

      {netState && (
        <Text>
          Network Type {netState.type} Connection {netState.isConnected.toString()}
        </Text>
      )}
    </View>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  btn: {
    width: 150,
    height: 50,
    marginVertical: spacing.space16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cropwise_green
  }
})
