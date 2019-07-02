import Orientation from 'react-native-orientation';
import React, { Component } from 'react';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { View,StyleSheet,ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
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


export default class ApSSp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonname : 0,
      paused: false,
      currentTime: '',
      duration: '',
      loading : true,
      loadingtext : "در حال بارگزاری ..",
      poster : 'https://khaterat.mobi/js/FinalPics/poster.png'
  }
  btnname = ['توقف','ادامه'];
  }
  onLoad(data) {
    this.setState({ loading: false , loadingtext : ""})
  }
  
  onProgress(data) {
    this.setState({ currentTime: data.currentTime })
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    
  }


  render() {
    return (
      <Container>
        
         <Header > 
        <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('TabloPage')}}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>ویدیو</Title>
          </Body>
        </Header>
        <Content style = {{backgroundColor: 'black'}} >
        <ActivityIndicator style={{top : 30}} animating={this.state.loading} size="large" color="#0000ff" />
        {/* <Text style = {{color : 'white' , position:'absolute' , left:"45%" , top:"10"}}>{this.state.loadingtext}</Text> */}
        

<Left><Video
                source={{uri: encodeURI('https://khaterat.mobi/js/FinalPics/'+this.props.navigation.getParam('name') + '.mp4')}}
                // source={require('./video.mp4')}
                style={styles.backgroundVideo}
                rate={1.0}
                volume={5.0}
                paused={this.state.paused}
                muted={false}
                ignoreSilentSwitch={"ignore"}
                resizeMode="cover"
                onLoad={this.onLoad.bind(this)}
                onProgress={this.onProgress.bind(this)}
                onEnd={() => {
                  this.setState({ paused: !this.state.paused }) 
                }}
                repeat={true}
                playInBackground={false}
                playWhenInactive={false}
              /></Left>

                <Right>
              <Button
            block
            rounded
            primary
            style={{
              justifyContent: "center",
              alignItems: "center"}}
            onPress={() => {
              this.setState({
                paused : !this.state.paused,
                buttonname : (this.state.buttonname+1)%2
              });
            }}
          >
            <Text>{btnname[this.state.buttonname]}</Text>
          </Button>
          </Right>

</Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent:'center',
    width : 300,
    height : 300,
    marginTop: 20,
  },
});