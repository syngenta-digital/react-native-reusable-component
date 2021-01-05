import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ViewStyle } from 'react-native'

import { colors } from '../../Theme/Colors'

import PropTypes from 'prop-types'
import { Icon } from '../../Theme/Icon'

interface ListViewProps {
  list: any
  containerStyle?: object
  titleStyle?: object
  leftIconName?: string
  rightIconName?: string
  onElementPress?: (data?: any) => void
  hideLeftIcon?: boolean
  hideRightIcon?: boolean
  contentStyle?: ViewStyle
  leftIconColor?: string
  rightIconColor?: string
}

const ListView = ({
  list,
  onElementPress,
  leftIconName,
  rightIconName,
  hideLeftIcon,
  hideRightIcon,
  contentStyle,
  containerStyle,
  leftIconColor,
  rightIconColor,
  titleStyle
}: ListViewProps) => (
  <FlatList
    data={list}
    renderItem={({ item, index }: any) => (
      <TouchableOpacity
        style={[styles.cardContainer, containerStyle, item.containerStyle]}
        key={String(index)}
        disabled={!onElementPress && !item.onPress}
        onPress={() => (item.onPress ? item.onPress(item) : onElementPress ? onElementPress(item) : {})}>
        <View style={[styles.card, contentStyle, item.contentStyle]}>
          {!item.hideLeftIcon && !hideLeftIcon && (
            <View style={[styles.leftIconView, item.leftIconViewStyle]}>
              <Icon
                name={item.leftIconName || leftIconName || 'calendar'}
                color={item.leftIconColor || leftIconColor || colors.grey60}
                size={24}
              />
            </View>
          )}
          <View style={[styles.detailView, titleStyle, item.detailsStyle]}>
            <Text numberOfLines={1} style={[styles.titleText, item.titleStyle]}>
              {item.title}
            </Text>
            {item.children}
          </View>
          {!item.hideRightIcon && !hideRightIcon && (
            <View style={[styles.rightIconView, item.rightIconViewStyle]}>
              <Icon
                name={item.rightIconName || rightIconName || 'arrowright'}
                color={item.rightIconColor || rightIconColor || colors.grey40}
                size={20}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={(_item, index: any) => index.toString()}
  />
)

export default ListView

ListView.propTypes = {
  list: PropTypes.array.isRequired
}
ListView.defaultProps = {
  list: []
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 5
  },
  card: {
    flex: 1,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  detailView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  leftIconView: {
    height: 50,
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: colors.black
  },
  rightIconView: {
    height: 44,
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
