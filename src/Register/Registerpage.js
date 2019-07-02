import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';
import {
    Button,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Toast,
    Content,
    Label,
    Header,
    Title,
    Left,
    Icon,
    Form,
    Badge,
    Item,
    Input,
    Right,
    Root
  } from "native-base";
import { Image,ScrollView,Alert } from 'react-native';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {Username : "" ,credit_id : "", Password : "",Password2: "", Email :"" , Phone :"" ,loading : false};
          }
    
          componentDidMount() {
            Orientation.lockToPortrait();
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

          password2Update(value) {
            this.setState({
              Password2: value
            });
          }

          EmailUpdate(value) {
            this.setState({
              Email: value
            });
          }

          phoneUpdate(value){
            this.setState({
                Phone: value
              });
          }

          creditUpdate(value){
            this.setState({
              credit_id : value
            });
          }

          signupHandler(){
            this.setState({loading : true});
            const { navigate } = this.props.navigation;
            fetch(API_URL + '/auth/signup?name='+this.state.Username+'&email='+this.state.Email+'&phone='+this.state.Phone+'&password='+this.state.Password+'&password_confirmation='+this.state.Password2, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
               }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({loading : false});
              if(responseJson.message == 'Successfully created user!'){
                Alert.alert(
  
                  // This is Alert Dialog Title
                  // " قیمت " +content + " است ",
                  "سلام " +this.state.Username,
              
                  // This is Alert Dialog Message. 
                  // 'برای استفاده باید آن را بخرید',
                  'ثبت نام شما با موفقیت انجام شد.',
                  [
                    // First Text Button in Alert Dialog.
                    {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
                    
                  ]
              
                )
                this.props.navigation.navigate("Login");
               }else {
                 if(responseJson.errors !=undefined){
                   if(this.state.name == "" | this.state.Email == "" | this.state.Password == "" | this.state.Phone == ""){
                    Toast.show({
                      text: 'همه ی فیلد ها اجباری است و باید پر شود',
                      duration: 3000,
                    });
                   }
                   else if(this.state.Password2 != this.state.Password)
                   {
                    Toast.show({
                      text: 'عدم تطابق رمزعبور و تکرار رمز عبور',
                      duration: 3000,
                    });
                   }else if(this.state.Phone.length != 11){
                    Toast.show({
                      text: 'شماره مبایل معتبر نیست',
                      duration: 3000,
                    });
                   }else{
                    Toast.show({
                      text: 'ایمیل شما قبلا در سیستم ثبت شده',
                      duration: 3000,
                    });
                   }
                    
                  }
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
          

  render() {
    return (
      <Root>
        
        <Container>
        <Image
          style={{width: '100%', height: '100%',opacity:0.8,position:'absolute'}}
          source={{uri : "https://khaterat.mobi/js/cover.png"}}
        />
        <Header> 
        <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('Login')}}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>ثبت نام</Title>
          </Body>
        </Header>
        <Content>
          <Form style = {{marginTop : 10,marginHorizontal:20}}>
             <Item floatingLabel >
             <Icon style ={{color:'lightblue'}} active name="person" />
              <Label style ={{alignSelf:"flex-end",color:'lightblue'}}>نام :</Label>
              <Input blurOnSubmit={false} returnKeyType={ "next" }   onChangeText={this.usernameUpdate.bind(this)} onSubmitEditing={() => this.passInput._root.focus()}/>
              </Item>

            <Item floatingLabel>
            <Icon style ={{color:'lightblue'}} active name="lock" />
            <Label style ={{alignSelf:"flex-end",color:'lightblue'}}>رمز عبور :</Label>
              <Input  blurOnSubmit={false} returnKeyType={ "next" }   getRef={(input) => { this.passInput = input; }} textContentType="password" secureTextEntry={true} onChangeText={this.passwordUpdate.bind(this)} onSubmitEditing={() => this.pass2Input._root.focus()}/>
            </Item>

            <Item floatingLabel>
            <Icon style ={{color:'lightblue'}} active name="lock" />
            <Label style ={{alignSelf:"flex-end",color:'lightblue'}}>تکرار رمز عبور :</Label>
              <Input  blurOnSubmit={false} returnKeyType={ "next" }   getRef={(input) => { this.pass2Input = input; }} textContentType="password" secureTextEntry={true} onChangeText={this.password2Update.bind(this)} onSubmitEditing={() => this.mailInput._root.focus()}/>
            </Item>

            <Item floatingLabel>
            <Icon style ={{color:'lightblue'}} active name="md-mail" />
            <Label style ={{alignSelf:"flex-end",color:'lightblue'}}>ایمیل :</Label>
              <Input blurOnSubmit={false} returnKeyType={ "next" }   getRef={(input) => { this.mailInput = input; }}   onChangeText={this.EmailUpdate.bind(this)} onSubmitEditing={() => this.numInput._root.focus()}/>
            </Item>
            
            <Item floatingLabel>
            <Icon style ={{color:'lightblue'}} active name="md-call" />
            <Label style ={{alignSelf:"flex-end",color:'lightblue'}}>شماره موبایل :</Label>
              <Input  getRef={(input) => { this.numInput = input; }} returnKeyType={ "done" }   onChangeText={this.phoneUpdate.bind(this)} />
            </Item>

            

          </Form>


          <Button
          block
            rounded
            primary
            style={{ marginBottom: 10,marginTop: 20 ,marginHorizontal:30,
              justifyContent: "center",
              alignItems: "center"}}
            onPress={() => { this.signupHandler(); }}
          >
            <Text>ثبت نام</Text>
          </Button>

        </Content>
      </Container>
      </Root>
    )
  }
};
