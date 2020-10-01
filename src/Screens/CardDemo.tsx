import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Avatar from '../Components/Avatar/Avatar'
import Card from '../Components/Card/Card'
import { colors } from '../Theme/Colors'
import { sizes, spacing } from '../Theme/Constants'
import { fonts } from '../Theme/Fonts'

const CardDemo = () => (
  <View style={styles.container}>
    <Card
      onPress={() => Alert.alert('Card Component')}
      style={styles.cardStyle}
      children={
        <View>
          <Text style={[fonts.body1SemiBold]}>This is a</Text>
          <Text style={[fonts.h1]}>Card Component</Text>
        </View>
      }
    />
    <Card
      onPress={() => Alert.alert('Usina Zamioculca')}
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
  </View>
)
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
