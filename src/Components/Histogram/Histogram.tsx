/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native'
import PropTypes from 'prop-types'

import SliderArea from '../SliderArea/SliderArea'
import Tooltip from './Tooltip'

import { colors } from '../../Theme/Colors'
import { fontFamily, SIZES } from '../../Assets/Font'

import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import Svg, { G, Text as SvgText } from 'react-native-svg'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/EvilIcons'
import { isTablet } from 'react-native-device-info'

interface Props {
  graphData: Array<any>
  dataY: Array<any>
  dataX: Array<any>
  yMax: any
  totalHistogramArea: number | string
  chartBgHeight: number
  title: string
  histogramText: string
  noGraphTextStyle?: any
  noGraphData?: string | ''
  highTitle?: string | 'High'
  lowTitle?: string | 'Low'
  gradientColorsArray: Array<any> | []
  barchartAreaStyle?: ViewStyle
  sliderAreaStyle?: ViewStyle
  animatedViewStyle?: ViewStyle
  graphContainerStyle?: ViewStyle
  fontFamilyName?: string
}

interface areaLableProps {
  areaUnit: string
  areaLable: string
  areaLableContainer?: any
  svgViewBox?: any
  fontFamilyName?: string
}

//Lable of Y-Axis
export const RenderAreaLabel = ({
  areaUnit,
  areaLable,
  areaLableContainer,
  svgViewBox,
  fontFamilyName
}: areaLableProps) => {
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
            fontFamily={fontFamilyName || fontFamily.notosans_regular}
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
  dataX,
  areaUnit,
  areaLable,
  gradientColorsArray,
  sliderAreaStyle,
  graphContainerStyle,
  animatedViewStyle,
  fontFamilyName,
  barchartAreaStyle
}: Props & areaLableProps) => {
  let refSlideArea: any
  const [selected, setselectedValue] = useState({})

  const handlePress = (index: any, value: any) => {
    let newValue =
      selected?.value === value && selected?.index === index
        ? {}
        : {
            index,
            value
          }
    setselectedValue(newValue)
  } //Function to handle click event on bar click

  const processedData = graphData.map((element: any, index: any) => {
    element.svg.onPress = () => handlePress(index, element.value)
    element.bin_edge = index / 10
    element.key = `data-${index}`
    return element
  }) // Add click event to every bar of graph

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
            name='arrow-up'
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
        maxHeight={chartBgHeight}
        containerStyle={[{ backgroundColor: 'transparent' }, sliderAreaStyle]}
        animationStyle={[styles.animatedView, animatedViewStyle]}>
        {graphData.length ? (
          <>
            <RenderAreaLabel areaUnit={areaUnit} areaLable={areaLable} />
            <View style={[styles.graphContainer, graphContainerStyle]}>
              <YAxis
                data={dataY}
                numberOfTicks={2}
                contentInset={{ top: SIZES(18), bottom: SIZES(45) }}
                svg={{ fontSize: SIZES(12), fill: colors.white }}
                formatLabel={(value: any) => `${value}`}
              />
              <View style={[styles.graphArea, barchartAreaStyle]}>
                <BarChart
                  style={styles.chartStyle}
                  data={processedData}
                  spacingInner={0}
                  spacingOuter={0}
                  svg={{
                    stroke: colors.gray3,
                    strokeWidth: 1
                  }}
                  yMax={yMax}
                  yAccessor={({ item }: any) => item.value}
                  contentInset={{ top: SIZES(20), bottom: 0 }}
                  numberOfTicks={dataY.length}>
                  <Grid svg={{ stroke: colors.gray3 }} />
                  {!!Object.keys(selected).length && (
                    <Tooltip
                      x
                      y
                      yMax={yMax}
                      total={totalHistogramArea}
                      selected={selected}
                      areaUnit={areaUnit}
                      areaLable={areaLable}
                      fontFamilyName={fontFamilyName || fontFamily.notosans_regular}
                    />
                  )}
                </BarChart>
                <XAxis
                  style={{
                    borderTopWidth: 1,
                    paddingTop: SIZES(6),
                    borderTopColor: colors.gray3,
                    height: SIZES(40)
                  }}
                  data={dataX}
                  xAccessor={({ item }: any) => item}
                  formatLabel={(value: any) => value}
                  contentInset={{
                    left: isTablet() ? SIZES(50) : SIZES(40),
                    right: isTablet() ? SIZES(50) : SIZES(40)
                  }}
                  svg={{ fontSize: SIZES(12), fill: colors.white }}
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
  dataX: [],
  noGraphData: 'Data Not Available',
  areaLable: '',
  areaUnit: '',
  gradientColorsArray: [colors.damageRed, colors.yellow, '#ABB926', colors.green90]
}

RenderAreaLabel.defaultProps = {
  areaUnit: ''
}

export default Histogram

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingBottom: SIZES(4),
    paddingTop: SIZES(10),
    paddingRight: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  histo_info: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: SIZES(5) },
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
  noDataView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  chartStyle: {
    height: isTablet() ? SIZES(250) : SIZES(200),
    marginHorizontal: SIZES(25)
  },
  graphArea: { flex: 1, left: SIZES(-20) },
  animatedView: { flex: 1, width: '100%' },
  graphContainer: { flexDirection: 'row', left: SIZES(20) }
})
