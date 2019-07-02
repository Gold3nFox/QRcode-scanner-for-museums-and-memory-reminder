import Orientation from 'react-native-orientation';
import React, { Component } from 'react';
import { Image,StyleSheet,TouchableOpacity,Linking } from 'react-native';
import { Container,Content,Button,Title,   Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon } from 'native-base';
const cards = [
  {
    text: 'موزه',
    name: 'این مجسمه ی ۱ است',
    image: {isStatic:true,uri : 'https://khaterat.mobi/js/moozefirst.jpg'},
  }
];

export default class DeckSwiper345Example extends Component {
  onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

  componentDidMount() {
    console.warn(this.props.navigation.getParam('name') + ' why?');
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <Container>
        <Header> 
        <Left>
        
          </Left>
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>موزه</Title>
          </Body>
        </Header>
        <Content>
                <CardItem>
                  <Left>
                      
                  </Left>
                  <Body>

                     

                  </Body>
                  <Right style={{display:'flex',flexDirection:'row-reverse', flex:5}}>
                    <Thumbnail source={{isStatic:true,uri : 'https://khaterat.mobi/js/moozefirst.jpg'}} />
                      <Text note>موزه چند رسانه ای</Text>
                  </Right>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{  flex: 1,height:500, resizeMode:"stretch" }} source={{isStatic:true,uri : 'https://khaterat.mobi/js/moozefirst.jpg'}} />
                </CardItem>
                <CardItem>
                <Right>
                  {/* <Text style ={{textAlign: 'right', alignSelf: 'stretch'}}>این مجسمه ی ۱ است</Text> */}
                </Right>
                </CardItem>
          </Content>
          <Button style={{alignSelf:'center' , bottom : 10}}iconLeft light onPress={() => {
          this.props.navigation.navigate('QRcamera');
        }}>
            <Icon name='md-qr-scanner' />
            <Text>QR</Text>
          </Button>
      </Container>
    );
  }
}