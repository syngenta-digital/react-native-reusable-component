import React from 'react'
import { Alert, Text } from 'react-native'
import ListView from '../Components/ListView/ListView'

const ListViewDemo = () => (
  <ListView
    list={[
      { title: 'First Item' },
      { title: 'Second Item', children: <Text style={{ marginLeft: 11, color: 'grey' }}>Subchild goes here...</Text> },
      {
        title: 'Click Me',
        onPress: () => Alert.alert('Alert', 'List Item Clicked')
      },
      {
        title: 'Custom Styled Item',
        contentStyle: { backgroundColor: 'yellow' }
      },
      {
        title: 'Left Icon hidden',
        hideLeftIcon: true,
        titleStyle: { color: 'red' }
      }
    ]}
  />
)

export default ListViewDemo
