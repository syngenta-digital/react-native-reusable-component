import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
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

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '90%' }}>
        <ScrollView style={{ flex: 1, bottom: 20 }} contentContainerStyle={{ alignItems: 'center' }}>
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

          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ButtonsDemo')}>
            <Text>Button Component</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ListViewDemo')}>
            <Text>List View Component</Text>
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
      </View>
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
