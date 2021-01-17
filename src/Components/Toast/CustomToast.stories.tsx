import React from 'react'
import CustomToast from './CustomToast'
import CenterView from '../CenterView/index'
import { storiesOf } from '@storybook/react-native'

const CustomToastStories = storiesOf('CustomToast Story', module)
CustomToastStories.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

CustomToastStories.add('Custom Toast', () => (
    CustomToast.show('ToastMessage', 'success', 100, 'bottom'),
    CustomToast.shared.showToast('ToastMessage', 'success')
))