
import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
var DATA =[];
import React, { Component } from 'react';
import { AsyncStorage } from "react-native";
import {ListView,Alert} from 'react-native';
import { Container,Root, Header,Toast, Content,Icon, ListItem,Title, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
export default class ListThumbnailExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: [],
      loading : false
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    global.rendernum = [];
    global.mydatas = [];
    global.subjects = [];
    global.descriptions = [];
    window.contents = [];
    global.imageurl = [];
    }

    _retrieveData = async () => {
      if(window._token == undefined || window._token == ""){
      try {
        const value = await AsyncStorage.getItem('key:Token');
        if (value !== null) {
          // We have data!!
          window._token = value;
          fetch(API_URL + '/auth/user', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Authorization' : 'Bearer '+window._token,
            },
          })
          .then((response) => response.json())
          .then((responseJson) => {
              this.setState({loading : false});
            response = ""+responseJson.message;
            if(response == "Unauthenticated." || response == undefined){
              // Toast.show({
              //   text: 'Unauthenticated !!',
              //   buttonText: 'Okay'
              // })
              }else {
                window._username = responseJson.email;
                this.fetchContent();
                this.forceUpdate();
            }
          })
          .catch((error) => {
            this.props.navigation.navigate("Login");
          });
        }else{
          this.props.navigation.navigate("Login");
        }
       } catch (error) {
        this.props.navigation.navigate("Login");
         // Error retrieving data
       }
      }else{
        fetch(API_URL + '/auth/user', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Authorization' : 'Bearer '+window._token,
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({loading : false});
          response = ""+responseJson.message;
          if(response == "Unauthenticated." || response == undefined){
            // Toast.show({
            //   text: 'Unauthenticated !!',
            //   buttonText: 'Okay'
            // })
            }else {
              window._username = responseJson.email;
              this.fetchContent();
              this.forceUpdate();
          }
        })
        .catch((error) => {
          this.props.navigation.navigate("Login");
        });
      }
    }

    componentWillMount() {
      // console.disableYellowBox = true;
      window._update= "no";

      fetch(API_URL + '/auth/getalert', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With' : 'XMLHttpRequest',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        response = ""+responseJson.message;
        if(response == "undefined" || responseJson.message == "none"){
          this._retrieveData();
          this.fetchContent();
         }else if(responseJson.disabled == "true") {
           window._update= "yes";
          Alert.alert(
  
            // This is Alert Dialog Title
            // " قیمت " +content + " است ",
            "با تشکر",

            // This is Alert Dialog Message. 
            // 'برای استفاده باید آن را بخرید',
            responseJson.message,
            [
              // First Text Button in Alert Dialog.
              // {text: 'نمیخوام', onPress: () => console.log('Ask me later Button Clicked')},
              // Third OK Button in Alert Dialog
              // {text: 'میخوام', onPress: () => this.props.navigation.navigate("bankView")},
              {text: responseJson.button, onPress: () => console.log('bezoodi')},
              
            ]
        
          );
          this.props.navigation.navigate("update");

         }else if(responseJson.disabled == "somehow"){
          Alert.alert(
  
            // This is Alert Dialog Title
            // " قیمت " +content + " است ",
            "سلام",
        
            // This is Alert Dialog Message. 
            // 'برای استفاده باید آن را بخرید',
            responseJson.message,
            [
              // First Text Button in Alert Dialog.
              // {text: 'نمیخوام', onPress: () => console.log('Ask me later Button Clicked')},
              // Third OK Button in Alert Dialog
              // {text: 'میخوام', onPress: () => this.props.navigation.navigate("bankView")},
              {text: responseJson.button, onPress: () => console.log('bezoodi')},
              
            ]
        
          );
          this._retrieveData();
          this.fetchContent();

         }else{
          this._retrieveData();
          this.fetchContent();
         }
      })
      .catch((error) => {
        Toast.show({
          text: "No internet connection!",
          buttonText: "Okay",
          position: "top",
          duration: 3000,
          textStyle: { color: "red" }
        });
      });

    }
    componentDidMount() {
      Orientation.lockToPortrait();
    }

  async fetchContent() {
    if(window._username == undefined){
      return;
    }else{
      this.setState({loading : true});
      fetch(API_URL + '/auth/getcontent/'+ window._username, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({loading : false});
        response = ""+responseJson.message;
        if(response == "Unauthenticated."){
          // Toast.show({
          //   text: 'Unauthenticated !!',
          //   buttonText: 'Okay'
          // })
          this.setState({loading : false});
          }else {
            global.mydatas = responseJson;
            var count = Object.keys(responseJson).length;
            for(let i = 0 ; i < count; i++){
              global.rendernum[i] = i;
              global.subjects[i] = responseJson[i].Mainsubject;
              global.descriptions[i] = responseJson[i].Maindescription;
              global.imageurl[i] = responseJson[i].Mainimageurl;

              window.contents[i] = responseJson[i].content;
            }
            this.setState({
              listViewData : this.ds.cloneWithRows(global.subjects)
            })
            this.setState({loading : false});
            this.forceUpdate();
        }
      })
      .catch((error) => {
        this.setState({loading : false});
        Toast.show({
          text: "No internet connection!",
          buttonText: "Okay",
          position: "top",
          duration: 3000,
          textStyle: { color: "red" }
        });
      });    
    }

}


  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Root>
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
            <Title>صفحه اصلی</Title>
          </Body>
        </Header>
        <Content>
        <OrientationLoadingOverlay
          visible={this.state.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="لطفا صبر کنید... "
          />
          <ListView 
          removeClippedSubviews={false}
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(global.rendernum)}
            renderRow={rowData =>
              <ListItem noBorder style={{flex:1 , marginBottom: 10}} thumbnail>
               <Left>
                   <Thumbnail square source={{isStatic:true,uri : global.imageurl[rowData]}} />
                </Left>
                <Body>
                  <Text style={{alignSelf:"flex-end"}}>{global.subjects[rowData] }</Text>
                  <Text style={{alignSelf:"flex-end"}}note numberOfLines={1}>{global.descriptions[rowData] }</Text>
                </Body>
                <Right>
                  <Button transparent onPress={() => {this.props.navigation.navigate("conIndex", { name: rowData , subject:global.subjects[rowData] })
                  window._thisname = rowData;
                  window._thissubject = global.subjects[rowData];
                  }}>
                    <Text>بیشتر</Text>
                  </Button>
                </Right>
              </ListItem>}
              />
        </Content>
      </Container>
      </Root>
    );
  }
}