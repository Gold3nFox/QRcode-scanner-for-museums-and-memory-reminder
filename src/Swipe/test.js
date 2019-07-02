import Orientation from 'react-native-orientation';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import React, { Component } from 'react';
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


export default class AppMM extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonname : 0,
      paused: false,
      currentTime: '',
      duration: '',
      loading : true,
      poster : 'https://khaterat.mobi/js/FinalPics/poster.png'
  }
  btnname = ['توقف','ادامه'];
  }
  onLoad(data) {
    this.setState({ loading: false })
  }
  
  onProgress(data) {
    this.setState({ currentTime: data.currentTime })
  }

  componentDidMount() {
    Orientation.lockToLandscape();
    // alert('https://khaterat.mobi/js/FinalPics/'+this.props.navigation.getParam('name') + '.mp4');
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
        {/* <OrientationLoadingOverlay
          visible={this.state.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="لطفا صبر کنید... "
          /> */}
          <ActivityIndicator style={{top : 30}} animating={this.state.loading} size="large" color="#0000ff" />
        

<Left><Video
                source={{uri: encodeURI('https://khaterat.mobi/js/FinalPics/'+this.props.navigation.getParam('name') + '.mp4')}}
                // source={require('./video.mp4')}
                style={styles.backgroundVideo}
                rate={1.0}
                volume={5.0}
                paused={this.state.paused}
                muted={false}
                ignoreSilentSwitch={"ignore"}
                resizeMode="stretch"
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
    resizeMode:'stretch',
    width : 400,
    height : 300,
    marginTop: 20,
  },
});