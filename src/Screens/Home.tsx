import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../Theme/Colors'
import { spacing } from '../Theme/Constants'

//Add proper type for navigation prop
const text = (value: any) => <Text style={styles.title}>{value}</Text>

const HomeScreen = ({ navigation }: any) => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ListViewDemo')}>
      <Text>List View Component</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SliderDemo')}>
      {text('Animated Area Component')}
    </TouchableOpacity>
  </ScrollView>
)
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    width: 150,
    height: 50,
    marginVertical: spacing.space16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cropwise_green
  },
  title: {
    textAlign: 'center'
  }
})
