import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';
import { Container,Title, Root, Header,Button, Content,Icon,Toast, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import {
  ListView,
} from "react-native";

export default class ListAvatarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {size:0 ,loading : false};

    global.title = [];
    global.num = [];
    global.time = [];
    global.data = [];
    global.author = [];
    global.imageurl = [];
      }
      loadnum = 1;
    
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

    async UNSAFE_componentWillMount() {

      for(this.loadnum ; this.loadnum <= this.state.size; this.loadnum++)
    {

      this.addNum(this.loadnum);

        fetch(API_URL + '/auth/getcontent/' + this.loadnum, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhZGM3NTc2OTMxODNiOWFlMTU1YTM0OTMyYjMzOWE1NWU3MmQ5NzAzOTg0Y2M5OTBhNTU4NDM3M2Y3NjQ0MjYwMWZlOGM4Y2MzMjBlNDExIn0.eyJhdWQiOiIxIiwianRpIjoiYmFkYzc1NzY5MzE4M2I5YWUxNTVhMzQ5MzJiMzM5YTU1ZTcyZDk3MDM5ODRjYzk5MGE1NTg0MzczZjc2NDQyNjAxZmU4YzhjYzMyMGU0MTEiLCJpYXQiOjE1MzIxNTk0NjQsIm5iZiI6MTUzMjE1OTQ2NCwiZXhwIjoxNTYzNjk1NDYzLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.AHJSzNRuvKwFP3BAoWjXTlCzRchqTTffIXw971p6V5f0J82uJr1sFdGLqs_9wVGYh3Lo5dcF22KO_1oEj95eT4_GjPjSej6SEPLxHny8Hyvf9Nm-Qxo_Kk3YrcRsOOd7Ney5TQou1Srz0UtlW3JLEm7JJ3N4EXKlLGrUPWhUZF13E_PcCvrZhD9BW9TsoljBGCQ6jtzAQFn4XMMk48C7aO9_e__EPxX47DUCcqC6iGVeYBF-yR9nqyU0_XM41_94FBU9nfp5iRwaaHIfpPWw91lNrOibmNg71W5fIalZ6fUksZtDjYHjM1V1Zf3JAJCcJhNbFdkOBH_eJ5FQZOvWXprojeqGMK8CCKTtwzEemQ9PfS4tF3ptllLvu0SfmzZWOXZBWKjDuPe9AzkFoBKYzqV7DM0HYO2tPyrhnj1-LDFRXA2uvFepHa2xMdrO7dLv56Rh7qRWhHpNyKScoLzG0BqyEw_j76oPg00KqdCj4jNnNQbzl391UAxNzhSadhdMX9c8GtB0dkxh46Mw0LrGSqcjjqpAQJj4ez0_GtzxMNkU-EV3CqrhLb1EEcTYfvxFcD6gpI_la376aYHNLOVCT3SHEkF-tz4FEpLxdQH7owlx-C6FQsHVOu6kDdIJPo3ZdYqOfJh3KwR0JqAWeL-yd8HytF4N1FMSR4mX13tkShk',
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({loading : false});
          response = ""+responseJson.message;
          if(response == "Unauthenticated."){
            Toast.show({
              text: 'Unauthenticated !!',
              buttonText: 'Okay'
            })
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
          console.error(error);
        });     
  }
    }
    async fetchContent() {

      for(this.loadnum ; this.loadnum <= this.state.size; this.loadnum++)
    {

      this.addNum(this.loadnum);

        fetch(API_URL + '/auth/getcontent/' + this.loadnum, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhZGM3NTc2OTMxODNiOWFlMTU1YTM0OTMyYjMzOWE1NWU3MmQ5NzAzOTg0Y2M5OTBhNTU4NDM3M2Y3NjQ0MjYwMWZlOGM4Y2MzMjBlNDExIn0.eyJhdWQiOiIxIiwianRpIjoiYmFkYzc1NzY5MzE4M2I5YWUxNTVhMzQ5MzJiMzM5YTU1ZTcyZDk3MDM5ODRjYzk5MGE1NTg0MzczZjc2NDQyNjAxZmU4YzhjYzMyMGU0MTEiLCJpYXQiOjE1MzIxNTk0NjQsIm5iZiI6MTUzMjE1OTQ2NCwiZXhwIjoxNTYzNjk1NDYzLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.AHJSzNRuvKwFP3BAoWjXTlCzRchqTTffIXw971p6V5f0J82uJr1sFdGLqs_9wVGYh3Lo5dcF22KO_1oEj95eT4_GjPjSej6SEPLxHny8Hyvf9Nm-Qxo_Kk3YrcRsOOd7Ney5TQou1Srz0UtlW3JLEm7JJ3N4EXKlLGrUPWhUZF13E_PcCvrZhD9BW9TsoljBGCQ6jtzAQFn4XMMk48C7aO9_e__EPxX47DUCcqC6iGVeYBF-yR9nqyU0_XM41_94FBU9nfp5iRwaaHIfpPWw91lNrOibmNg71W5fIalZ6fUksZtDjYHjM1V1Zf3JAJCcJhNbFdkOBH_eJ5FQZOvWXprojeqGMK8CCKTtwzEemQ9PfS4tF3ptllLvu0SfmzZWOXZBWKjDuPe9AzkFoBKYzqV7DM0HYO2tPyrhnj1-LDFRXA2uvFepHa2xMdrO7dLv56Rh7qRWhHpNyKScoLzG0BqyEw_j76oPg00KqdCj4jNnNQbzl391UAxNzhSadhdMX9c8GtB0dkxh46Mw0LrGSqcjjqpAQJj4ez0_GtzxMNkU-EV3CqrhLb1EEcTYfvxFcD6gpI_la376aYHNLOVCT3SHEkF-tz4FEpLxdQH7owlx-C6FQsHVOu6kDdIJPo3ZdYqOfJh3KwR0JqAWeL-yd8HytF4N1FMSR4mX13tkShk',
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({loading : false});
          response = ""+responseJson.message;
          if(response == "Unauthenticated."){
            Toast.show({
              text: 'Unauthenticated !!',
              buttonText: 'Okay'
            })
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
          console.error(error);
        });    
        Toast.show({
          text: 'Updating.',
          buttonText: 'Okay'
        }) 

  }
  
}

