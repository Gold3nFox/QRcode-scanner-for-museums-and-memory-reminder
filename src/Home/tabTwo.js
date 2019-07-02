import React, { Component } from "react";
import { FlatList,TouchableOpacity,Image, View,BackHandler } from "react-native";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { AsyncStorage,ListView,StyleSheet } from "react-native";
import { Toast, Content, Card, CardItem, Text, Icon,Right } from 'native-base';
import { withNavigation } from 'react-navigation';
var API_URL = require('../config/config.js');

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#3f51b5',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'purple',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  box:{
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    elevation: 1,marginLeft:10,width:150,height:200
  }
})


class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : [],
      subcategories : [],
      ct : [],
      loading : true,
      color :true  
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    global.categories = [];
    global.subcategories = [];
    global.catnum = [];
    global.subnum = [];
    global.ct = [];
    // global.ct is the full returned json of categories
    global.color = [];
  }

  _retrieveData = async () => {
    if(window._token == undefined || window._token == ""){
    try {
      const value = await AsyncStorage.getItem('key:Token');
      if (value !== null) {
        // We have data!!
        window._token = value;
        fetch(API_URL + '/auth/user', {
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
            this.setState({loading : false});
            }else {
              window._username = responseJson.email;
              this.getCategories();
              this.forceUpdate();
              this.setState({loading : false});
          }
        })
        .catch((error) => {
          this.setState({loading : false});
          this.props.navigation.navigate("Login");
        });
      }else{
        this.setState({loading : false});
        this.props.navigation.navigate("Login");
      }
     } catch (error) {
      this.props.navigation.navigate("Login");
       // Error retrieving data
     }
    }else{
      fetch(API_URL + '/auth/user', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization' : 'Bearer '+window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({loading : false});
        response = ""+responseJson.message;
        if(response == "Unauthenticated." || response == undefined){
          }else {
            window._username = responseJson.email;
            this.getCategories();
            this.forceUpdate();
            this.setState({loading : false});
        }
      })
      .catch((error) => {
        this.setState({loading : false});
        this.props.navigation.navigate("Login");
      });
    }
  }

  shouldComponentUpdate(){
    //window.changed value is 2 if we have change the tab from first tab to this tab and is 0 if we change page from another page to the tab page
    //so we wont reload tabs on page change
    if(window.changed == "2")
      {
        this.getCategories();
        window.changed = "0";
        this.forceUpdate();
      }
      return true;
  }

  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    if(window._token == "" || window._token == undefined)
      this._retrieveData();
    else{
      this.getCategories();
    }

  }
  
  
  componentWillUnmount() {
    this.backHandler.remove();
    
  }

  getCategories(){
    fetch(API_URL + '/auth/getCategories/'+window._username, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With' : 'XMLHttpRequest',
        'Authorization' : 'Bearer ' + window._token,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      response = ""+responseJson;
      if(response == "undefined" || response == "" || responseJson.message == "Unauthenticated."){
        this.setState({loading : false});
      }else{
        var count = Object.keys(responseJson).length;
        for(let i = 0 ; i < count; i++){
          global.ct = responseJson;
          global.categories[i] = responseJson[i].Category;
          global.catnum[i] = i;
        }
        this.setState({loading : false});
        this.setState({ct:responseJson});
      }
    })
    .catch((error) => {
      this.setState({loading : false});
      Toast.show({
        text: "No internet connection!",
        buttonText: "Okay",
        position: "top",
        duration: 3000,
        textStyle: { color: "red" }
      });
    });
  }

  //these return functions prevent components from getting undefined before state is ready

  flatlistdata(rowData){
    if(this.state.ct[rowData] != undefined) return(this.state.ct[rowData].Subcategory);
    else return ([]);
  }

  likehandle(row2Data){
    window.changed = "1";
    if(row2Data.color == "white"){
      row2Data.color = "red";
      fetch(API_URL + '/auth/addfav/'+row2Data.id+'/'+window._username, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With' : 'XMLHttpRequest',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({loading : false});
      })
      .catch((error) => {
        this.setState({loading : false});
        Toast.show({
          text: "No internet connection!",
          buttonText: "Okay",
          position: "top",
          duration: 3000,
          textStyle: { color: "red" }
        });
      });
    }
    else {
      row2Data.color = "white";
      fetch(API_URL + '/auth/removefav/'+row2Data.id+'/'+window._username, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With' : 'XMLHttpRequest',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({loading : false});
      })
      .catch((error) => {
        this.setState({loading : false});
        Toast.show({
          text: "No internet connection!",
          buttonText: "Okay",
          position: "top",
          duration: 3000,
          textStyle: { color: "red" }
        });
      });

    }
    //we change this state to force page to reload
    if(this.state.color == "white")
      this.setState({color : "red"});
    else
      this.setState({color : "white"});
  }

  render() {
    return (
      <Content>
        <OrientationLoadingOverlay
          visible={this.state.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="لطفا صبر کنید... "
          />

        
        <ListView
        enableEmptySections={true}
        removeClippedSubviews={false}
        dataSource={this.ds.cloneWithRows(global.catnum)}
            renderRow={rowData =>
              <View>
              <CardItem style={styles.containerStyle}>
              <Right style = {{flex:1,}}>
              <Text style = {{color:'white',fontSize: 13,fontWeight:'bold',textAlign:'center',alignSelf: "center"}}>{global.categories[rowData]}</Text>
              </Right>
              </CardItem>

              <FlatList
              horizontal
              extraData={this.state.color}
              data={this.flatlistdata(rowData)}
              renderItem={({ item: row2Data }) => {
                return (
                  <Card style={styles.box}>
                  <CardItem cardBody style={{width:150,height:150}}>
                  <TouchableOpacity style={{height : 150,width:150}} onPress={() => this.props.navigation.navigate('subjects', { id: row2Data.id})}>
                    <Image source={{uri:row2Data.imageurl}} style={{height: 150,resizeMode:'stretch', width: null, flex: 1}}/>
                  </TouchableOpacity>
                  </CardItem>
                  <CardItem style={{flex:1,backgroundColor:'grey'}}>
                      <TouchableOpacity onPress={() => this.likehandle(row2Data)}>
                      <Icon name='heart' style={{color:row2Data.color,textAlign:'center'}} />
                      </TouchableOpacity>
                      <Text note numberOfLines={1} style={{flex:1,fontSize:10,color:'white',textAlign:'center'}}>{row2Data.Subcategory}</Text>
      
                  </CardItem>
                </Card>
                );
              }}
              keyExtractor={(item, index) => index}
            />
            </View>

            } /> 
      
      </Content>
    );
  }
}

export default withNavigation(App2);
