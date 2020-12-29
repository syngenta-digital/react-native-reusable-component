import React from 'react'
import { StyleSheet, Alert } from 'react-native'

import Avatar from './Avatar'
import CenterView from '../CenterView/index'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { colors } from '../../Theme/Colors'
import { spacing } from '../../Theme/Constants'

const AvatarStory = storiesOf('Avatar Story', module)
AvatarStory.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

AvatarStory.add('Iamge Avatar', () => (
  <Avatar
    onPress={action('Click Event Executed...!!!')}
    style={object('style', styles.avatarStyle)}
    source={{
      uri: 'http://bootstrap.gallery/everest-v3/img/user7.jpg'
    }}
  />
))

AvatarStory.add('Text Avatar', () => <Avatar style={styles.avatarStyle} text='AK' onPress={() => Alert.alert('AK')} />)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white
  },
  avatarStyle: {
    marginVertical: spacing.space16
  }
})
