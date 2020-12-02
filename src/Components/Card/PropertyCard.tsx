import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '../../Theme/Colors'
import { fontFamily, sizes } from '../../Assets/Font'
import Card from './Card'
import { isTablet } from 'react-native-device-info'
import Icon from 'react-native-vector-icons/EvilIcons'
interface PropertyCardProps {
    onPress: any
    lastUpdated: any
    propertyName: string
    fieldsCount: any
    totalArea: any
    areaUnit: any
    onEditPress: any
    onEnterPress: any
}

interface PropertyCardState {
}

export default class PropertyCard extends React.Component<PropertyCardProps, PropertyCardState> {
    CONVERSION_RATE = 2.47105
    constructor(props: PropertyCardProps) {
        super(props);
        this.state = {
        }
    }
    getAreaByUnit = (area: any, unit: any) => {
        let newUnit = 'ha'
        if (!area || area === '--') {
            return '--'
        }
        switch (newUnit) {
            case 'ac':
                return Number(area * this.CONVERSION_RATE).toFixed(2)
            case 'ha':
                return Number(area).toFixed(2)
            default:
                return Number(area).toFixed(2)
        }
    }
    renderCropView() {
        return (
            <View style={PropertyCardStyles.areaCropView}>
                <View style={PropertyCardStyles.areaView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            name='property'
                            size={sizes.size12}
                            color={colors.gray2}
                            style={{ marginLeft: 1, marginRight: sizes.size5 }}
                        />
                        <Text style={PropertyCardStyles.areaNoText}>{this.props.fieldsCount + ' areas'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='area' size={sizes.size12} color={colors.gray2} style={{ marginLeft: 1, marginRight: 5 }} />
                        <Text ellipsizeMode='tail' numberOfLines={2} style={[PropertyCardStyles.areaNoText]}>
                            {this.getAreaByUnit(this.props.totalArea, this.props.areaUnit) + ' ' + this.props.areaUnit}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <Card
                onPress={this.props.onPress}
                style={PropertyCardStyles.cardContainer}
                children={
                    <>
                        <TouchableOpacity
                            style={[PropertyCardStyles.cardTop]}
                            onPress={this.props.onPress}>
                            <View style={PropertyCardStyles.lastUpdatedView}>
                                <Text style={PropertyCardStyles.lastUpdatedText}>{this.props.lastUpdated}</Text>
                            </View>
                            <View style={PropertyCardStyles.titleView}>
                                <View style={PropertyCardStyles.lineView} />
                                <Text style={PropertyCardStyles.titleText} numberOfLines={2}>
                                    {this.props.propertyName}
                                </Text>
                            </View>
                            {this.renderCropView()}
                        </TouchableOpacity>
                        <View style={PropertyCardStyles.cardBottom}>
                            <TouchableOpacity
                                style={PropertyCardStyles.editView}
                                onPress={this.props.onEditPress}>
                                <Text style={PropertyCardStyles.buttonText}>{'Edit'}</Text>
                                <Icon name='edit' color={colors.green} size={sizes.size14} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={PropertyCardStyles.enterView}
                                onPress={this.props.onEnterPress}>
                                <Text style={PropertyCardStyles.buttonText}>{'Enter'}</Text>
                                <Icon name='arrow-right' color={colors.green} size={sizes.size14} />
                            </TouchableOpacity>
                        </View>
                    </>
                }
            />
        )
    }
}

const PropertyCardStyles = StyleSheet.create({
    cardContainer: {
        borderRadius: 8,
        backgroundColor: colors.white,
        marginTop: sizes.size16,
        elevation: 4,
        bottom: sizes.size5,
        shadowColor: colors.gray1,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 0 }
    },
    cardTop: {
        minHeight: 145,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray5,
        paddingVertical: sizes.size8,
        flexDirection: 'column',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    cardBottom: {
        height: sizes.size40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    editView: {
        width: '50%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: colors.gray5,
        borderBottomLeftRadius: 8
    },
    enterView: {
        height: '100%',
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 8
    },
    buttonText: {
        fontFamily: fontFamily.notosans_regular,
        fontSize: sizes.size16,
        lineHeight: sizes.size18,
        color: colors.green,
        marginRight: 7
    },
    lastUpdatedView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 16
    },
    lastUpdatedText: {
        fontSize: sizes.size12,
        fontFamily: fontFamily.notosans_regular,
        lineHeight: sizes.size14,
        color: colors.gray3
    },
    titleView: {
        width: '100%',
        height: sizes.size48,
        // marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    lineView: {
        height: '100%',
        width: '1%',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: colors.btnBackground
    },
    titleText: {
        fontFamily: fontFamily.notosans_regular,
        fontWeight: '500',
        fontSize: sizes.size16,
        width: '83%',
        paddingLeft: isTablet() ? sizes.size22 : sizes.size10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: colors.gray_1
    },
    starView: {
        height: sizes.size48,
        width: sizes.size48,
        borderRadius: sizes.size24,
        backgroundColor: colors.gray6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        right: 16,
        position: 'absolute'
    },
    areaCropView: {
        flex: 2,
        marginTop: 12,
        flexDirection: 'row'
    },
    areaView: {
        width: '55%',
        marginLeft: '5%',
        marginRight: '1%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    areaPlaceholderView: {
        width: '55%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    areaViewCrop: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cropView: {
        width: '35%',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',

        paddingRight: isTablet() ? sizes.size12 : sizes.size5
    },
    areaNoText: {
        fontFamily: fontFamily.notosans_regular,
        fontSize: sizes.size16,
        lineHeight: sizes.size21,
        paddingLeft: sizes.size2
    },
    noCropText: {
        fontFamily: fontFamily.notosans_regular,
        fontSize: sizes.size16,
        lineHeight: sizes.size21
    },
    areaText: {
        flexWrap: 'wrap',
        fontFamily: fontFamily.notosans_regular,
        maxWidth: '85%',
        fontSize: sizes.size16,
        marginLeft: 5
    },
    cropImageView: {
        width: sizes.size32,
        height: sizes.size32,
        borderRadius: sizes.size32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray2,
        marginLeft: -sizes.size3,
        paddingLeft: -sizes.size3
    },
    cropStyle: {
        height: sizes.size32,
        width: sizes.size32,
        borderRadius: sizes.size32,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -sizes.size3,
        paddingLeft: -sizes.size3,
        opacity: sizes.size3
    },
    numberStyle: {
        color: colors.white,
        flexShrink: 1,
        fontSize: sizes.size13
    },
    cropImage: {
        width: sizes.size30,
        height: sizes.size30
    },
    actionView: {
        marginRight: sizes.size3
    },
    actionBorderView: {
        borderLeftWidth: 1,
        borderLeftColor: colors.borderColor
    },
    actionTxt: {
        fontFamily: fontFamily.notosans_regular,
        fontWeight: '500',
        fontSize: sizes.size14,
        color: colors.blue,
        lineHeight: sizes.size15,
        paddingVertical: sizes.size6,
        paddingHorizontal: sizes.size5
    },
    actionContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    cropInfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: sizes.size5
    },
    cropInfoWithAction: {
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    spacing: {
        marginLeft: sizes.size2,
        marginRight: sizes.size5
    },
    dotView: {
        marginLeft: 0,
        height: '100%',
        justifyContent: 'space-around',
        padding: sizes.size5,
        fontSize: sizes.size8
    },
    cropsCountWithArea: {
        width: '55%',
        flexDirection: 'row',
        alignItems: 'center'
    }
})