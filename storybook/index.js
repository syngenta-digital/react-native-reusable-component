// index.js
import { getStorybookUI, configure } from '@storybook/react-native'
import { name as appName } from './app.json'
import { AppRegistry } from 'react-native'
import './rn-addons.js'

configure(() => {
  require('./src/stories.js') // we will create this file in the next steps
}, module)

const StorybookUIRoot = getStorybookUI({})

AppRegistry.registerComponent(appName, () => StorybookUIRoot)
