import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ViewStyle, Alert } from 'react-native'

import { fontFamily, SIZES } from '../../Assets/Font'
import { formatDate } from '../../Utility/DatFormat'
import { colors } from '../../Theme/Colors'
import RenderSyncIcon from '../SyncIcon/SyncIcon'
import Card from '../Card/Card'

import Icon from 'react-native-vector-icons/EvilIcons'

interface SeasonsCardProps {
  onEdit: (data?: any) => void
  onDelete?: (data?: any) => void
  cropIcon: any
  imageURI?: any
  org?: any
  onPressEnter?: () => void
  navigation?: any
  data?: any
  isNew?: boolean
  cardAtSettings?: boolean
  deleteSeason?: any
  setSeasonId?: any
  isLoading?: boolean
  isSearch?: boolean
  season: any
  cropImageViewStyle?: ViewStyle
  cropImageStyle?: any
  startDateTitle: string
  endDateTitle: string
  startDate: string
  endDate: string
  editTitle: string
  deleteTitle?: string
  syncStatus: string
  seasonTitleStyle?: ViewStyle
  dotStyle?: ViewStyle
  dateTitleStyle?: ViewStyle
  dateTxtStyle?: ViewStyle
  editTextStyle?: ViewStyle
}

const SeasonsCard = ({
  onEdit,
  cardAtSettings,
  cropImageViewStyle,
  season,
  imageURI,
  cropImageStyle,
  startDateTitle,
  endDateTitle,
  cropIcon,
  startDate,
  endDate,
  deleteTitle,
  seasonTitleStyle,
  dateTitleStyle,
  dateTxtStyle,
  editTextStyle,
  onDelete,
  editTitle,
  dotStyle,
  syncStatus
}: SeasonsCardProps) => {
  return (
    <Card style={styles.cardContainer}>
      <View style={[styles.cardTop, !cardAtSettings ? styles.bottomGreyBorder : styles.bottomMargin]}>
        <View style={[styles.cropImage, cropImageViewStyle]}>
          {!imageURI ? (
            <Icon
              style={styles.alignSelfCenter}
              name={cropIcon?.name}
              size={cropIcon?.size || 50}
              color={cropIcon?.color || colors.grey30}
            />
          ) : (
            <Image source={{ uri: imageURI }} style={[styles.cropImage, cropImageStyle]} onError={() => {}} />
          )}
        </View>
        <View style={styles.subView}>
          <View style={styles.titleView}>
            <Text style={[styles.titleText, seasonTitleStyle]} numberOfLines={2}>
              {season?.name}
            </Text>
            <RenderSyncIcon syncStatus={syncStatus} />
          </View>

          <View style={[styles.areaCropView]}>
            <View style={styles.dateUIView}>
              <Text style={[styles.dot, dotStyle]}>{'•'}</Text>
              <View style={styles.lineBetweenDot} />
              <Text style={[styles.dot, dotStyle]}>{'•'}</Text>
            </View>
            <View style={styles.dateView}>
              <View style={styles.dotView}>
                <Text numberOfLines={1} style={[styles.dateTitleTxt, dateTitleStyle]}>
                  {startDateTitle}
                </Text>
                <Text numberOfLines={1} style={[styles.dateTxt, dateTxtStyle]}>
                  {startDate}
                </Text>
              </View>
              <View style={{ marginLeft: SIZES(8) }}>
                <Text numberOfLines={1} style={[styles.dateTitleTxt, dateTitleStyle]}>
                  {endDateTitle}
                </Text>
                <Text numberOfLines={1} style={[styles.dateTxt, dateTxtStyle]}>
                  {endDate}
                </Text>
              </View>
            </View>
            <View style={styles.newSeasonView}>
              {cardAtSettings && (
                <TouchableOpacity style={styles.actionView} onPress={() => onEdit(season)}>
                  <Text style={[styles.actionTxt, editTextStyle]}>{editTitle}</Text>
                </TouchableOpacity>
              )}

              {cardAtSettings && (
                <TouchableOpacity
                  onPress={() => (onDelete ? onDelete(season) : {})}
                  style={[styles.actionView, styles.actionBorderView]}>
                  <Text style={[styles.actionTxt, { color: colors.baseRed }]}>{deleteTitle}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>

      {!cardAtSettings && (
        <TouchableOpacity
          style={styles.cardBottom}
          onPress={() => {
            onEdit()
          }}>
          <Text style={styles.buttonText}>{editTitle}</Text>
          <Icon name='edit-filled' color={colors.green} size={16} />
        </TouchableOpacity>
      )}
    </Card>
  )
}

SeasonsCard.defaultProps = {
  cropIconName: 'settings',
  cropImageStyle: {},
  startDateTitle: 'Start',
  endDateTitle: 'End',
  editTitle: 'Edit',
  deleteTitle: 'Delete',
  syncStatus: 'none',
  onEdit: () => Alert.alert('Warning', 'Add Edit function'),
  startDate: formatDate(new Date(), 'DD/MM/YYYY'),
  endDate: formatDate(new Date(), 'DD/MM/YYYY')
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    bottom: SIZES(5)
  },
  cardTop: {
    paddingVertical: SIZES(16),
    paddingHorizontal: SIZES(10),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row'
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  cropImage: {
    width: SIZES(84),
    height: SIZES(119),
    borderRadius: 8,
    backgroundColor: colors.gray6,
    justifyContent: 'center'
  },
  bottomGreyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5
  },
  subView: { flexDirection: 'column', flex: 2 },
  titleText: {
    fontSize: 17,
    fontFamily: fontFamily.notosans_semibold,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: colors.gray_1,
    width: '85%',
    paddingLeft: '4%'
  },
  areaCropView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SIZES(12)
  },
  dateUIView: {
    width: '10%',
    height: '100%',
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18
  },
  dot: {
    color: colors.blue,
    padding: SIZES(5),
    fontSize: SIZES(17)
  },
  bottomMargin: {
    marginBottom: 10
  },

  errorText: {
    fontSize: SIZES(14),
    width: '85%',

    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: colors.baseRed
  },
  lineBetweenDot: { backgroundColor: colors.gray5, height: '20%', width: 2 },
  dotView: { marginBottom: SIZES(12), marginLeft: SIZES(8) },

  cardBottom: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  editView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: SIZES(16),
    lineHeight: SIZES(18),
    color: colors.green,
    marginRight: SIZES(6)
  },

  titleView: {
    marginHorizontal: SIZES(12),
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  dateTitleTxt: {
    fontSize: SIZES(12),
    color: colors.gray3,
    lineHeight: SIZES(13)
  },
  dateTxt: {
    fontSize: SIZES(14),
    color: colors.gray_1,
    lineHeight: SIZES(15)
  },
  newTxt: {
    fontSize: SIZES(14),
    color: colors.blue,
    lineHeight: SIZES(15),
    backgroundColor: colors.blue50,
    paddingVertical: SIZES(4),
    paddingHorizontal: SIZES(6)
  },
  dateView: {
    width: '50%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  newSeasonView: {
    width: '30%',
    marginTop: 15,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  actionView: {
    marginRight: SIZES(3)
  },
  actionBorderView: {
    borderLeftWidth: 1,
    borderLeftColor: colors.borderColor
  },
  actionTxt: {
    fontSize: SIZES(14),
    color: colors.blue,
    lineHeight: SIZES(15),
    paddingVertical: SIZES(6),
    paddingHorizontal: SIZES(5)
  },

  syncMsg: {
    color: colors.white,
    top: -7,
    lineHeight: SIZES(20)
  },
  viewMore: {
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    color: colors.white,
    fontSize: SIZES(11)
  },
  syncMsgView: {
    minHeight: '60%',
    maxHeight: '100%',
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    borderRadius: SIZES(5),
    justifyContent: 'center',
    padding: SIZES(10),
    position: 'absolute',
    zIndex: 5,
    // right: isTablet()? '2%':'1%',
    marginTop: SIZES(35),
    paddingLeft: SIZES(12)
  },
  triangle: {
    height: SIZES(14),
    width: SIZES(14),
    borderTopRightRadius: 100,
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    transform: [{ rotate: '45deg' }],
    borderBottomEndRadius: 100,
    borderBottomLeftRadius: 100,
    // marginRight: SIZES(3),
    bottom: SIZES(14)
  },
  syncErrorMsg: {
    color: colors.white,
    lineHeight: SIZES(15)
  }
})

export default SeasonsCard
