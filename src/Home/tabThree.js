
import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';
import { BackHandler } from "react-native";
import { Container,Root,Content,ListItem,Text, Left, Body, Right} from 'native-base';
export default class ListThumbnail5Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: [],
      loading : false
    };

    }


    //this tab doesnt have any content yet


  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
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
        <Content>
        <ListItem noBorder style={{flex:1 , marginBottom: 10}} thumbnail>
               <Left>
                   {/* <Thumbnail square source={{isStatic:true,uri : global.imageurl[rowData]}} /> */}
                </Left>
                <Body>
                  <Text style={{alignSelf:"flex-end"}}>متاسفانه این قسمت هنور فعال نشده است.</Text>
                  <Text style={{alignSelf:"flex-end"}}note numberOfLines={1}></Text>
                </Body>
                <Right>
                 
                </Right>
              </ListItem>
        </Content>
      </Container>
      </Root>
    );
  }
}