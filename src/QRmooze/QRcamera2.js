import Orientation from 'react-native-orientation';
import React, { Component } from 'react';
import { StyleSheet,BackHandler } from 'react-native';
import { Container,Button,Title,Content,Header, View,Text, Left, Body, Icon } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { PermissionsAndroid } from 'react-native';

//same as QR page just the backhandler is different from accessing from sidebar and QRmooze footer

export default class QR33 extends Component {
  onSuccess(e) {
    // alert(e.data);
    this.props.navigation.navigate('TabloPage',{ name: e.data});
    
  }

  // async UNSAFE_componentWillMount() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         'title': 'Cool Photo App Camera Permission',
  //         'message': 'Cool Photo App needs access to your camera ' +
  //                    'so you can take awesome pictures.'
  //       }
  //     )
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.warn("You can use the camera")
  //     } else {
  //       console.warn("Camera permission denied")
  //     }
  //   } catch (err) {
  //     console.warn(err)
  //   }

  componentDidMount() {
    Orientation.lockToPortrait();
    this.forceUpdate();
  }
  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Homeindex');
      return true;
    });

  }
  
  
  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <Container>
        <Header> 
        <Left>
        <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer()}}
            >
              <Icon name="menu" />
            </Button>
          </Left>
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>QR</Title>
          </Body>
        </Header>
        <View style={{flex : 1}}>
        <QRCodeScanner
        fadeIn={false}
        reactivate={true}
        reactivateTimeout={2000}
        showMarker={true}
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>اسکن کنید !</Text>
          </Text>
        }
        bottomContent={
          <Content>
            <Left>
          <Icon name="md-qr-scanner" />
          </Left>
          <Body>
          <Text>
          به سمت کد بگیرید
          </Text>
          </Body>
          </Content>
        }
/>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});