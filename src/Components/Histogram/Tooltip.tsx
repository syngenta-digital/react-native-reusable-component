import React from 'react'

import { isTablet } from 'react-native-device-info'
import { G, Rect, Text as SvgText } from 'react-native-svg'

import { SIZES } from '../../Assets/Font'
import { colors } from '../../Theme/Colors'
import { sizes } from '../../Theme/Constants'

const Tooltip = ({ x, y, yMax, total, selected, areaUnit, areaLable, fontFamilyName }: any) => {
  let areaValue = selected?.value
  let renderAreaOnTooltip = areaValue
  let percentageValue = ((areaValue / total) * 100).toFixed(2)
  let textXPosition = selected.index >= 6 ? (Number(renderAreaOnTooltip) > 1000 ? SIZES(-15) : SIZES(-5)) : SIZES(16)
  return (
    <G
      key={selected.index}
      x={
        selected.index >= 6
          ? isTablet()
            ? x(selected.index) - SIZES(40)
            : Number(renderAreaOnTooltip) > 1000
            ? x(selected.index) - SIZES(66)
            : x(selected.index) - SIZES(56)
          : isTablet()
          ? x(selected.index) + SIZES(5)
          : x(selected.index) - 4
      }
      y={areaValue > 70 * (yMax / 100) ? y(areaValue) + SIZES(55) : y(areaValue) - SIZES(55)}>
      <Rect
        height={SIZES(50)}
        width={Number(renderAreaOnTooltip) > 1000 ? SIZES(125) : SIZES(100)}
        stroke={colors.gray1}
        fill={colors.white}
        ry={10}
        rx={10}
        x={selected.index >= 6 ? (Number(renderAreaOnTooltip) > 1000 ? SIZES(-30) : SIZES(-15)) : SIZES(5)}
      />
      <SvgText
        x={textXPosition}
        dy={SIZES(20)}
        textAnchor={'start'}
        fontFamily={fontFamilyName}
        fill={colors.gray1}
        fontSize={sizes.size12}>
        {`${areaLable + ' ' + renderAreaOnTooltip}` + ' ' + areaUnit}
      </SvgText>
      <SvgText
        x={textXPosition}
        dy={SIZES(37)}
        textAnchor={'start'}
        fontFamily={fontFamilyName}
        fill={colors.gray1}
        fontSize={sizes.size12}>
        {`${percentageValue} %`}
      </SvgText>
      {areaValue > 70 * (yMax / 100) ? (
        <G
          x={
            selected.index >= 6
              ? isTablet()
                ? SIZES(60)
                : Number(renderAreaOnTooltip) > 1000
                ? SIZES(70)
                : SIZES(60)
              : SIZES(10)
          }
          y={SIZES(2)}
          transform='rotate(-45)'>
          <Rect height={SIZES(10)} width={SIZES(10)} fill={colors.white} />
        </G>
      ) : (
        <G
          transform='rotate(45)'
          x={
            selected.index >= 6
              ? isTablet()
                ? SIZES(70)
                : Number(renderAreaOnTooltip) > 1000
                ? SIZES(80)
                : SIZES(70)
              : SIZES(22)
          }
          y={SIZES(42)}>
          <Rect height={SIZES(10)} width={SIZES(10)} fill={colors.white} />
        </G>
      )}
    </G>
  )
}

export default Tooltip
