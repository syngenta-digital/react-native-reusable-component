import React from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native'
import { spacing } from '../Theme/Constants'
import { fonts } from '../Theme/Fonts'
import { ColorUtil } from '../Utility/ColoUtil'

interface IColor {
  title: string
  color: string
}
const colorStyle = (color: string) => {
  return {
    height: 50,
    width: '100%',
    backgroundColor: color,
    marginTop: spacing.space4
  }
}
const renderItem = ({ item }) => <Item color={item.hex} title={item.title} />

const Item = ({ title, color }: IColor) => (
  <View style={styles.item}>
    <Text style={[fonts.h4]}>{`${title}    ${color}`}</Text>
    <View style={colorStyle(color)} />
  </View>
)

const ColorDemo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={ColorUtil} renderItem={renderItem} keyExtractor={item => item.title} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    marginVertical: spacing.space24,
    marginHorizontal: spacing.space24
  }
})

export default ColorDemo
