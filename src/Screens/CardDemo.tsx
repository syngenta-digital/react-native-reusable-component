import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AlertComponent, { AlertType } from '../Components/Alert/AlertComponent'
import Avatar from '../Components/Avatar/Avatar'
import Card from '../Components/Card/Card'
import PropertyCard from '../Components/Card/PropertyCard'
import { colors } from '../Theme/Colors'
import { spacing } from '../Theme/Constants'
import { fonts } from '../Theme/Fonts'

const CardDemo = () => {
  const [showValues, setValues] = useState({ showAlertOnScreen: false, showUserName: '' })

  console.log('showAlertOnScreen', showValues.showAlertOnScreen)

  return (
    <View style={styles.container}>
      <Card
        onPress={() => {
          setValues({ showAlertOnScreen: true, showUserName: 'Card Component' })
        }}
        style={styles.cardStyle}
        children={
          <View>
            <Text style={[fonts.body1SemiBold]}>This is a</Text>
            <Text style={[fonts.h1]}>Card Component</Text>
          </View>
        }
      />
      <Card
        onPress={() => {
          setValues({ showAlertOnScreen: true, showUserName: 'Usina Zamioculca' })
        }}
        style={styles.cardStyle}
        children={
          <View style={styles.card2Style}>
            <Avatar
              source={{
                uri: 'http://bootstrap.gallery/everest-v3/img/user7.jpg'
              }}
            />
            <Text style={[fonts.body1SemiBold, { marginLeft: spacing.space16 }]}> Usina Zamioculca</Text>
          </View>
        }
      />

      <PropertyCard
        propertyName={'Property Card'}
        fieldsCount={12}
        totalArea={79}
        areaUnit='ha'
        lastUpdated={new Date()}
        onEditPress={() => {
          setValues({ showAlertOnScreen: true, showUserName: 'Property Edit' })
        }}
        onEnterPress={() => {
          setValues({ showAlertOnScreen: true, showUserName: 'Property Enter' })
        }}
        onPress={() => {
          setValues({ showAlertOnScreen: true, showUserName: 'PropertyCard Component' })
        }} />
      <AlertComponent
        visible={showValues.showAlertOnScreen}
        onPressOk={() => {
          console.log('Ok action')
          setValues({ showAlertOnScreen: false, showUserName: '' })
        }}
        onPressCancel={() => {
          setValues({ showAlertOnScreen: false, showUserName: '' })
          console.log('cancel action')
        }}
        alertTitle={'Success'}
        alertMsg={showValues.showUserName}
        alertType={AlertType.SUCCESS}
        cancelTitle={'Dismiss'}
        okTitle={'OK'}
      />
    </View>
  )
}
export default CardDemo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grey10,
    paddingHorizontal: spacing.space12
  },
  cardStyle: {
    marginVertical: spacing.space24
  },
  card2Style: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    marginLeft: spacing.space16
  }
})
