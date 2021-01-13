import React from 'react'
import PropertyCard from './PropertyCard'
import CenterView from '../CenterView/index'

import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

const PropertyCardStories = storiesOf('PropertyCard Story', module)
PropertyCardStories.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)

PropertyCardStories.add('Property Card', () => (
    <PropertyCard
        propertyName={text('propertyName', 'Property Card')}
        fieldsCount={12}
        totalArea={40}
        areaUnit={text('areaUnit', 'ha')}
        lastUpdated={text('lastUpdated', 'Last Updated Date')}
        onEditPress={() => { action('Navigate to Edit Property Screen') }}
        onEnterPress={() => { action('Navigate to on Enter Press Screen') }}
        onPress={() => { action('Property has been clicked...') }}
    />
))