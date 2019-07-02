import { AsyncStorage } from "react-native";
import Orientation from 'react-native-orientation';
import React, { Component } from 'react';
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
const routes = ["خانه","موزه چندرسانه ای","پیام ها","درباره ما","اطلاعات","خروج"];
const pages = ["Homeindex","QRcamera2","mynews","aboutUs","myProfile","Login"];
const num  = ["0","1","2","3","4","5"];
const icons = ["home","md-qr-scanner","megaphone","ios-contacts","person","ios-arrow-back"]
export default class Side333Bar extends React.Component {

  componentDidMount() {
    Orientation.lockToPortrait();
  }
  render() {
    return (
      <Container>
        <Content>
          <Image
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
            source={{uri : "https://khaterat.mobi/js/cover.png"}}
          />
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={{uri : 'https://khaterat.mobi/js/web/TextLogo.png'}}
          />
          <List
            dataArray={num}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={num => {
              return (
                <ListItem
                style = {{ height:80 , alignContent:"flex-end",justifyContent:"flex-end",textAlign:"right",alignItems:"flex-end"}}
                  button
                  onPress={() => {if(pages[num] =="Login"){
                    try {
                      AsyncStorage.setItem('key:Token','');
                    } catch (error) {
                      // Error saving data
                    }
                  }this.props.navigation.navigate(pages[num])}}
                >
                <Left><Icon style = {{justifyContent:"flex-start",textAlign:"left",alignItems:"flex-start"}} name={icons[num]}/></Left>
                  <Right><Text style = {{justifyContent:"flex-end",textAlign:"right",alignItems:"flex-end" , width: 120}}>{routes[num]}</Text></Right>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
