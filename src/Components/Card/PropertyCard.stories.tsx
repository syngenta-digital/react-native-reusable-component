/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import PropertyCard from './PropertyCard'
import CenterView from '../CenterView/index'

import { number, radios, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

const PropertyCardStories = storiesOf('PropertyCard Story', module)
PropertyCardStories.addDecorator((getStory: any) => (
  <CenterView customStyle={{ paddingHorizontal: 15 }}>{getStory()}</CenterView>
))

PropertyCardStories.add('Property Card', () => (
  <PropertyCard
    propertyName={text('propertyName', 'Property Card')}
    fieldsCount={number('fieldsCount', 12)}
    totalArea={number('totalArea', 40)}
    areaUnit={text('areaUnit', 'ha')}
    lastUpdated={text('lastUpdated', '31/04/2020')}
    onEditPress={() => {
      action('Navigate to Edit Property Screen')
    }}
    onEnterPress={() => {
      action('Navigate to on Enter Press Screen')
    }}
    onPress={() => {
      action('Property has been clicked...')
    }}
    syncStatus={radios(
      'syncStatus',
      {
        none: 'none',
        success: 'success',
        error: 'error',
        pending: 'pending'
      },
      'success',
      'syncStatus'
    )}
    syncMsgText={'Sync Completed successfully'}
  />
))
