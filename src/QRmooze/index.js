import Orientation from 'react-native-orientation';
import React, { Component } from "react";
import Home1 from "../Home/contentPage.js";
import Home2 from "./QR";
import {Alert} from "react-native";
import { TabNavigator } from "react-navigation";
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  Badge,
  FooterTab,
  Label
} from "native-base";

export default (MainScreenNavigator = TabNavigator(
  {
    Home1: { screen: props => <Home1 {...props} /> },
    Home3: { screen: props => <Home2 {...props} /> }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Home1", { name: props.navigation.getParam('name') , subject: props.navigation.getParam('subject') })}
            >
              <Icon  name="ios-quote" />
              <Text>خاطرات</Text>
            </Button>
            {/* <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Home2")}
            >
              <Icon name="briefcase" />
              <Text>Picker</Text>
            </Button> */}
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Home3", { name: props.navigation.getParam('name') , subject: props.navigation.getParam('subject') })}
            >
              <Icon  name="md-qr-scanner" />
              <Text style={{textAlign:"center"}}>موزه چند رسانه ای</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => {
                Alert.alert(
  
                  // This is Alert Dialog Title
                  // " قیمت " +content + " است ",
                  "به زودی ..",
              
                  // This is Alert Dialog Message. 
                  // 'برای استفاده باید آن را بخرید',
                  'تور مجازی در این نسخه غیر فعال است.',
                  [
                    // First Text Button in Alert Dialog.
                    // {text: 'نمیخوام', onPress: () => console.log('Ask me later Button Clicked')},
                    // Third OK Button in Alert Dialog
                    // {text: 'میخوام', onPress: () => this.props.navigation.navigate("bankView")},
                    {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
                    
                  ]
              
                )
              }}
            >
              <Icon name="ios-camera" />
              <Text>تور مجازی</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
));
