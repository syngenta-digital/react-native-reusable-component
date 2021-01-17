import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

import RenderSyncIcon from '../SyncIcon/SyncIcon'
import SyncDetails from '../SyncIcon/SyncDetails'
import CustomButton from '../Button/Button'
import FacePile from '../FacePile/FacePile'
import Card from '../Card/Card'

import { fonts } from '../../Theme/Fonts'
import { colors } from '../../Theme/Colors'
import { SIZES } from '../../Assets/Font'
import { Icon } from '../../Theme/Icon'

interface OrganizationCardProps {
  org: any
  onCardClick?: (data: any) => void
  onDownloadOrg: (data?: any) => void
  defaultCropIconName: string
  cropsLength: number
  cropsArray?: any

  orgDownloadTxt?: string //Download Button Text
  downloadBtnStyle?: ViewStyle //Download button style

  orgTitleStyle?: TextStyle // Organization title Style
  propertiesTitle?: string // title showing no of properties
  noCropsText?: string // Text to render when there are no crops

  bottomText?: string // Bottom Button Text on Card
  onBottomCardClick?: (data: any) => void // Bottom button click event

  //sync props
  syncMsgText: string
  syncStatus: string
  viewMore?: string
  viewMoreErrors?: () => void
  errorInRequest?: any
}

const OrganizationCard = ({ ...props }: OrganizationCardProps) => {
  const [isSyncMsgVisible, setSyncVisibility] = useState(false)
  let {
    onCardClick,
    org,
    orgDownloadTxt,
    propertiesTitle,
    onBottomCardClick,
    bottomText,
    noCropsText,
    onDownloadOrg,
    downloadBtnStyle,
    orgTitleStyle,
    cropsLength,
    cropsArray,
    syncStatus,
    syncMsgText,
    viewMoreErrors,
    errorInRequest,
    defaultCropIconName
  } = props
  let cropIconsArray: string[] = []
  if (cropsLength) {
    cropsArray.map((crop: string) =>
      Icon.hasIcon(crop) ? cropIconsArray.push(crop) : cropIconsArray.push(defaultCropIconName)
    )
  }
  return (
    <Card disabled={true}>
      <TouchableOpacity disabled={!onCardClick} onPress={() => (onCardClick ? onCardClick(org) : {})}>
        <View style={styles.titleView}>
          <View style={styles.imageView}>
            <Text style={styles.imageTxt}>{org?.name.substr(0, 2).toUpperCase()}</Text>
          </View>
          <Text numberOfLines={2} ellipsizeMode='tail' style={[fonts.h3SemiBold, styles.titleText, orgTitleStyle]}>
            {org?.name}
          </Text>
          {org && org.isDownloaded && (
            <RenderSyncIcon syncStatus={syncStatus} onPress={() => setSyncVisibility(!isSyncMsgVisible)} />
          )}
        </View>
        <SyncDetails
          errorInRequest={errorInRequest}
          viewMoreErrors={viewMoreErrors}
          isVisible={isSyncMsgVisible}
          syncStatus={syncStatus}
          syncMsgText={syncMsgText}
        />
        {!org.isDownloaded ? (
          <CustomButton
            title={orgDownloadTxt}
            onPress={onDownloadOrg ? () => onDownloadOrg(org) : () => {}}
            btnStyle={[styles.downloadBtnStyle, downloadBtnStyle]}
          />
        ) : (
          <View>
            <View style={styles.propertyView}>
              <Icon name='property' size={SIZES(16)} color={colors.grey70} />
              <Text style={styles.propertyText}>{String(org?.properties?.length || '0') + ' ' + propertiesTitle}</Text>
            </View>
            <View style={styles.landView}>
              <View style={styles.areaView}>
                <Icon name='area' size={SIZES(16)} color={colors.grey70} />
                <Text numberOfLines={1} style={styles.areaText} ellipsizeMode='tail'>
                  {org?.area || '--'}
                </Text>
                <Text style={[styles.areaText, styles.areaUnitStyle]}>{org?.areaunit || 'ha'}</Text>
              </View>
              {!props.cropsLength ? (
                <View style={styles.areaViewCrop}>
                  <Icon name='cropseason' size={16} color={colors.grey20} style={styles.cropIcon} />
                  <Text style={styles.noCropText}>{noCropsText}</Text>
                </View>
              ) : (
                <FacePile
                  array={cropIconsArray}
                  maxCircleValue={4}
                  type={'icon'}
                  containerStyle={styles.facePileContainer}
                  circleBgColor={colors.grey20}
                  circleSize={SIZES(30)}
                  textColor={colors.black}
                />
              )}
            </View>
            <Text numberOfLines={2} style={styles.addressText}>
              {org?.address || '--'}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {org?.isDownloaded && (
        <TouchableOpacity onPress={() => (onBottomCardClick ? onBottomCardClick(org) : {})}>
          <View style={styles.cardBottom}>
            <Text style={styles.accessText}>{bottomText}</Text>
            <Icon name='arrowright' size={16} color={colors.grey30} />
          </View>
        </TouchableOpacity>
      )}
    </Card>
  )
}

OrganizationCard.defaultProps = {
  defaultCropIconName: 'settings',
  orgDownloadTxt: 'Download Organization',
  onDownloadOrg: () => {},
  cropsLength: 0,
  propertiesTitle: 'Properties',
  bottomText: 'View Details',
  noCropsText: 'No Crops',
  syncStatus: 'none',
  syncMsgText: ''
}

const styles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageTxt: {
    fontSize: SIZES(16)
  },
  imageView: {
    height: SIZES(45),
    width: SIZES(45),
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
  downloadBtnStyle: {
    width: '100%',
    borderWidth: 0,
    marginTop: 16,
    marginBottom: 2,
    backgroundColor: colors.grey30
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
    flex: 1,
    flexGrow: 1,
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
  cardBottom: {
    marginTop: 10,
    paddingTop: 5,
    height: 50,
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
  facePileContainer: { flex: 0, alignSelf: 'center', marginTop: 10 },
  areaUnitStyle: { width: '15%' },
  cropIcon: { marginLeft: 1 }
})
export default OrganizationCard
