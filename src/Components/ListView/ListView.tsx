import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { colors } from '../../Theme/Colors'
import Icon from 'react-native-vector-icons/EvilIcons'

interface ListViewProps {
  list: any
  containerStyle?: object
  titleStyle?: object
}

const ListView = ({ list }: ListViewProps) => (
  <FlatList
    data={list}
    renderItem={({ item, index }: any) => (
      <TouchableOpacity
        style={[styles.cardContainer, item.containerStyle]}
        key={String(index)}
        disabled={item.onPress ? false : true}
        onPress={() => (item.onPress ? item.onPress() : {})}>
        <View style={[styles.card, item.contentStyle]}>
          {!item.hideLeftIcon && (
            <View style={[styles.leftIconView, item.leftIconViewStyle]}>
              <Icon name={'chevron-right'} color={item.leftIconColor || colors.grey60} size={24} />
            </View>
          )}
          <View style={[styles.detailView, item.detailsStyle]}>
            <Text numberOfLines={1} style={[styles.titleText, item.titleStyle]}>
              {item.title}
            </Text>
            {item.children}
          </View>
          {!item.hideRightIcon && (
            <View style={[styles.rightIconView, item.rightIconViewStyle]}>
              <Icon name='calendar' color={item.rightIconColor || colors.grey40} size={20} />
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
