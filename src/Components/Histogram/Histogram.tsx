/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing } from 'react-native'
import PropTypes from 'prop-types'

import SliderArea from '../SliderArea/SliderArea'
import Icon from 'react-native-vector-icons/EvilIcons'
import { colors } from '../../Theme/Colors'
import { fontFamily, sizes, SIZES } from '../../Assets/Font'

import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg'
import LinearGradient from 'react-native-linear-gradient'
import { isTablet } from 'react-native-device-info'
import Tooltip from './Tooltip'

interface Props {
  totalHistogramArea: number | string
  chartBgHeight: number | 250
  title: string
  histogramText: string
  dataY: Array<any>
  datax: Array<any>
  graphData: Array<any>
  yMax: any
  noGraphTextStyle: any
  noGraphData?: string | ''
  highTitle?: string | 'High'
  lowTitle?: string | 'Low'
  children?: React.ReactNode
  gradientColorsArray: Array<any> | []
}

interface areaLableProps {
  areaUnit: string
  areaLable: string
  areaLableContainer?: any
  svgViewBox?: any
}

export const RenderAreaLabel = ({ areaUnit, areaLable, areaLableContainer, svgViewBox }: areaLableProps) => {
  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: 'flex-start', left: -5 }, areaLableContainer]}>
      <Svg height='100%' width='6%' viewBox={svgViewBox || isTablet() ? '0 -8 60 65' : '0 -40 30 140'}>
        <G transform='rotate(-90)'>
          <SvgText
            dx={SIZES(65)}
            dy={SIZES(25)}
            alignmentBaseline={'text-bottom'}
            textAnchor={'end'}
            fontSize={SIZES(20)}
            fontFamily={fontFamily.notosans_regular}
            fill={'white'}>
            {areaUnit ? `${areaLable + ' ('}` + areaUnit + ')' : areaLable}
          </SvgText>
        </G>
      </Svg>
    </View>
  )
}

const Histogram = ({
  totalHistogramArea,
  chartBgHeight,
  noGraphTextStyle,
  noGraphData,
  title,
  histogramText,
  lowTitle,
  highTitle,
  dataY,
  graphData,
  yMax,
  datax,
  areaUnit,
  areaLable,
  gradientColorsArray
}: Props & areaLableProps) => {
  let refSlideArea: any
  const [selected, setselectedValue] = useState({})
  return (
    <View style={styles.container}>
      <View style={styles.histo_info}>
        <View style={styles.title_text}>
          <Text style={styles.text_at_left}>{title}</Text>
        </View>

        <TouchableOpacity
          onPress={() => refSlideArea.toggleAnimation()}
          style={[styles.title_text, { justifyContent: 'flex-end' }]}>
          <Text style={[styles.histogramText, { marginLeft: 4, textDecorationLine: 'underline' }]}>
            {histogramText}
          </Text>
          <Icon
            name='arrowright'
            style={{
              transform: [{ rotate: refSlideArea?.state?.visibility ? '90deg' : '-90deg' }],
              marginHorizontal: SIZES(5),
              marginLeft: SIZES(10)
            }}
            color={colors.white}
            size={15}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.gradient_text}>
        <Text style={styles.bar_text}>{lowTitle}</Text>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={gradientColorsArray}
          style={styles.gradient_bar}
        />
        <Text style={styles.bar_text}>{highTitle}</Text>
      </View>

      <SliderArea
        ref={(ref: any) => (refSlideArea = ref)}
        maxHeight={SIZES(250)}
        containerStyle={{ backgroundColor: 'transparent' }}
        animationStyle={{ flex: 1, width: '100%' }}>
        {graphData.length ? (
          <>
            <RenderAreaLabel areaUnit={areaUnit} areaLable={areaLable} />
            <View style={{ flexDirection: 'row', left: SIZES(20) }}>
              <YAxis
                data={dataY}
                numberOfTicks={2}
                contentInset={{ top: SIZES(18), bottom: SIZES(45) }}
                svg={{ fontSize: sizes.size12, fill: colors.white }}
                formatLabel={(value: any) => `${value}`}
              />
              <View style={{ flex: 1, left: SIZES(-20) }}>
                <BarChart
                  style={{ height: isTablet() ? SIZES(250) : SIZES(200), marginHorizontal: SIZES(25) }}
                  data={graphData}
                  spacingInner={0}
                  spacingOuter={0}
                  svg={{
                    stroke: colors.gray3,
                    strokeWidth: 1
                  }}
                  yMax={yMax || 0}
                  yAccessor={({ item }: any) => item.value}
                  contentInset={{ top: SIZES(20), bottom: 0 }}
                  numberOfTicks={dataY.length}>
                  <Grid svg={{ stroke: colors.gray3 }} />
                  {!!Object.keys(graphData[1]).length && <Tooltip yMax total={totalHistogramArea} selected />}
                </BarChart>
                <XAxis
                  style={{
                    borderTopWidth: 1,
                    paddingTop: SIZES(6),
                    borderTopColor: colors.gray3,
                    height: sizes.size40
                  }}
                  data={datax}
                  xAccessor={({ item }: any) => item}
                  formatLabel={(value: any) => value}
                  contentInset={{
                    left: isTablet() ? SIZES(50) : SIZES(40),
                    right: isTablet() ? SIZES(50) : SIZES(40)
                  }}
                  svg={{ fontSize: sizes.size12, fill: colors.white }}
                />
              </View>
            </View>
          </>
        ) : (
          <View style={styles.noDataView}>
            <Text style={[styles.noGraphText, noGraphTextStyle]}>{noGraphData}</Text>
          </View>
        )}
      </SliderArea>
    </View>
  )
}

Histogram.propTypes = {
  chartBgHeight: PropTypes.number.isRequired
}

Histogram.defaultProps = {
  chartBgHeight: 250,
  title: 'Vegetation Index',
  histogramText: 'Histogram',
  lowTitle: 'Low',
  highTitle: 'High',
  graphData: [],
  datax: [],
  dataY: [],
  noGraphData: 'Data Not Available',
  yMax: 40,
  areaLable: '',
  areaUnit: '',
  gradientColorsArray: [colors.damageRed, colors.yellow, '#ABB926', colors.green90]
}

export default Histogram

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingBottom: sizes.size4,
    paddingTop: sizes.size10,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  histo_info: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: sizes.size5 },
  histogramText: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 13
  },
  gradient_text: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title_text: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text_at_left: {
    fontSize: 15,
    lineHeight: 17,
    color: colors.white,
    marginRight: 7
  },
  gradient_bar: {
    marginVertical: SIZES(SIZES(10)),
    height: 15,
    borderRadius: 7,
    flex: 1,
    marginHorizontal: SIZES(SIZES(10))
  },
  bar_text: {
    flex: 0,
    alignSelf: 'center',
    color: colors.white,
    fontSize: 12,
    lineHeight: 13,
    textAlign: 'center'
  },
  noGraphText: { alignSelf: 'center', color: colors.white, fontSize: 16 },
  noDataView: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})
