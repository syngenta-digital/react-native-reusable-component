// src/components/button/CustomButton.stories.jsx
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Card from './Card'
import { View, Text } from 'react-native'

// the boolean knob renders a switch which lets you toggle a value between true or false
// you call it like boolean("name here", default_value)
import { withKnobs } from '@storybook/addon-knobs'

const cardStories = storiesOf('Card', module)

// lets storybook know to show the knobs addon for this story
cardStories.addDecorator(withKnobs)

// I use to boolean knob to set the disabled prop based on the knob state
// I use the action function to log every time the button gets called
cardStories.add('default view', () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Card
      onPress={() => {}}
      style={{
        marginVertical: 24
      }}
      children={
        <View>
          <Text
            style={{
              color: 'red'
            }}>
            This is a card component
          </Text>
        </View>
      }
    />{' '}
  </View>
))
