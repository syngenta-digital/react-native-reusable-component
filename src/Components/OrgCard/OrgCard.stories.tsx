import React from 'react'
import OrgCard from './OrgCard'
import CenterView from '../CenterView/index'

import { object, radios, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

const OrganizationCardStories = storiesOf('OrganizationCard Story', module)
OrganizationCardStories.addDecorator((getStory: any) => (
  // eslint-disable-next-line react-native/no-inline-styles
  <CenterView customStyle={{ paddingHorizontal: 15 }}>{getStory()}</CenterView>
))

OrganizationCardStories.add('Org Card to download', () => (
  <OrgCard
    org={object('org', {
      name: 'This is Org Title',
      area: 100,
      areaunit: 'ac',
      address: 'area, city, state, country',
      properties: [{ name: 'Property Name' }]
    })}
    onDownloadOrg={action('Call Download Org function...')}
    downloadBtnStyle={object('Download Button Style', {})}
  />
))

OrganizationCardStories.add('Organization Card', () => (
  <OrgCard
    org={{
      name: 'This is Org Title',
      area: '100',
      areaunit: 'ac',
      address: 'area, city, state, country',
      properties: [{ name: 'Property Name' }, { name: 'Property Name' }],
      isDownloaded: true
    }}
    propertiesTitle={text('propertiesTitle', 'Properties')}
    bottomText={text('bottomText', 'View Org Details')}
    onBottomCardClick={action('Navigate to details screen...')}
    onCardClick={action('Organizatin Card has been clicked...!!!')}
    noCropsText={text('noCro  psText', 'No Crops')}
    cropsLength={5}
    cropsArray={['calendar', 'arrow-right', 'arrow-up', 'arrow-right', 'arrow-up', 'arraow-down']}
  />
))

OrganizationCardStories.add('Organization Card with Sync Status', () => (
  <OrgCard
    org={{
      name: 'This is Org Title',
      area: '100',
      areaunit: 'ac',
      address: 'area, city, state, country',
      properties: [{ name: 'Property Name' }, { name: 'Property Name' }],
      isDownloaded: true
    }}
    propertiesTitle={text('propertiesTitle', 'Properties')}
    bottomText={text('bottomText', 'View Org Details')}
    onBottomCardClick={action('Navigate to details screen...')}
    onCardClick={action('Organizatin Card has been clicked...!!!')}
    noCropsText={text('noCro  psText', 'No Crops')}
    cropsLength={5}
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
    syncMsgText={text('syncMsgText', 'Sync Successfully Completed')}
    errorInRequest={text('errorInRequest', 'Error 1, Error 2')}
    viewMoreErrors={action('Navigate to error details screen')}
    cropsArray={['calendar', 'arrow-right', 'arrow-up', 'arrow-right', 'arrow-up', 'arraow-down']}
  />
))
