import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';
import { Container,Badge,Title, Root, Header,Button, Content,Icon,Toast, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import {
  ListView,
} from "react-native";
import { AsyncStorage,BackHandler } from "react-native";

export default class Mynews extends Component {
  constructor(props) {
    super(props);
    this.state = {size:0 ,loading : false,basic: true,loading: true,
      listViewData: [],};

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    
    global.title = [];
    global.num = [];
    global.time = [];
    global.data = [];
    global.author = [];
    global.imageurl = [];
      }

    loadnum = 1;

    _storeData = async () => {
      try {
        await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
      } catch (error) {
        // Error saving data
      }
    }

   
    
    
    deleteRow(secId, rowId, rowMap) {
      rowMap[`${secId}${rowId}`].props.closeRow();
      const newData = [...this.state.listViewData];
      newData.splice(rowId, 1);
      this.setState({ listViewData: newData });
    }

    addNum(id){
      global.num.push(id);
    }
    addTitle(newTitle,id) {
      global.title[id-1]= newTitle;
    }
    addAuthor(newAuthor,id) {
      global.author[id-1]= newAuthor;
    }
    addData(newData,id) {
      global.data[id-1] = newData;
    }
    addImgurl(newImgurl,id) {
      global.imageurl[id-1] = newImgurl;
    }
    addTime(newTime,id) {
      global.time[id-1] = newTime;
    }

    componentDidMount() {
      Orientation.lockToPortrait();
    }
  
    //fetch the news from the server
    async fetchContent() {

      for(this.loadnum ; this.loadnum <= this.state.size; this.loadnum++)
    {

      this.addNum(this.loadnum);

        fetch(API_URL + '/auth/getevent/' + this.loadnum, {
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
          if(response == "Unauthenticated."){
            // Toast.show({
            //   text: 'Unauthenticated !!',
            //   buttonText: 'Okay'
            // })
            }else {
              this.addTitle(responseJson.title,responseJson.id);
              this.addAuthor(responseJson.author,responseJson.id);
              this.addData(responseJson.data,responseJson.id);
              this.addTime(responseJson.time,responseJson.id);
              this.addImgurl(responseJson.imageurl,responseJson.id);
              this.forceUpdate();
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
  
}

async UNSAFE_componentWillMount() {
  
  if(window._update== "yes")
  {
    this.props.navigation.navigate('update');
  }
  fetch(API_URL + '/auth/getsize', {
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
    if(response == "Unauthenticated." && window._username != undefined){
      }else {
        this.setState({size : responseJson.size});
        this.forceUpdate();
        if(window._token != '')
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
  
    this.setState({loading : true});
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
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Root>
      <Container>
        <Header > 
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
            <Title>پیام ها</Title>
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
            dataSource={this.ds.cloneWithRows(global.num)}
            renderRow={rowData =>
              <ListItem noBorder style={{height:100}} avatar>
                  <Left style={{height:100,flexDirection:"column"}}>
                  <Thumbnail style={{marginTop:10}} source={{isStatic:true,uri : global.imageurl[rowData-1]}} />
                  <Text note>{global.author[rowData-1]}</Text>
                </Left>
                <Body style={{height:100}}>
                </Body>
                <Right style={{height:100, marginRight:5}}>
                <Badge success>
                <Text>{global.title[rowData-1]}</Text>
                </Badge>
                  <Text note>{global.time[rowData-1]}</Text>
                  <Text style={{marginTop:10,height:100}}>{global.data[rowData-1]}</Text>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
      </Root>
    );
  }
}