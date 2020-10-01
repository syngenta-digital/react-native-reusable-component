import { Dimensions, PixelRatio } from 'react-native';
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const guidelineBaseWidth = 360
const scale = (size: number) =>
  (SCREEN_WIDTH / guidelineBaseWidth) * size

export function normalize(size: any, factor: any = 0.5) {
  let newSize = size + (scale(size) - size) * factor
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export const SIZES = (value: any) => {
  return normalize(value)
}

export const sizes = {
  size12: 12,
  size14: 14,
  size16: 16,
  size20: 20,
  size24: 24,
  size36: 36
}

export const spacing = {
  //use for margin and padding
  space2: 2,
  space4: 4,
  space46: 6,
  space8: 8,
  space12: 12,
  space16: 16,
  space24: 24,
  space32: 32
}
