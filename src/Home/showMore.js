import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';
import { Image,ListView,Alert,TouchableOpacity,BackHandler } from 'react-native';
import { Container, Header,Title,Root ,Toast,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class Content5Page extends Component {
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
      loading : false,
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    global.nums = [];
    global.daysubs = [];
    global.daydes = [];
    global.daydate = [];
    global.dayimg = [];
    global.dayimg2 = [];
    global.height = [];
    global.btnname = [];
    }


    componentWillMount() {
      if(window._username != "")
        this.makeScene();
  }

  textindex(rowData){
    if(global.height[rowData] == 150){
        return(global.daydes[rowData].substring(0,150).lastIndexOf(" "));
    }else{
      return(global.height[rowData]);
    }
}



  makeScene(){
    this.fetchPurchased();
    this.forceUpdate();
  }

  //fetch last 7 recent memories of this subject
  async fetchPurchased() {
    if(window._username == undefined){
      return;
    }else{
      this.setState({loading : true});
      fetch(API_URL + '/auth/loadDays/' + this.props.navigation.getParam('subject'), {
        method: 'GET',
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
                global.btnname[i] = "بیشتر";
              }
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
  }}

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('conIndex');
      return true;
    });
    Orientation.lockToPortrait();
  }


  componentWillUnmount() {
    this.backHandler.remove();
  }

  settextmore(rowData)
  {
    if(global.height[rowData] == 150)
      return "..."
    else
      return ""
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
        <Header> 
        <Left style={{flex : 0.2}}>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('conIndex')}}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>{this.props.navigation.getParam('mainsubj')}</Title>
          </Body>
        </Header>
        <Content getRef={(input) => { this.Scroller = input; }} >
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
              <CardItem>
                <Left>
                  <Thumbnail source={{isStatic:true,uri: global.dayimg[rowData]}} />
                </Left>
                <Body>
                  <Text style = {{textAlign:'center',alignSelf: "center"}}>{global.daysubs[rowData]}</Text>
                  </Body>
                <Right>
                {/* <Text style ={{textAlign: 'right', alignSelf: 'stretch'}}>
                    {this.state.author}
                  </Text> */}
                  <Text style={{marginTop:15,textAlign:'right',direction:'rtl'}} note>{global.daydate[rowData]}</Text>
                  </Right>
              </CardItem>
              <CardItem >
                <Body>
                  <TouchableOpacity
                    style={{alignSelf:'center',flex:1,width : 200,height:200}}
                    onPress={()=>{
                      Alert.alert(
  
                        // This is Alert Dialog Title
                        // " قیمت " +content + " است ",
                        "به زودی ..",
                    
                        // This is Alert Dialog Message. 
                        'چند رسانه ای در این نسخه غیر فعال است.',
                        [
                          // First Text Button in Alert Dialog.
                          // {text: 'نمیخوام', onPress: () => console.log('Ask me later Button Clicked')},
                          // Third OK Button in Alert Dialog
                          // {text: 'میخوام', onPress: () => this.props.navigation.navigate("bankView")},
                          {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
                          
                        ]
                    
                      )
                    }}
                   >
                   <Image source={{isStatic:true,uri: global.dayimg2[rowData]}} style={{alignSelf:'center',height: 200, width: 200, flex: 1 , marginBottom:15}}/>
                   <Icon name='logo-youtube' style={{marginLeft:5,fontSize: 25,color:'lightblue',position:'absolute'}} />
                  </TouchableOpacity>
                  <Text note style ={{textAlign: 'right', alignSelf: 'stretch'}}>
                    {global.daydes[rowData].substring(0,this.textindex(rowData)) + this.settextmore(rowData)}
                  </Text>
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
                        // {text: 'نمیخوام', onPress: () => console.log('Ask me later Button Clicked')},
                        // Third OK Button in Alert Dialog
                        // {text: 'میخوام', onPress: () => this.props.navigation.navigate("bankView")},
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
                      // scrollTo({x: 150*rowData, y: 0, animated: true});
                      // this.Scroller._root.scrollTo({x: 150*rowData, y: 0, animated: true});
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