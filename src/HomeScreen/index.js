import Orientation from 'react-native-orientation';
import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MainScreenNavigator from "../ChatScreen/index.js";
import Profile from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import Swiper from "../Swipe/MySwiper.js";
import test from "../Swipe/test.js";
import Loginpage from "../LoginScreen/login.js";
import Homeindex from "../Home/index.js";
import Registarepage from "../Register/Registerpage.js"
import aboutUs from "../ProfileScreen/aboutUs.js";
import bankView from "../Bank/web.js";
import QRmooze from "../QRmooze/QRmooze.js";
import QRcamera from "../QRmooze/QR.js";
import QRcamera2 from "../QRmooze/QRcamera2.js";
import update from "../Home/update.js";
import news from "../Home/news.js"
import contentPage from "../Home/contentPage.js";
import showMore from "../Home/showMore.js";
import conIndex from "../QRmooze/index.js";
import FirstPage from "../QRmooze/firstpage.js";
import SecondPage from "../QRmooze/secondpage.js";
import test2 from "../Swipe/test2.js";
import TabloPage from "../QRmooze/tablopage.js";
import myProfile from "../ProfileScreen/EditScreenTwo.js";
import mynews from "../Home/contentPagecopy.js";
import updateuser from "../ProfileScreen/updateuser.js";
import searchpage from "../Home/searchpage.js";
import mytabs from "../Home/tabs.js";
import subjects from "../Home/subjects.js";
import Tab1 from '../Home/tabOne';
import Tab2 from '../Home/tabTwo';
import Tab3 from '../Home/tabThree';


import { DrawerNavigator,StackNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Homeindex: {screen : Homeindex},
    QRcamera : {screen : QRcamera},
    QRcamera2 : {screen : QRcamera2},
    subjects : {screen : subjects},
    update : {screen : update},
    tabOne : {screen : Tab1},
    tabTwo : {screen : Tab2},
    tabThree : {screen : Tab3},
    mytabs:{screen : mytabs},
    TabloPage : { screen : TabloPage},
    myProfile : {screen : myProfile},
    test : { screen : test},
    FirstPage:{screen : FirstPage},
    SecondPage:{screen : SecondPage},
    news:{screen: news},
    test2 : {screen : test2},
    updateuser : {screen : updateuser},
    searchpage : {screen : searchpage},
    mynews : { screen : mynews},
    QRmooze : {screen : QRmooze},
    // Swiper: { screen: Swiper },
    showMore:{screen : showMore},
    Home: { screen: HomeScreen },
    Login: {screen : Loginpage},
    conIndex: {screen : conIndex},
    logout:{screen :Loginpage},
    Chat: { screen: MainScreenNavigator },
    aboutUs : {screen :aboutUs},

    ProfileScreen: { screen: Profile },
    Register: {screen : Registarepage},
    bankView : {screen: bankView},
    contentPage:{screen: contentPage}
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerPosition : 'left',
    drawerWidth: 250,
    drawerLockMode : 'locked-closed'
  }
);


export default HomeScreenRouter;