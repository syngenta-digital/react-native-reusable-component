import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'

import { AlertType } from '../Components/Alert/AlertComponent'
import AlertView from '../Components/Alert/AlertView'

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
    NetworkStatus.sharedInstance.initiateNetworkListener()
    fetchNetStateFromFetch()
    NetworkStatus.sharedInstance.sendConnectionStatus = (state: any) => {
      setNetState(state)
    }
    return () => {
      NetworkStatus.sharedInstance.unsubscribeNetworkListener()
    }
  }, [])

  const text = (value: string) => <Text>{value}</Text>

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
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
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PhoneFieldWithCountryPickerDemo')}>
        <Text>Country Picker Component</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ToastDemo')}>
        <Text>Toast Component</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ButtonsDemo')}>
        <Text>Button Component</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ListViewDemo')}>
        <Text>List View Component</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SliderDemo')}>
        {text('Animated Area Component')}
      </TouchableOpacity>
      {/**Show Simple Alert */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          AlertView.show(
            'Simple alert Message',
            AlertType.NONE,
            'Thanks',
            'Error Title optional',
            'Success Title Optional'
          )
        }>
        <Text>Show Simple Alert</Text>
      </TouchableOpacity>
      {/**Show Network connection */}
      {netState && (
        <Text style={{ backgroundColor: netState.isConnected ? 'green' : 'red' }}>
          Network Type {netState.type} Connection {netState.isConnected.toString()}
        </Text>
      )}
    </ScrollView>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    minWidth: 150,
    minHeight: 50,
    marginVertical: spacing.space16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cropwise_green
  },
  title: {
    textAlign: 'center'
  }
})
