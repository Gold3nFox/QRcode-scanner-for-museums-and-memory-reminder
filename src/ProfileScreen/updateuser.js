import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';
import { View,BackHandler } from "react-native";
import {Input,Picker, Container, Header,Toast,Root,Title, Content, ListItem,Button, Text, Icon, Left, Body, Right } from 'native-base';
const PersianCalendarPicker = require('react-native-persian-calendar-picker');
export default class ListIckonExample extends Component {
  constructor(props) {
    super(props);
    this.state = {showdate:false,username:"",email:"",phone:"",creditID:0,sex:"",birthday:""};
      }

      onValueChange(value) {
        this.setState({
          sex: value
        });
      }
      

      usernameUpdate(value) {
        this.setState({
          username: value
        });
      }

      creditIDUpdate(value) {
        if(!isNaN(value)){
          alert(value);
        this.setState({
          creditID: value
        });
      }
      }

      birthdaydayUpdate(value) {
        this.setState({
          birthday: value
        });
      }

      birthdaymonthUpdate(value) {
        this.setState({
          birthday: value
        });
      }

      birthdayyearUpdate(value) {
        this.setState({
          birthday: value
        });
      }

      sexUpdate(value) {
        this.setState({
          sex: value
        });
      }

      componentDidMount() {
        Orientation.lockToPortrait();
      }


  UNSAFE_componentWillMount(){
    
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
      if(this.state.showdate == true){
        this.setState({showdate:false});
      }else{
        this.props.navigation.navigate('myProfile');
      }
      return true;
    });

  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

updatedata(){
      fetch(API_URL + '/auth/updateuser?&email=' + window._username+'&name='+this.state.username+'&credit_id='+this.state.creditID+'&sex='+this.state.sex+'&birthday='+this.state.birthday, {
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
        if(response == ""){
          }else {
            Toast.show({
              text: 'اطلاعات تکمیل شد',
              buttonText: 'فهمیدم'
            });

            this.props.navigation.navigate('myProfile');

        }
      })
      .catch((error) => {
      });  
  }

  renderme(){
    //if he clicks on the date we show edit date calendar
    //otherwise we show the main edit page 
    if(this.state.showdate == true){
      return(
        <Content>
        <PersianCalendarPicker
                />
        <View>
        </View>
            
            <Button
            block
            rounded
            primary
            style={{marginBottom: 10,marginTop: 20, marginHorizontal:30,
              justifyContent: "center",
              alignItems: "center"}}

            onPress={() => {
                this.setState({birthday:window._mycustomdate,showdate:false});
            }}
          >
            <Text>ثبت</Text>
          </Button>

        </Content>
        );

    }else{
      return(
        <Content>
      <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
            <Input blurOnSubmit={false} style={{textAlign:'left'}} value={this.state.username+""} blurOnSubmit={false} returnKeyType={ "next" }   onChangeText={this.usernameUpdate.bind(this)}/>
            </Body>
            <Right>
              <Text>نام:</Text>
              </Right>
          </ListItem>
          <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="ios-book" />
              </Button>
            </Left>
            <Body>
            <Input   getRef={(input) => { this.passInput = input; }} style={{textAlign:'left'}}blurOnSubmit={false} returnKeyType={ "done" } value={this.state.creditID+""}   onChangeText={this.creditIDUpdate.bind(this)}/>
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
            <Button
            rounded
            primary
            transparent

            onPress={() => {
                this.setState({showdate:true});
            }}
          >
            <Text style={{textAlign:'left',marginLeft:-10}}>{this.state.birthday}</Text>
          </Button>
            </Body>
            <Right>
              <Text>تاریخ تولد:</Text>
            </Right>
          </ListItem>

          <ListItem noBorder icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="contacts" />
              </Button>
            </Left>
            <Body>
            <Picker
              mode="dropdown"
              style={{ width:85 }}
              selectedValue={this.state.sex}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="مرد" value="مرد" />
              <Picker.Item label="زن" value="زن" />
            </Picker>
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

              onPress={()=>{
                this.updatedata();
              }}

          >
            <Text>ثبت</Text>
          </Button>
          </Content>);
    }

  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <Root>
      <Container>
      <Header> 
        <Left>
            <Button
              transparent
              onPress={() => {
                if(this.state.showdate){
                  this.setState({showdate:false});
                }else
                  this.props.navigation.navigate('myProfile')}
            }
          >
          <Icon name='arrow-back' />
            </Button>
          </Left>
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>تکمیل اطلاعات</Title>
          </Body>
        </Header>
        
       {this.renderme()}
          

      </Container>
      </Root>
    );
  }
}