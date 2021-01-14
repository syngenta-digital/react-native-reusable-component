/* eslint-disable react-native/no-inline-styles */
import React from 'react'

import SeasonsCard from './Index'
import CenterView from '../CenterView/index'

import { boolean, object, radios, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { formatDate } from '../../Utility/DatFormat'
import { action } from '@storybook/addon-actions'
import { colors } from '../../Theme/Colors'

const SeasonCardStories = storiesOf('Season Card', module)
SeasonCardStories.addDecorator((getStory: any) => (
  <CenterView customStyle={{ paddingHorizontal: 15 }}>{getStory()}</CenterView>
))

SeasonCardStories.add('Basic season Card', () => (
  <SeasonsCard
    season={object('season', {
      name: 'Season Title',
      startDate: '01 Jan, 2020',
      endDate: formatDate(new Date(), 'DD MMM, YY')
    })}
    onEdit={action('Edit function return selecetd season...')}
    cropIcon={object('cropIcon', { name: 'seasonsTab', color: colors.grey60, size: 50 })}
    startDateTitle={text('startDateTitle', 'Start')}
    endDateTitle={text('endDateTitle', 'End')}
    editTitle={text('editTitle', 'Edit')}
    deleteTitle={text('deleteTitle', 'Delete')}
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
    onDelete={action('Event to delete card...')}
    cardAtSettings={boolean('cardAtSettings', false)}
    seasonTitleStyle={object('seasonTitleStyle', {})}
    dotStyle={object('dotStyle', {})}
    dateTitleStyle={object('dateTitleStyle', {})}
    dateTxtStyle={object('dateTxtStyle', {})}
    editTextStyle={object('editTextStyle', {})}
    disableCardClick={boolean('disableCardClick', false)}
  />
))
