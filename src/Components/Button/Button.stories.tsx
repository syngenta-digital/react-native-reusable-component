import React from 'react'
import { Text, StyleSheet, Alert } from 'react-native'

import CustomButton from './Button'
import CenterView from '../CenterView/index'

import { boolean, object, radios, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { colors } from '../../Theme/Colors'

const buttonStories = storiesOf('CustomButton', module)
buttonStories.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

const label = 'Button Size'
const sizeOptions = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  undefined: undefined
}
const defaultSizeValue = 'large'
const groupId = 'Button Size'

buttonStories.add('Default Buttons', () => (
  <>
    <CustomButton
      title={text('Button title', 'Default Button')}
      onPress={action('Click Event')}
      disabled={boolean('disabled', false)}
      shadowButton={boolean('shadowButton', false)}
      borderButton={boolean('borderButton', false)}
      btnSize={radios(label, sizeOptions, defaultSizeValue, groupId)}
      btnStyle={object('btnStyle', { marginBottom: 30 })}
      textStyle={object('textStyle', { fontSize: 17, color: colors.white })}
      textProps={object('textProps', { numberOfLines: 3 })}
      borderStyle={object('borderStyle', {})}
    />

    <CustomButton
      title={'Medium Size Button'}
      onPress={action('Click Event')}
      btnSize={'medium'}
      btnStyle={styles.marginAround}
    />

    <CustomButton
      title={'small Button'}
      onPress={action('Click Event')}
      btnSize={'small'}
      btnStyle={styles.marginAround}
    />
  </>
))

buttonStories.add('Border Button', () => (
  <CustomButton
    title={text('Button title', 'Default Border')}
    onPress={action('Click Event')}
    borderButton={boolean('borderButton', true)}
    btnSize={radios(label, sizeOptions, 'medium', groupId)}
    borderStyle={object('borderStyle', {})}
  />
))

buttonStories.add('Shadow Button', () => (
  <CustomButton
    title={text('Button title', 'Default Shadow')}
    shadowButton={boolean('shadowButton', true)}
    btnSize={radios(label, sizeOptions, 'medium', groupId)}
    disabled={boolean('disabled', false)}
    borderButton={boolean('borderButton', false)}
    onPress={action('Click Event')}
    btnStyle={object('btnStyle', {})}
    textStyle={object('textStyle', {})}
    textProps={object('textProps', {})}
    borderStyle={object('borderStyle', styles.borderBtnStyle)}
  />
))

buttonStories.add('Disabled Button', () => (
  <CustomButton
    title={text('Button title', 'Disabled Title')}
    btnSize={radios(label, sizeOptions, 'medium', groupId)}
    onPress={action('Click Event')}
    disabled={boolean('disabled', true)}
  />
))

buttonStories.add('Custom Content Button', () => (
  <CustomButton
    noTitle={boolean('noTitle', true)}
    shadowButton={boolean('shadowButton', true)}
    borderStyle={object('borderStyle', styles.borderStyle)}
    btnStyle={object('btnStyle', styles.customBtn)}
    textStyle={object('textStyle', styles.textStyle)}
    onPress={() => Alert.alert('Alert', 'This Is User Styles Button')}>
    <Text style={styles.textStyle}>Custom Style Button</Text>
    <Text style={styles.textStyle}>No. of Children Can Be Passed..</Text>
  </CustomButton>
))

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin: 20,
    justifyContent: 'space-between',
    paddingBottom: 60
  },
  marginAround: { marginVertical: 30 },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.blue50,
    borderStyle: 'solid'
  },
  customBtn: {
    width: '75%',
    backgroundColor: colors.white
  },
  textStyle: {
    color: colors.blue50,
    fontSize: 16,
    paddingVertical: 5,
    textAlign: 'center'
  },
  borderBtnStyle: { borderColor: colors.green60, borderWidth: 2 }
})
