import React from 'react'
import { StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import Button from '../Components/Button/Button'
// import CustomToast from '../Components/Toast/CustomToast'

const ToastDemo = () => (
  <>
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title='Toast Demo Button'
        btnSize='small'
        shadowButton={true}
        onPress={() => {
          ToastAndroid.show('This is a sample toast demo', 100)
        }}
      />
    </ScrollView>
  </>
)

export default ToastDemo

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin: 20,
    justifyContent: 'space-between',
    paddingBottom: 60
  }
})