UNSAFE_componentWillMount() {
    this.setState({loading : true});
        fetch(API_URL + '/auth/getsize', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhZGM3NTc2OTMxODNiOWFlMTU1YTM0OTMyYjMzOWE1NWU3MmQ5NzAzOTg0Y2M5OTBhNTU4NDM3M2Y3NjQ0MjYwMWZlOGM4Y2MzMjBlNDExIn0.eyJhdWQiOiIxIiwianRpIjoiYmFkYzc1NzY5MzE4M2I5YWUxNTVhMzQ5MzJiMzM5YTU1ZTcyZDk3MDM5ODRjYzk5MGE1NTg0MzczZjc2NDQyNjAxZmU4YzhjYzMyMGU0MTEiLCJpYXQiOjE1MzIxNTk0NjQsIm5iZiI6MTUzMjE1OTQ2NCwiZXhwIjoxNTYzNjk1NDYzLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.AHJSzNRuvKwFP3BAoWjXTlCzRchqTTffIXw971p6V5f0J82uJr1sFdGLqs_9wVGYh3Lo5dcF22KO_1oEj95eT4_GjPjSej6SEPLxHny8Hyvf9Nm-Qxo_Kk3YrcRsOOd7Ney5TQou1Srz0UtlW3JLEm7JJ3N4EXKlLGrUPWhUZF13E_PcCvrZhD9BW9TsoljBGCQ6jtzAQFn4XMMk48C7aO9_e__EPxX47DUCcqC6iGVeYBF-yR9nqyU0_XM41_94FBU9nfp5iRwaaHIfpPWw91lNrOibmNg71W5fIalZ6fUksZtDjYHjM1V1Zf3JAJCcJhNbFdkOBH_eJ5FQZOvWXprojeqGMK8CCKTtwzEemQ9PfS4tF3ptllLvu0SfmzZWOXZBWKjDuPe9AzkFoBKYzqV7DM0HYO2tPyrhnj1-LDFRXA2uvFepHa2xMdrO7dLv56Rh7qRWhHpNyKScoLzG0BqyEw_j76oPg00KqdCj4jNnNQbzl391UAxNzhSadhdMX9c8GtB0dkxh46Mw0LrGSqcjjqpAQJj4ez0_GtzxMNkU-EV3CqrhLb1EEcTYfvxFcD6gpI_la376aYHNLOVCT3SHEkF-tz4FEpLxdQH7owlx-C6FQsHVOu6kDdIJPo3ZdYqOfJh3KwR0JqAWeL-yd8HytF4N1FMSR4mX13tkShk',
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({loading : false});
          response = ""+responseJson.message;
          if(response == "Unauthenticated."){
            Toast.show({
              text: 'Unauthenticated !!',
              buttonText: 'Okay'
            })
            }else {
              this.setState({size : responseJson.size});
          }
        })
        .catch((error) => {
          console.error(error);
        });     
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
            <Title>صفحه اصلی</Title>
          </Body>
        </Header>
        <Content>
        <ListView  enableEmptySections={true}  dataSource={ 
            new ListView.DataSource(
                {
                    rowHasChanged: (r1, r2) => r1 !== r2 && r1.data !== r2.data && r1.num !== r2.num
                }
                ).cloneWithRows(global.num)} 
            renderRow={
                (rowData) => 
                <ListItem avatar>
                  <Left>
                  <Thumbnail source={{uri : global.imageurl[rowData-1]}} />
                </Left>
                <Body>
                  <Text>{global.title[rowData-1]}</Text>
                  <Text note>{global.author[rowData-1]}</Text>
                </Body>
                <Right>
                  <Text note>{global.time[rowData-1]}</Text>
                </Right>
              </ListItem>
            } />
        </Content>
        <Button style = {{marginBottom : 5}}onPress={()=>{
          this.fetchContent();
        }}>
        <Icon name ="refresh"/>
        </Button>
      </Container>
      </Root>
    );
  }
}