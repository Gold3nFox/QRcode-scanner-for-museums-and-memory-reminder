import Orientation from 'react-native-orientation';
import React, { Component } from 'react';
var API_URL = require('../config/config.js');
import { Image,ListView,StyleSheet,TouchableOpacity,Linking,ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { Container,Spinner,Button,Title,   Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon } from 'native-base';
const cards = [
  {
    text: 'موزه',
    name: 'این مجسمه ی ۱ است',
    image: {uri : 'file:///Users/bobvv/AwesomeNativeBase/src/Home/image7.jpg'},
  }
];

export default class DeckSwiper44Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonname : 0,
      paused: false,
      currentTime: '',
      duration: '',
      buttons : [],
      orien : "0",
      loading : true,
      imageurl : 'https://khaterat.mobi/js/web/FinalPics/'+this.props.navigation.getParam('name') + '.jpg'
  }
  this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  global.buttonnum = [];
  global.left = [];
  global.top = [];
  global.width = [];
  global.height = [];
  global.hasvideo = [];
  global.video_des = [];
  global.title = [];
}


  componentWillMount() {
  
    //split qrcode to get the tablo name and orientation of tablo

    var tmp = this.props.navigation.getParam('name').split("_");

    if(tmp[1] == "1")
    {
      Orientation.lockToLandscape();
      this.setState({orien : "1"});
    }



    fetch(API_URL + '/auth/getTablo/' + this.props.navigation.getParam('name'), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization' : 'Bearer '+window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        response = ""+responseJson.message;
        if(response == "Unauthenticated." || response == undefined){
          }else {
            
            window._tablo = responseJson;
            var count = Object.keys(responseJson).length;
            for(let i = 1 ; i < count; i++){
                global.buttonnum[i] = i;
                global.left[i] = responseJson[i].left;
                global.title[i] = responseJson[i].title;
                global.top[i] = responseJson[i].top;
                global.width[i] = responseJson[i].width;
                global.height[i] = responseJson[i].height;
                global.hasvideo[i] = responseJson[i].hasvideo;
                global.video_des[i] = responseJson[i].video_des;
              }
              this.forceUpdate();
        }
      })
      .catch((error) => {
          console.warn(error);
      });
 
    // this unlocks any previous locks to all Orientations
    // Orientation.addOrientationListener(this._orientationDidChange);
  }

  onLoad(data) {
    this.setState({ duration: data.duration })
  }
  
  onProgress(data) {
    this.setState({ currentTime: data.currentTime })
  }


  //render buttons of this tablo

  setButtons(){
    var btn = [];
    for(let i = 1 ; i < global.buttonnum.length; i++){
        btn.push(
            <Button transparent
                style={{position:'absolute',top:global.top[i],left:global.left[i],width : global.width[i],height:global.height[i],
              }}
                onPress={() => {
                    if(this.state.orien == "1")
                        this.props.navigation.navigate('test',{ name: this.props.navigation.getParam('name').split("_")[0] + '_' + global.title[i]})
                    else
                        this.props.navigation.navigate('test2',{ name: this.props.navigation.getParam('name').split("_")[0] + '_' + global.title[i]})
                    }
                }
                ><Icon name='logo-youtube' style={{fontSize: 25,position:'absolute',left:'50%',marginLeft: -12.5,color:'red'}} /></Button>
        );
      
        }
        return btn; 
  }

 
  
  
  

  render() {
    var salam = 'assets/first';
    return (
      <Container>
        <View style={{flex : 1}}>
        
        <ActivityIndicator style={{position:"absolute",left:"50%",marginLeft:-5,top : "50%"}} animating={this.state.loading} size="large" color="#0000ff" />
        <Image
          style={{flex: 1,width:'100%',resizeMode: 'stretch',opacity:0.8}}
          source={{uri: this.state.imageurl}}
          onError={() => {
            if(this.props.navigation.getParam('name').split("_")[1] == "1"){
                this.setState({imageurl : "https://khaterat.mobi/js/web/FinalPics/Empty@1.jpg", loading : false});
            }else{
                this.setState({imageurl : "https://khaterat.mobi/js/web/FinalPics/Empty@0.jpg", loading : false});
            }
          }}
          onLoad={() => this.setState({loading : false})}
        />

       


        <Button
        iconLeft
            rounded
            primary
            transparent
            style={{position:"absolute" ,top:5,height:40,zIndex: 5}}


            onPress={() => {
                this.props.navigation.navigate('conIndex')}
            }
          >
          <Icon name='arrow-back' />
            <Text>بازگشت</Text>
          </Button>

          <Button
          iconLeft
            rounded
            transparent

            style = {{position:"absolute" , right:0,top:5,height:40}}


            onPress={() => {
              this.setState({paused : !this.state.paused});
            }}
          >
          <Icon name='volume-off' />
            <Text>قطع صدا</Text>
          </Button>


        {this.setButtons()}
          
          
          


          <Video source={{uri: encodeURI('https://khaterat.mobi/js/Musics/' + this.props.navigation.getParam('name').split("_")[0]+'.mp3')}}   // Can be a URL or a local file.
                ref={(ref) => {
                  this.player = ref
                }}
                style={{position: "absolute",width:0,height:0}}                                      // Store reference
                rate={1.0}                              // 0 is paused, 1 is normal.
                volume={1.0}                            // 0 is muted, 1 is normal.
                muted={false}                           // Mutes the audio entirely.
                paused={this.state.paused}                          // Pauses playback entirely.
                resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                repeat={false}                           // Repeat forever.
                playInBackground={false}                // Audio continues to play when app entering background.
                playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                onLoadStart={this.loadStart}            // Callback when video starts to load
                onLoad={this.onLoad.bind(this)}
                onProgress={this.onProgress.bind(this)}               // Callback every ~250ms with currentTime
                onEnd={this.onEnd}                      // Callback when playback finishes
                onError={this.videoError}               // Callback when video cannot be loaded
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
           />
        </View>
      </Container>
    );
  }
}