import Orientation from 'react-native-orientation';
import React, { Component } from "react";
import EditScreenTwo from "./EditScreenTwo.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    EditScreenTwo: { screen: EditScreenTwo }
  },
  {
    initialRouteName: "Profile"
  }
));
