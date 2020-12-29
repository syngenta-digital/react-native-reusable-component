/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Text } from 'react-native'
import ListView from './ListView'
import CenterView from '../CenterView/index'

import { boolean, color, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import { Alert } from 'react-native'
import { colors } from '../../Theme/Colors'
import { action } from '@storybook/addon-actions'

const ListViewStories = storiesOf('ListView Story', module)
ListViewStories.addDecorator((getStory: any) => (
  <CenterView customStyle={{ paddingHorizontal: 0, marginTop: 0 }}>{getStory()}</CenterView>
))

ListViewStories.add('Default ListView', () => (
  <ListView
    list={object('list', [
      { title: text('title', 'First Item') },
      { title: text('title', 'Second Item') },
      { title: text('title', 'Third Item') }
    ])}
    hideLeftIcon={boolean('hideLeftIcon', false)}
    hideRightIcon={boolean('hideRightIcon', false)}
    leftIconName={text('leftIconName', 'calendar')}
    rightIconName={text('rightIconName', 'chevron-right')}
    leftIconColor={color('leftIconColor', colors.black)}
    rightIconColor={color('rightIconColor', colors.black)}
    titleStyle={object('titleStyle', { fontSize: 12, color: colors.black })}
    contentStyle={object('contentStyle', {})}
    containerStyle={object('containerStyle', {})}
    onElementPress={action('Call event for every click')}
  />
))

ListViewStories.add('ListView with children data', () => (
  <ListView
    list={[
      { title: 'First Item', children: <Text style={{ marginLeft: 11, color: 'grey' }}>Subchild goes here...</Text> },
      { title: 'Second Item', children: <Text style={{ marginLeft: 11, color: 'grey' }}>I am subtitle...</Text> }
    ]}
  />
))

ListViewStories.add('ListView with Diff Click Event', () => (
  <ListView
    list={object('list', [
      {
        title: 'Click Me for separate call',
        onPress: (item: any) => Alert.alert('Alert', item.title)
      },
      {
        title: 'Click Me for separate call',
        onPress: (item: any) => {
          console.log('item', item)
          Alert.alert('Alert', 'I am separate click event for this item')
        }
      },
      {
        title: 'Click Me to check default click'
      }
    ])}
    onElementPress={action('Call event for every click')}
  />
))

ListViewStories.add('ListView with Diff Custom Style', () => (
  <ListView
    list={object('list', [
      {
        title: 'Custom Styled Item',
        contentStyle: { backgroundColor: colors.yellow10 },
        containerStyle: { backgroundColor: colors.grey10, paddingVertical: 20 },
        titleStyle: { color: colors.blue }
      },
      {
        title: 'Second Element',
        contentStyle: { backgroundColor: colors.orange10 },
        containerStyle: { backgroundColor: colors.grey10, paddingVertical: 10 },
        titleStyle: { color: colors.blue }
      }
    ])}
  />
))

ListViewStories.add('ListView with Icons variation', () => (
  <ListView
    list={object('list', [
      {
        title: 'Left Icon hidden',
        hideLeftIcon: true,
        titleStyle: { color: 'red' }
      },
      {
        title: 'Right Icon hidden',
        hideRightIcon: true,
        titleStyle: { color: 'red' }
      }
    ])}
  />
))
