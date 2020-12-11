import { StyleSheet } from 'react-native'
import { colors } from '../../Theme/Colors'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.blackOpacity3
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: 0,
    overflow: 'hidden'
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: colors.blackOpacity2
  }
})

export default styles
