import { Dimensions, PixelRatio } from 'react-native'
import { isTablet } from 'react-native-device-info'

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const guidelineBaseWidth = 360
const guidelineBaseHeight = 683
const scale = (size: number) =>
  isTablet() ? (SCREEN_HEIGHT / guidelineBaseHeight) * size : (SCREEN_WIDTH / guidelineBaseWidth) * size
export function normalize(size: any, factor: any = isTablet() ? 0.3 : 0.5) {
  let newSize = size + (scale(size) - size) * factor

  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export const MAX_WIDTH = isTablet() ? '75%' : SCREEN_WIDTH
