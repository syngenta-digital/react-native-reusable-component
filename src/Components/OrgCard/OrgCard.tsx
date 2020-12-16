import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../Theme/Colors'
import Card from '../Card/Card'
import Icon from 'react-native-vector-icons/EvilIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'

import CustomButton from '../Button/Button'
import { fonts } from '../../Theme/Fonts'

interface OrganizationCardProps {
  onCardClick?: (data: any) => void
  onBottomCardClick?: (data: any, index: any) => void
  viewMoreErrors?: () => void
  syncMsgText?: string
  noCropsText?: string
  org: any
  orgDownloadTxt?: string
  propertiesTitle?: string
  bottomText?: string
  image?: string
  orgIndex?: number
  areaUnit?: string
  orgsList?: any
  setSelectedOrg?: any
  downloadOrgList?: any
  isDownloaded?: boolean
  DEFAULT_CROP_ICON_NAME: string
  syncSucc?: string
  syncStatus?: string
  syncInComplete?: string
  viewMore?: string
  errorInRequest?: any
  cropsLength: number
  cropsArray?: any
}

const OrganizationCard = ({ ...props }: OrganizationCardProps) => {
  const [isSyncMsgVisible, setSyncVisibility] = useState(false)

  const renderSyncIcon = (org: any) => {
    let { syncStatus } = props

    if (syncStatus !== 'none' && org && org.detailDownloaded) {
      return (
        <TouchableOpacity
          onPress={() => {
            setSyncVisibility(!isSyncMsgVisible)
          }}
          style={[
            OrganizationCardStyles.statusView,
            {
              backgroundColor:
                syncStatus === 'success' ? colors.green10 : syncStatus === 'error' ? colors.red10 : colors.red50
            }
          ]}>
          <Icon
            name={syncStatus === 'success' ? 'check' : 'syncError'}
            size={syncStatus === 'success' ? 10 : 20}
            color={colors.white}
          />
        </TouchableOpacity>
      )
    }
  }

  const renderSyncDetails = () => {
    let { syncStatus, errorInRequest, viewMoreErrors, syncMsgText } = props
    if (isSyncMsgVisible && syncStatus === 'error') {
      return (
        <View style={OrganizationCardStyles.syncMsgView}>
          <View style={[OrganizationCardStyles.triangle]} />
          {errorInRequest &&
            errorInRequest.slice(0, 2).map((item: any, i: number) => (
              <Text style={OrganizationCardStyles.syncErrorMsg} numberOfLines={1}>
                {(i + 1).toString() + ' ' + item.message}
              </Text>
            ))}
          <TouchableOpacity
            onPress={() => {
              setSyncVisibility(!isSyncMsgVisible)
              if (viewMoreErrors) {
                viewMoreErrors()
              }
            }}
            style={OrganizationCardStyles.padding}>
            <Text style={OrganizationCardStyles.viewMore}>{props.viewMore}</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (isSyncMsgVisible) {
      return (
        <View style={OrganizationCardStyles.syncMsgView}>
          <View style={OrganizationCardStyles.triangle} />
          <Text style={OrganizationCardStyles.syncMsg}>{syncMsgText}</Text>
        </View>
      )
    }
    return true
  }

  let { onCardClick, org, orgDownloadTxt, propertiesTitle, onBottomCardClick, bottomText, noCropsText } = props
  return (
    <Card disabled={true}>
      <TouchableOpacity disabled={!onCardClick} onPress={() => (onCardClick ? onCardClick(org) : {})}>
        <View style={OrganizationCardStyles.titleView}>
          <View style={OrganizationCardStyles.imageView}>
            <Text style={OrganizationCardStyles.imageTxt}>{org?.name.substr(0, 2).toUpperCase()}</Text>
          </View>
          <Text numberOfLines={2} ellipsizeMode='tail' style={[fonts.h4SemiBold, OrganizationCardStyles.titleText]}>
            {props.org?.name}
          </Text>
          {renderSyncIcon(org)}
        </View>
        {renderSyncDetails()}
        {!org.isDownloaded ? (
          <CustomButton title={orgDownloadTxt} onPress={() => {}} btnStyle={OrganizationCardStyles.offlineBtn} />
        ) : (
          <View>
            <View style={OrganizationCardStyles.propertyView}>
              <Icon name='location' size={14} color={colors.grey20} />
              <Text style={OrganizationCardStyles.propertyText}>
                {String(org?.properties?.length || '0') + ' ' + propertiesTitle}
              </Text>
            </View>
            <View style={OrganizationCardStyles.landView}>
              <View style={OrganizationCardStyles.areaView}>
                <Icon name='share-google' size={14} color={colors.grey20} />
                <Text numberOfLines={1} style={OrganizationCardStyles.areaText} ellipsizeMode='tail'>
                  {org?.area || '--'}
                </Text>
                <Text style={[OrganizationCardStyles.areaText, { width: '15%' }]}>{props.org?.areaunit || 'ha'}</Text>
              </View>
              <View style={OrganizationCardStyles.cropView}>
                {props.cropsLength === 0 ? (
                  <View style={OrganizationCardStyles.areaViewCrop}>
                    <Icon name='cropseason' size={16} color={colors.grey20} style={{ marginLeft: 1 }} />
                    <Text style={OrganizationCardStyles.noCropText}>{noCropsText}</Text>
                  </View>
                ) : null}
                {props.cropsLength &&
                  props.cropsArray.map((crop: any, index: number) => {
                    if (index < 3) {
                      let cropName = crop
                      let hasIcon = Icon.hasIcon(cropName)
                      return (
                        <View
                          key={index + 1100}
                          style={[OrganizationCardStyles.cropImageView, { backgroundColor: colors.green50 }]}>
                          {hasIcon ? (
                            <Icon name={cropName} color={colors.white} size={20} />
                          ) : (
                            <Icon name={props.DEFAULT_CROP_ICON_NAME} color={colors.white} size={20} />
                          )}
                        </View>
                      )
                    }
                  })}
                {/* {!ValidationManager.objectShared.isEmptyObject(org) && */}
                {true && org?.seasons && props.cropsArray && props.cropsLength > 3 && (
                  <View style={[OrganizationCardStyles.cropStyle]}>
                    <Text style={OrganizationCardStyles.numberStyle}>{'+' + (props.cropsLength - 3)}</Text>
                  </View>
                )}
              </View>
            </View>
            <Text numberOfLines={2} style={OrganizationCardStyles.addressText}>
              {org?.address || '--'}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {org?.isDownloaded && (
        <TouchableOpacity onPress={() => (onBottomCardClick ? onBottomCardClick(org, 1) : {})}>
          <View style={OrganizationCardStyles.cardBottom}>
            <Text style={OrganizationCardStyles.accessText}>{bottomText}</Text>
            <AntIcon name='right' size={16} color={colors.grey40} />
          </View>
        </TouchableOpacity>
      )}
    </Card>
  )
}

OrganizationCard.defaultProps = {
  DEFAULT_CROP_ICON_NAME: 'settings'
}

const OrganizationCardStyles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageTxt: {
    fontSize: 16
  },
  imageView: {
    height: 45,
    width: 45,
    borderRadius: 24,
    backgroundColor: colors.grey10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    flex: 1,
    marginHorizontal: 8,
    marginLeft: 8,
    color: colors.grey90
  },
  offlineBtn: {
    width: '100%',
    borderWidth: 0,
    marginTop: 16,
    marginBottom: 2,
    backgroundColor: colors.grey30
  },
  statusView: {
    height: 25,
    width: 25,
    backgroundColor: colors.green10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  addressText: {
    paddingTop: '3%',
    alignSelf: 'flex-start',
    fontSize: 16,
    paddingLeft: 7
  },
  propertyView: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 6,
    marginTop: 20
  },
  propertyText: {
    fontSize: 16,
    marginLeft: 5
  },
  landView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12
  },
  areaView: {
    flexGrow: 1,
    flexShrink: 1,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 5
  },
  areaViewCrop: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  noCropText: {
    fontSize: 16,
    lineHeight: 20
  },
  areaText: {
    flexWrap: 'wrap',
    maxWidth: '85%',
    fontSize: 16,
    marginLeft: 7
  },
  cropView: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingRight: true ? 5 : 0
  },
  cardBottom: {
    marginTop: 10,
    paddingTop: 5,
    height: 30,
    width: '100%',
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderTopColor: colors.grey50
  },
  accessText: {
    fontSize: 16,
    color: colors.blue60
  },
  cropImageView: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -3,
    paddingLeft: -3,
    overflow: 'hidden'
  },
  cropStyle: {
    height: 32,
    width: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -3,
    paddingLeft: -3,
    opacity: 3,
    backgroundColor: colors.grey60
  },
  numberStyle: {
    color: colors.white,
    flexShrink: 1,
    fontSize: 13
  },
  cropImage: {
    width: -30,
    height: -30
  },
  syncMsgView: {
    minHeight: '25%',
    maxHeight: '100%',
    minWidth: '30%',
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    top: 40,
    zIndex: 5,
    right: -5,
    paddingLeft: 12
  },
  syncMsg: {
    color: colors.white,
    top: -7,
    lineHeight: 15
  },
  syncErrorMsg: {
    color: colors.white,
    lineHeight: 20,
    marginVertical: 5,
    top: -7
  },
  triangle: {
    height: 14,
    width: 14,
    borderTopRightRadius: 100,
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    transform: [{ rotate: '45deg' }],
    borderBottomEndRadius: 100,
    borderBottomLeftRadius: 100,
    marginRight: 3,
    bottom: 14
  },
  padding: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 5
  },
  viewMore: {
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    color: colors.white,
    marginBottom: 5,
    fontSize: 11
  }
})
export default OrganizationCard
