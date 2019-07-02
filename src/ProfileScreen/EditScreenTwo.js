import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';
import { AsyncStorage,BackHandler } from "react-native";
import { Container, Header,Toast,Root,Title, Content, ListItem,Button, Text, Icon, Left, Body, Right } from 'native-base';
export default class ListISconExample extends Component {
  constructor(props) {
    super(props);
    this.state = {username:"",email:"",phone:"",creditID:"",money:""};
      }

      componentDidMount() {
        Orientation.lockToPortrait();
      }

    _retrieveData = async () => {
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
              }else {
                window._username = responseJson.email;
                fetch(API_URL + '/auth/getInfo/' + window._username, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                    'Authorization' : 'Bearer ' + window._token
                  },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({loading : false});
                  response = ""+responseJson.message;
                  if(response == "Unauthenticated."){
                    }else {
                      this.setState({
                        username : responseJson.name,
                        email: responseJson.email,
                        phone: responseJson.phone,
                        creditID : responseJson.credit_id,
                        sex : responseJson.sex,
                        birthday : responseJson.birthday,
                        money : responseJson.money
                      });
                      if(responseJson.money == "null")
                      {
                        this.setState({money : '0'});
                      }
                  }
                })
                .catch((error) => {
                });  
                this.forceUpdate();
            }
          })
        }
      } catch (error) {
         // Error retrieving data
       }
      }

  UNSAFE_componentWillMount(){
    this._retrieveData();
    fetch(API_URL + '/auth/getInfo/' + window._username, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
        'Authorization' : 'Bearer ' + window._token
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
          this.setState({
            username : responseJson.name,
            email: responseJson.email,
            phone: responseJson.phone,
            creditID : responseJson.credit_id,
            sex : responseJson.sex,
            birthday : responseJson.birthday
          });
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

  componentWillMount() {
    // console.disableYellowBox = true;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Homeindex');
      return true;
    });

  }
  
  
  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
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
            <Title>اطلاعات</Title>
          </Body>
        </Header>
        <Content>
          <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
              <Text style={{textAlign:'left'}}>{this.state.username}</Text>
            </Body>
            <Right>
              <Text>نام:</Text>
              </Right>
          </ListItem>
          <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="star" />
              </Button>
            </Left>
            <Body>
              <Text style={{textAlign:'left'}}>{this.state.money}</Text>
            </Body>
            <Right>
              <Text>شارژ:</Text>
            </Right>
          </ListItem>
          <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="chatboxes" />
              </Button>
            </Left>
            <Body>
              <Text style={{textAlign:'left'}}>{this.state.email}</Text>
            </Body>
            <Right>
              <Text>ایمیل:</Text>
            </Right>
          </ListItem>
          <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="keypad" />
              </Button>
            </Left>
            <Body>
              <Text style={{textAlign:'left'}}>{this.state.phone}</Text>
            </Body>
            <Right>
              <Text>شماره موبایل:</Text>
            </Right>
          </ListItem>
          <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="ios-book" />
              </Button>
            </Left>
            <Body>
              <Text style={{textAlign:'left'}}>{this.state.creditID}</Text>
            </Body>
            <Right>
              <Text>شماره ملی:</Text>
            </Right>
          </ListItem>

          <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="ribbon" />
              </Button>
            </Left>
            <Body>
              <Text style={{textAlign:'left'}}>{this.state.birthday}</Text>
            </Body>
            <Right>
              <Text >تاریخ تولد:</Text>
            </Right>
          </ListItem>

          <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="contacts" />
              </Button>
            </Left>
            <Body>
              <Text style={{textAlign:'left'}} >{this.state.sex}</Text>
            </Body>
            <Right>
              <Text>جنسیت:</Text>
            </Right>
          </ListItem>

          <Button
            block
            rounded
            primary
            style={{marginBottom: 10,marginTop: 20, marginHorizontal:30,
              justifyContent: "center",
              alignItems: "center"}}
            onPress={()=>{this.props.navigation.navigate('updateuser')}}

          >
            <Text>تکمیل اطلاعات</Text>
          </Button>

        </Content>
      </Container>
      </Root>
    );
  }
}