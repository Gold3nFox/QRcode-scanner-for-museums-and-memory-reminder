
import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
var DATA =[];
import React, { Component } from 'react';
import { AsyncStorage } from "react-native";
import {ListView,Alert} from 'react-native';
import { Container,Root, Header,Toast,Badge, Content,Icon, List, ListItem,Title, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
export default class ListThumbnail2Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: [],
      loading : false,
      empty : "0"
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    global.rendernum = [];
    global.subjects = [];
    global.descriptions = [];
    global.imageurl = [];
    global.id = [];
    global.icon = [];
    }



    componentWillMount() {
      this.fetchContent();
      this.forceUpdate();
    }

    componentDidMount() {
      Orientation.lockToPortrait();
    }

  async fetchContent() {
    if(window._username == undefined){
      return;
    }else{
      this.setState({loading : true});
      fetch(API_URL + '/auth/getSubjects/'+ this.props.navigation.getParam('id'), {
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
        if(response == "Unauthenticated." || responseJson == "nothing"){
          this.setState({loading : false,empty : '1'});
          }else {
            var count = Object.keys(responseJson).length;
            for(let i = 0 ; i < count; i++){
              global.rendernum[i] = i;
              global.subjects[i] = responseJson[i].Mainsubject;
              global.descriptions[i] = responseJson[i].Maindescription;
              global.imageurl[i] = responseJson[i].Mainimageurl;
              global.id[i] = responseJson[i].id;
              global.icon[i] = "square";
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

empty(){
  //if no memory exists in this subject show this
    if(this.state.empty == '1'){
        return(
            <ListItem noBorder style={{flex:1 , marginBottom: 10}} thumbnail>
               <Left>
                   {/* <Thumbnail square source={{isStatic:true,uri : global.imageurl[rowData]}} /> */}
                </Left>
                <Body>
                  <Text style={{alignSelf:"flex-end"}}> متاسفانه در این قسمت هنور محتوایی قرار نگرفته.</Text>
                  <Text style={{alignSelf:"flex-end"}}note numberOfLines={1}></Text>
                </Body>
                <Right>
                 
                </Right>
              </ListItem>
        );
    }
}

//triger checkbox icon
addpishnamayesh(rowData){
  if(global.icon[rowData] == "square")
      global.icon[rowData] = "checkbox";
  else
      global.icon[rowData] = "square";
  this.forceUpdate();
}

//add selected people to pishnamayesh
addtofav(){
  var count = Object.keys(global.icon).length;
  for(let i = 0 ; i < count; i++){
    if(global.icon[i] == "checkbox"){
      fetch(API_URL + '/auth/addpishnamayesh/'+ global.id[i] + '/'+window._username, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        response = ""+responseJson.message;
        if(response == "Unauthenticated." || responseJson == "nothing"){
          this.setState({loading : false});
          }else {
            this.forceUpdate();
            Toast.show({
              text: "موضوعات انتخاب شده به پیش نمایش اضافه شد",
              position: "bottom",
              duration: 3000,
              onClose:this.props.navigation.navigate('Homeindex'),
            });
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
                this.props.navigation.navigate('Homeindex')}}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>صفحه موضوعات</Title>
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
          {this.empty()}
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
                  <Button transparent onPress={() => {this.addpishnamayesh(rowData)
                  window._id = global.id[rowData];
                  window._thissubject = global.subjects[rowData];
                  }}>
                    <Icon name={global.icon[rowData]} ></Icon>  
                  </Button>
                </Right>
              </ListItem>}
              />
        </Content>
        <Button style={{alignSelf:'center' , bottom : 10}}iconLeft light onPress={() => {
          this.addtofav();
        }}>
            <Icon name='add-circle' />
            <Text>اضافه به پیش نمایش ها</Text>
          </Button>
      </Container>
      </Root>
    );
  }
}