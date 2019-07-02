import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';


import { Image,ListView,Alert,WebView } from 'react-native';
import {Item,Input, View,Separator,Container, Header,Title,Root ,Toast,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class Content6Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      subject: "",
      price : "",
      imageurl :"",
      eventdate : "",
      created_at: "",
      author: "",
      search: "",
      loading : false,
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    global.nums = [];
    global.daysubs = [];
    global.daydes = [];
    global.daydate = [];
    global.dayimg = [];
    global.dayimg2 = [];
    global.msubj = [];
    global.subj = [];
    global.height = [];
    global.btnname = [];
    }


    componentWillMount() {
      if(window._username != "")
        this.makeScene();
  }

  



  makeScene(){
    this.forceUpdate();
  }


  //this function searchs the input word on all of the memories
  async fetchPurchased() {
      if(this.state.search.length <= 1){
        Toast.show({
            text: "متن برای جستجو باید حداقل دو حرف داشته باشد",
            position: "bottom",
            duration: 3000,
          });
      }else{
    if(window._username == undefined){
      return;
    }else{
      this.setState({loading : true});
      fetch(API_URL + '/auth/mysearch/' + this.state.search, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({loading : false});
        response = ""+responseJson;
        if(response != "undefined"){
        if(response == "Unauthenticated."){
          
          }else {
            var count = Object.keys(responseJson).length;
            for(let i = 0 ; i < count; i++){
              if(responseJson[i] != undefined){
                global.daysubs[i] = responseJson[i].subject;
                global.height[i] = 150;
                global.daydes[i] = responseJson[i].description;
                global.daydate[i] = responseJson[i].shamsi_date;
                global.dayimg[i] = responseJson[i].imageurl;
                global.dayimg2[i] = responseJson[i].secondimageurl;
                global.nums[i] = i;
                global.subj[i] = responseJson[i].subj;
                global.msubj[i] = responseJson[i].msubj;
                global.btnname[i] = "بیشتر";
              }
            }
            if(count == 0){
                Toast.show({
                    text: "نتیجه ای برای "+this.state.search+" یافت نشد.",
                    position: "bottom",
                    duration: 3000,
                  });
            }
            this.setState({loading : false});
            this.forceUpdate();
        }
      }
      })
      .catch((error) => {
        this.setState({loading : false});
        Toast.show({
          text: error,
          buttonText: "Okay",
          position: "top",
          duration: 3000,
          textStyle: { color: "red" }
        });
      });    
  }}}

  componentDidMount() {
    Orientation.lockToPortrait();
  }
  
  inputsearch(value) {
    this.setState({
      search: value
    });
  }

  settextmore(rowData)
  {
    if(global.height[rowData] == 150)
      return "..."
    else
      return ""
  }

  textindex(rowData){
      if(global.height[rowData] == 150){
          return(global.daydes[rowData].substring(0,150).lastIndexOf(" "));
      }else{
        return(global.height[rowData]);
      }
  }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Root>
      <Container>
      <Image
          style={{width: '100%', height: '100%',opacity:0.8,position:'absolute'}}
          source={require('./backgroundbtn.jpg')}
        />
        <Header searchBar rounded>
        <Left>
        <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer()}}
            >
              <Icon name="menu" />
            </Button>
          </Left>
            <Item>
            <Icon name="ios-search" />
            <Input placeholder="جستجو" value= {this.state.search} onChangeText={this.inputsearch.bind(this)} onSubmitEditing={() => this.fetchPurchased()} />
            <Icon name="bookmarks" />
          </Item>
          
        </Header>
        <Content >
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
        dataSource={this.ds.cloneWithRows(global.nums)}
            renderRow={rowData =>
              <Card style={{flex: 0}}>
              <CardItem style={{backgroundColor:'lightblue'}}>

                <Right style = {{flex:1,}}>
                <Text style = {{color:'red',fontSize: 10,textAlign:'center',alignSelf: "center"}}>{global.subj[rowData]} از {global.msubj[rowData]}</Text>
                </Right>

              </CardItem>
              <CardItem>
                <Left>
                  <Thumbnail source={{isStatic:true,uri: global.dayimg[rowData]}} />
                </Left>
                <Body>
                  <Text style = {{textAlign:'center',alignSelf: "center"}}>{global.daysubs[rowData]}</Text>
                  </Body>
                <Right>
                  <Text style={{marginTop:15,textAlign:'right',direction:'rtl'}} note>{global.daydate[rowData]}</Text>
                  </Right>
              </CardItem>
              <CardItem >
                <Body>
                <View style={{flex: 1, flexDirection:'column'}}>
                  <Image source={{isStatic:true,uri: global.dayimg2[rowData]}} style={{alignSelf:'center',height: 200, width: 200, flex: 1 , marginBottom:15}}/>
          
    <Text note style ={{textAlign: 'right', alignSelf: 'stretch'}}>
                    {global.daydes[rowData].substring(0,this.textindex(rowData)) + this.settextmore(rowData)}
                  </Text>
                  </View>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                <Button 
                  onPress={() => {
                    Alert.alert(
  
                      // This is Alert Dialog Title
                      // " قیمت " +content + " است ",
                      "به زودی ..",
                  
                      // This is Alert Dialog Message. 
                      // 'برای استفاده باید آن را بخرید',
                      'نظرات در این نسخه غیر فعال است.',
                      [
                        // First Text Button in Alert Dialog.
                        {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
                        
                      ]
                  
                    )
                    }}
                   transparent textStyle={{color: '#87838B'}}>
                    <Icon style={{marginLeft: 20,}} name="ios-text" />
                    <Text>نظرات</Text>
                  </Button>
                </Left>
                <Body></Body>
                <Right>
                  <Button 
                  onPress={() => {
                    
                    if(global.btnname[rowData] == "بیشتر")
                    {
                      global.height[rowData] = global.daydes[rowData].lenght;
                      global.btnname[rowData] = "کمتر";
                      this.forceUpdate();
                    }else{
                      global.height[rowData] = 150;
                      global.btnname[rowData] = "بیشتر";
                      this.forceUpdate();
                    }
                    
                    }}
                   transparent textStyle={{color: '#87838B'}}>
                    <Icon style={{marginLeft: 20,}} name="ios-more" />
                    <Text>{global.btnname[rowData]}</Text>
                  </Button>
                </Right>
              </CardItem>

            </Card>
            }/>
        </Content>
      </Container>
      </Root>
    );
  }
}