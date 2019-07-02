import Orientation from 'react-native-orientation';
import React, { Component } from 'react';
import { Image,BackHandler } from 'react-native';
import { Container,Title,Right, Header, Content, Card, CardItem, Thumbnail, Text,Left, Body } from 'native-base';
export default class CardShowcaseExample extends Component {
  
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  componentWillMount() {
    // console.disableYellowBox = true;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
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
            
          </Left>
          <Body></Body>
          <Right>
            <Title>بروزرسانی</Title>
          </Right>
        </Header>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail style={{width : 60,height : 60}} source={{uri : 'https://khaterat.mobi/js/FinalPics/Logocircle.png'}} />
                <Right>
                  <Text>خاطرات</Text>
                </Right>
              </Left>
            </CardItem>
            <CardItem>
              <Left></Left>
              <Body><Image  source={{uri : 'https://khaterat.mobi/js/LogoTamas.jpg'}} style={{height: 193,width: 134.3,flex: 1,right:"10%"}}/></Body>
              <Right></Right>
              </CardItem>
            <CardItem>
              <Body>
                {/* <Image  source={{uri : 'https://khaterat.mobi/js/LogoTamas.jpg'}} style={{height: 193,width: 134.3,flex: 1,left:'25%'}}/> */}
                <Text style ={{marginTop:15,textAlign: 'right', alignSelf: 'stretch'}}>
                لطفا برای ادامه استفاده از اپلیکیشن خاطرات از طریق سایت www.khaterat.mobi آن را بروز رسانی کنید
                </Text>
              </Body>
            </CardItem>
            {/* <CardItem>
              <Left>
                <Button transparent onPress={() => {
                Linking.canOpenURL("www.khaterat.mobi").then(supported => {
                  if (supported) {
                    Linking.openURL(this.props.url);
                  } else {
                    console.log("Don't know how to open URI: ");
                  }
                })}}  textStyle={{color: '#87838B'}}>
                  <Icon name="ios-home" />
                  <Text>سایت</Text>
                  
                </Button>
              </Left>
            </CardItem> */}
          </Card>
        </Content>
      </Container>
    );
  }
}