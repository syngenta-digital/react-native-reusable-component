import React from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import AppLoader from '../Components/Loader/loader'
import { colors } from '../Theme/Colors'
import { spacing } from '../Theme/Constants'
import { fonts } from '../Theme/Fonts'

const LoaderDemo = () => (
  <View style={styles.container}>
    <Text style={[fonts.h2SemiBold, { alignSelf: 'center', padding: 100 }]}>Loader Demo</Text>
    <AppLoader showLoader={true} loaderText={'Loading'} />
  </View>
)
export default LoaderDemo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grey10,
    paddingHorizontal: spacing.space12
  },
  cardStyle: {
    marginVertical: spacing.space24
  },
  card2Style: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    marginLeft: spacing.space16
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
