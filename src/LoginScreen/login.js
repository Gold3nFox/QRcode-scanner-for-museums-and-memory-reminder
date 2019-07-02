import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import { Sae,Hoshi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React, { Component,resizeMode } from 'react';
import {Image} from 'react-native';
import firebase from 'react-native-firebase';
import {
    Button,
    Text,
    Container,
    Card,
    Root,
    CardItem,
    Body,
    Content,
    Header,
    Toast,
    Title,
    Label,
    Left,
    Icon,
    Form,
    Badge,
    Item,
    Input,
    Right
  } from "native-base";
import { DrawerNavigator } from "react-navigation";
import { AsyncStorage,TextInput } from "react-native";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {Username : "" , Password : "" , loading : false, token : ""};
          }
    static navigationOptions = {
      title: 'login',
      };
      //save token for next login
     _storeData = async (newtoken) => {
      try {
        await AsyncStorage.setItem('key:Token',newtoken);
      } catch (error) {
        // Error saving data
      }
    }

    
          usernameUpdate(value) {
            this.setState({
              Username: value
            });
          }
          
          passwordUpdate(value) {
            this.setState({
              Password: value
            });
          }

          loginHandler(){
            this.setState({loading : true});
            const { navigate } = this.props.navigation;
            fetch(API_URL + '/auth/login', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
              },
              body: JSON.stringify({
                email: this.state.Username,
                password: this.state.Password,
                name: this.state.Username,
                rememberme: "true",
              }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({loading : false});
              response = ""+responseJson.access_token;
              if(response == "undefined"){
                Toast.show({
                  text:  "اطلاعات وارد شده معتبر نیست",
                })
               }else {
                 this._storeData(responseJson.access_token);
                 this.setState({token :responseJson.access_token});
                 window._token = responseJson.access_token;
                 window._username = this.state.Username;
                 this.props.navigation.navigate('Homeindex');
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

          focusPasswordInput() {
            this.textInput._root.focus();
        }
          

  render() {
    return (
      <Root>
        <Container style ={{flex : 1}} >
        <Image
          style={{width: '100%', height: '100%',opacity:0.8,position:'absolute'}}
          source={{uri : "https://khaterat.mobi/js/cover.png"}}
        />
        <Header> 
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>خوش آمدید</Title>
          </Body>
        </Header>
        <Content>
          <Form style = {{marginTop : 150,marginHorizontal:20}}>
              <Item floatingLabel>
              <Icon style ={{color:'lightblue'}} active name="person" />
              <Input returnKeyType={ "next" } blurOnSubmit={false}  onChangeText={this.usernameUpdate.bind(this)} onSubmitEditing={() => this.focusPasswordInput()} />
              <Label style ={{alignSelf:"flex-end", color:'lightblue'}}>ایمیل :</Label>
              </Item>


              <Item floatingLabel>
              <Icon style ={{color:'lightblue'}}active name="lock" />
              <Input getRef={(input) => { this.textInput = input; }} returnKeyType={ "done" } textContentType="password" secureTextEntry={true} onChangeText={this.passwordUpdate.bind(this)}/>
              <Label style ={{alignSelf:"flex-end",color:'lightblue'}}>رمز عبور :</Label>
              </Item>

          </Form>


          <Button
            block
            rounded
            primary
            style={{marginBottom: 10,marginTop: 20, marginHorizontal:30,
              justifyContent: "center",
              alignItems: "center"}}
            onPress={() => {
              this.loginHandler();
            }}
          >
            <Text>ورود</Text>
          </Button>
          <Text style={{alignSelf:"center"}}> یا</Text>
          <Button
          block 
          rounded
            dark
            style={{marginBottom: 10,marginTop :10 ,marginHorizontal :30}}
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}
          >
            <Text>ثبت نام</Text>
          </Button>


          {/* <Button
          transparent
            block
            dark
            
            style={{marginBottom: 10,marginTop: 10 ,alignSelf: "center"}}
            onPress={() => {
              if(this.state.Username == "")
              {
                Toast.show({
                  text: 'Fill username field first',
                  buttonText: 'Okay'
                });
              }else{
              Toast.show({
                text: 'Sent an email to ' + this.state.Username,
                buttonText: 'Okay'
              });
            }}}
          >
            <Text>فراموش کردم</Text>
          </Button> */}

        </Content>
      </Container>
      </Root>
    )
  }
};
