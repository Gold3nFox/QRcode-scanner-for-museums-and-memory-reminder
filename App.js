import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import {firebase,RemoteMessage} from 'react-native-firebase';
import HomeScreen from "./src/HomeScreen/index.js";

export default class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    //check firebase permission
    // firebase.messaging().hasPermission()
    //   .then(enabled => {
    //     if (enabled) {
    //       firebase.messaging().getToken().then(token => {
    //         console.log("LOG: ", token);
    //       })
    //       // user has permissions
    //     } else {
    //       firebase.messaging().requestPermission()
    //         .then(() => {
    //           // User Now Has Permission
    //         })
    //         .catch(error => {
    //           console.log("LOG: ", error);
    //           // User has rejected permissions  
    //         });
    //     }
    //   });
}


componentWillMount(){
}

  render() {
    return <HomeScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
