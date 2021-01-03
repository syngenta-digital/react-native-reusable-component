import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CenterView from '../CenterView/index'
import CustomButton from '../Button/Button'
import RBSheet from './RBSheet'

import { number, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { colors } from '../../Theme/Colors'

const BottomRBSheetStories = storiesOf('Bottom RBSheet Story', module)
BottomRBSheetStories.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

BottomRBSheetStories.add('Bottom RBSheet', () => {
  let refRBSheet: any
  return (
    <View>
      <CustomButton btnStyle={styles.btnStyle} title='Toggle View' btnSize='medium' onPress={() => refRBSheet.open()} />

      <RBSheet
        ref={(ref: any) => (refRBSheet = ref)}
        closeOnDragDown={boolean('closeOnDragDown', true)}
        closeOnPressMask={boolean('closeOnPressMask', true)}
        dragFromTopOnly={boolean('dragFromTopOnly', false)}
        closeOnPressBack={boolean('closeOnPressBack', true)}
        keyboardAvoidingViewEnabled={boolean('keyboardAvoidingViewEnabled', false)}
        height={number('height', 260)}
        minClosingHeight={number('minClosingHeight', 0)}
        openDuration={number('openDuration', 150)}
        closeDuration={number('closeDuration', 500)}
        onClose={action('onClose...')}
        onOpen={action('onOpen...')}
        customStyles={{
          wrapper: {
            backgroundColor: colors.blackOpacity6
          },
          draggableIcon: {
            backgroundColor: colors.blue
          },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }
        }}>
        <Text>Child data goes here...</Text>
      </RBSheet>
    </View>
  )
})

const styles = StyleSheet.create({
  btnStyle: {
    marginVertical: 30
  }
})
