import Orientation from 'react-native-orientation';
import React, { Component } from "react";
import Home1 from "./tabs.js";
import Home3 from "./hometest.js";
import Home4 from "../Home/searchpage.js";
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

//main page bottom navigator

export default (MainScreenNavigator = TabNavigator(
  {
    Home1: { screen: props => <Home1 {...props} /> },
    Home3: { screen: props => <Home3 {...props} /> },
    Home4: { screen: props => <Home4 {...props} /> }
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
              onPress={() => props.navigation.navigate("Home1")}
            >
              <Icon  name="home" />
              <Text>خانه</Text>
            </Button>

            {/* home navigator button */}

            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Home3")}
            >
              <Icon  name="eye" />
              <Text>خاطرات روز</Text>
            </Button>

            {/* today events navigator button */}

            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Home4")}
            >
              <Icon name="ios-search" />
              <Text>جستجو</Text>
            </Button>

            {/* Search page navigator button */}

          </FooterTab>
        </Footer>
      );
    }
  }
));
