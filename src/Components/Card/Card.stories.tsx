import React from 'react'
import { Text } from 'react-native'

import Card from './Card'
import CenterView from '../CenterView/index'

import { boolean, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import AppStyles from '../../Utility/AppStyles'

const CardStory = storiesOf('Card Story', module)
CardStory.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

CardStory.add('Default Card', () => (
  <Card
    onPress={action('Click Event')}
    disabled={boolean('disabled', false)}
    style={object('style', Object.assign(AppStyles.alignCenter))}>
    <Text>This is child data</Text>
    <Text>You can add any content here</Text>
  </Card>
))
