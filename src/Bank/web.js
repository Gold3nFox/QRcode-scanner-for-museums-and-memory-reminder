import Orientation from 'react-native-orientation';
import React, { Component } from 'react'

import {
   View,
   WebView,
   StyleSheet
} 
from 'react-native'

export default class BankView extends React.Component {

    componentDidMount() {
        Orientation.lockToPortrait();
      }

    render() {
    return (
       //loads a simple webpage not used in application
      <View style = {styles.container}>
         <WebView
            source = {{ uri: 
               'http://10.0.3.2:8000/main' }}
         />
      </View>
   )
}
}
const styles = StyleSheet.create({
    container: {
       height: 350,
    }
 })








