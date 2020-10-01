import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../Theme/Colors'
import { spacing } from '../Theme/Constants'

//Add proper type for navigation prop
const HomeScreen = ({ navigation }: any) => (
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
    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ButtonsDemo')}>
      <Text>Button Component</Text>
    </TouchableOpacity>
  </View>
)
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
