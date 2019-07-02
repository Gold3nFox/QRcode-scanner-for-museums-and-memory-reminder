import Orientation from 'react-native-orientation';
import React, { Component } from 'react';
import Video from 'react-native-video';
import { Image,StyleSheet,TouchableOpacity,Linking } from 'react-native';
import { Container,Button,Title,   Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon } from 'native-base';
const cards = [
  {
    text: 'موزه',
    name: 'این مجسمه ی ۱ است',
    image: {uri : 'file:///Users/bobvv/AwesomeNativeBase/src/Home/image7.jpg'},
  }
];

export default class Second2Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonname : 0,
      paused: false,
      currentTime: '',
      duration: ''
  }}

  componentWillMount() {
    Orientation.unlockAllOrientations();
    // this locks the view to Landscape Mode
    Orientation.lockToPortrait();
 
    // this unlocks any previous locks to all Orientations
 
    // Orientation.addOrientationListener(this._orientationDidChange);
  }

  onLoad(data) {
    this.setState({ duration: data.duration })
  }
  
  onProgress(data) {
    this.setState({ currentTime: data.currentTime })
  }

  

  render() {
    return (
      <Container>
        <View style={{flex : 1}}>
        <Image
          style={{width: '100%', height: '100%',opacity:0.8,position:'absolute'}}
          source={require('./second.png')}
        />
        <Button
            rounded
            primary
            transparent

            onPress={() => {
                this.props.navigation.navigate('conIndex')}
            }
          >
            <Text>بازگشت</Text>
          </Button>
          
          <Button
            rounded
            primary
            transparent
            style = {{position:"absolute" , right:0}}

            onPress={() => {
              this.setState({paused : !this.state.paused});
            }}
          >
            <Text>قطع صدا</Text>
          </Button>
          
          <Button
            primary
            transparent
            style={{width : '80%',height:'50%',position:'absolute',opacity:0.1,backgroundColor:'black' }}

            onPress={() => {
                this.props.navigation.navigate('test2')}
            }
          >
          </Button>
          <Video source={{uri: 'h2.mp3'}}   // Can be a URL or a local file.
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