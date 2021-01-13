import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SIZES } from '../../Assets/Font'
import { colors } from '../../Theme/Colors'

interface Props {
  syncStatus: string
  errorInRequest?: any
  isVisible: boolean
  viewMoreErrors?: any
  viewMore?: string
  syncMsgText: string
}

const renderSyncDetails = ({ syncStatus, errorInRequest, viewMore, viewMoreErrors, syncMsgText, isVisible }: Props) => {
  if (isVisible && syncStatus === 'error') {
    return (
      <View style={styles.syncMsgView}>
        <View style={[styles.triangle]} />
        {errorInRequest &&
          errorInRequest.slice(0, 2).map((item: any, i: number) => (
            <Text style={styles.syncErrorMsg} numberOfLines={1}>
              {(i + 1).toString() + ' ' + item.message}
            </Text>
          ))}
        <TouchableOpacity
          onPress={() => {
            if (viewMoreErrors) {
              viewMoreErrors()
            }
          }}
          style={styles.padding}>
          <Text style={styles.viewMore}>{viewMore}</Text>
        </TouchableOpacity>
      </View>
    )
  } else if (isVisible) {
    return (
      <View style={styles.syncMsgView}>
        <View style={styles.triangle} />
        <Text style={styles.syncMsg}>{syncMsgText}</Text>
      </View>
    )
  }
  return <View />
}

const styles = StyleSheet.create({
  syncMsgView: {
    minHeight: '25%',
    maxHeight: '100%',
    minWidth: '30%',
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    top: 40,
    zIndex: 5,
    right: -5,
    paddingLeft: 12
  },
  syncMsg: {
    color: colors.white,
    top: -7,
    lineHeight: 15
  },
  triangle: {
    height: SIZES(14),
    width: SIZES(14),
    borderTopRightRadius: 100,
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    transform: [{ rotate: '45deg' }],
    borderBottomEndRadius: 100,
    borderBottomLeftRadius: 100,
    marginRight: 3,
    bottom: SIZES(14)
  },
  padding: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 5
  },
  syncErrorMsg: {
    color: colors.white,
    lineHeight: 20,
    marginVertical: 5,
    top: -7
  },
  viewMore: {
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    color: colors.white,
    marginBottom: 5,
    fontSize: 11
  }
})

export default renderSyncDetails
