import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../Components/Button/Button'
import SliderArea from '../Components/SliderArea/SliderArea'

export default class SliderDemo extends React.Component {
  refSlideArea: any
  render() {
    return (
      <View style={styles.container}>
        <Button
          btnStyle={styles.btnStyle}
          title='Toggle View'
          btnSize='medium'
          onPress={() => this.refSlideArea.toggleAnimation()}
        />
        <SliderArea
          ref={(ref: any) => (this.refSlideArea = ref)}
          maxHeight={250}
          containerStyle={styles.parentCard}
          animationStyle={styles.slideArea}>
          <View style={styles.innerView}>
            <Text style={styles.text}>This is Sample Text...</Text>
            <Text style={styles.text}>Text has been passed from parent file...</Text>
            <Text style={styles.text}>Any custom style can be applied...</Text>
          </View>
        </SliderArea>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  btnStyle: {
    marginVertical: 30
  },
  slideArea: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerView: { paddingTop: 5 },
  text: {
    color: 'white'
  },
  parentCard: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})
