import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

export default function CenterView({ children, childrenStyle }: any) {
  return <View style={[styles.main, childrenStyle]}>{children}</View>
}

CenterView.defaultProps = {
  children: <View />
}

CenterView.propTypes = {
  children: PropTypes.node
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 50,
    marginTop: 100
  }
})
