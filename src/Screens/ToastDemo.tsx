import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Button from '../Components/Button/Button'
import CustomToast from '../Components/Toast/CustomToast'

export default class ToastsDemo extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Button
          title='Small Button'
          btnSize='small'
          shadowButton={true}
          onPress={() => CustomToast.show('This is a toast demo')}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin: 20,
    justifyContent: 'space-between',
    paddingBottom: 60
  }
})
