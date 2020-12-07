// src/components/button/CustomButton.stories.jsx
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import CustomButton from './Button'
import { View } from 'react-native'

// the action function has one argument which is the name of the action,
// this will be displayed in the actions tab in the addons panel
// action("name here")
import { action } from '@storybook/addon-actions'

// the boolean knob renders a switch which lets you toggle a value between true or false
// you call it like boolean("name here", default_value)
import { boolean, withKnobs } from '@storybook/addon-knobs'

const buttonStories = storiesOf('CustomButton', module)

// lets storybook know to show the knobs addon for this story
buttonStories.addDecorator(withKnobs)

// I use to boolean knob to set the disabled prop based on the knob state
// I use the action function to log every time the button gets called
buttonStories.add('default view', () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <CustomButton onPress={action('Button Press!')} disabled={boolean('Disabled', false)} />
  </View>
))
