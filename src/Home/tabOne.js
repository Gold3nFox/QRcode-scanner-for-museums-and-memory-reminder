import React, { Component } from "react";
import { FlatList,TouchableOpacity,Image, View,BackHandler } from "react-native";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { AsyncStorage,ListView,StyleSheet,Alert } from "react-native";
import { Toast, Content, Card,ListItem, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : [],
      subcategories : [],
      color :true,
      flatdata : [],
      loading : false,
      pishnamayesh : '0',
      boughtpishnamayesh : '0',
    };

    //flatdata is the input json of flatlist
    // '0' is a default value so i can know if its modified over fetching or no

    //flatlist datasource 
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    global.categories = [];
    global.subcategories = [];
    global.color = [];
    global.price = [];
    global.rendernum = [];
    //rendernum includes number of main categories for example if we have two categories its [1 , 2] ..
    global.subjects = [];
    global.descriptions = [];
    global.imageurl = [];
    global.id = [];
    global.expire= [];
    //pishnamayesh expire date 
    window.changed = "0";
    //a variable so if the something is removed from favorite categories it will be modified to "1" and after
    //updating favorite categories in shouldcomponentupdate it will be set to "0" again
    global.boughtrendernum = [];
    global.boughtsubjects = [];
    global.boughtdescriptions = [];
    global.boughtimageurl = [];
    global.boughtid = [];

    //these are class scope global variables which are just splitted JSON of categories - subjects - bought items to details

  }

  shouldComponentUpdate(){
    if(window.changed == "1")
      {
        this.getCategories();
        window.changed = "0";
        this.forceUpdate();
      }
      return true;
  
  }

  //restore data from saved username and password on device
  _retrieveData = async () => {
    if(window._token == undefined || window._token == ""){
      //if no token is loaded try to restore token from saved data
    try {
      const value = await AsyncStorage.getItem('key:Token');
      if (value !== null) {
        //retrieve saved token and check if its valid
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
            //token is expired which won't happen because are not expiring tokens
            }else {
              this.setState({loading : false});
              window._username = responseJson.email;
              //token was valid so we fetch data for user
              this.getCategories();
              this.fetchContent();
              this.fetchboughtContent();
              this.forceUpdate();
          }
        })
        .catch((error) => {
          this.setState({loading : false});
          this.props.navigation.navigate("Login");
          //token wasn't saved or wasn't valid so we will redirect to login page
        });
      }else{
        this.setState({loading : false});
        this.props.navigation.navigate("Login");
        //token wasn't saved or wasn't valid so we will redirect to login page
      }
     } catch (error) {
      this.setState({loading : false});
      this.props.navigation.navigate("Login");
       //token wasn't saved or wasn't valid so we will redirect to login page
     }
    }else{
      //if a token is loaded check its validity
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
          //token is expired which won't happen because are not expiring tokens
          this.setState({loading : false});
          }else {
            //token is valid
            window._username = responseJson.email;
            this.getCategories();
            this.fetchContent();
            this.fetchboughtContent();
            this.forceUpdate();
            this.setState({loading : false});
        }
      })
      .catch((error) => {
        this.setState({loading : false});
        this.props.navigation.navigate("Login");
        //token wasn't valid so we will redirect to login page
      });
    }
  }


  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    //handling android back button to exit from app on main page

    window.changed = "0";

    //if no token exists try to restore it
    if(window._token == "" || window._token == undefined)
      this._retrieveData();
    else{
      this.getCategories();
      this.fetchContent();
      this.fetchboughtContent();
    }
  }


  componentWillUnmount() {
    this.backHandler.remove();
    //removing our backhandler while leaving this page
  }

  getCategories(){
    fetch(API_URL + '/auth/getfav/'+window._username, {
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
      response = ""+responseJson.message;
          if(response == "Unauthenticated." || response == undefined || responseJson == 'nothing'){
            //if no category was selected as favorite return empty array to show on list
            this.setState({flatdata : []});
          }else{
            //if not empty json is returned give it to flatlist to render it
            this.setState({flatdata : responseJson});
          }
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

  flatlistdata(){
    // avoiding undefined is not an object error returning empty array while flatdata is empty
    if(this.state.flatdata != '') {
      return(this.state.flatdata);
    }
    else return ([]);
  }
  likehandle(likeddata){
    if(likeddata.color == "white"){
      //if the color of category heart is white means its not favorite so it should be shown here and we will just
      //change the color this shouldn't happen just checking this if for handling exceptions
      likeddata.color = "red";
    }
    else {
      likeddata.color = "white";
      var data = this.state.flatdata
      var index = data.indexOf(likeddata);
      if (index > -1) {
        data.splice(index, 1);
      }

      //removing the selected element of flatdata 

      this.setState({flatdata : data});

      //removing selected element from favorite table in database

      fetch(API_URL + '/auth/removefav/'+likeddata.id+'/'+window._username, {
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
      //set changed variable equal to "2" so we will know on the tab2 that something is changed and we need to rerender
      //to retrive changes from server
      window.changed = "2";
    }

    //changing a value in state to rerender the page manualy
    if(this.state.color == "white")
      this.setState({color : "red"});
    else
      this.setState({color : "white"});
  }

  fetchContent() {
    //if user is not authenticated dont fetch data
    if(window._username == undefined){
      return;
    }else{
      this.setState({loading : true});
      //fetch categories that are in preview mode for this user
      fetch(API_URL + '/auth/getpishnamayesh/'+ window._username, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({loading : false});
        response = ""+responseJson.message;
        if(response == "Unauthenticated." || responseJson == "nothing"){
          this.setState({loading : false,empty : '1'});
          global.rendernum = [];
          global.subjects = [];
          global.descriptions = [];
          global.imageurl = [];
          global.id = [];
          this.setState({pishnamayesh : '0'});
          this.forceUpdate();
          }else {
            var count = Object.keys(responseJson).length;
            for(let i = 0 ; i < count; i++){
              global.rendernum[i] = i;
              global.subjects[i] = responseJson[i].Mainsubject;
              global.descriptions[i] = responseJson[i].Maindescription;
              global.imageurl[i] = responseJson[i].Mainimageurl;
              global.id[i] = responseJson[i].id;
              global.expire[i] = responseJson[i].expire;
              global.price[i] = responseJson[i].price;
            }
            if(count > 0){
              //if there's a preview for this user we need to know so we will render preview section on the page
              this.setState({pishnamayesh : '1'});
            }
            this.setState({
              listViewData : this.ds.cloneWithRows(global.subjects)
            })
            this.setState({loading : false});
            this.forceUpdate();
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

}

fetchboughtContent() {
  //if user is not authenticated dont fetch data
  if(window._username == undefined){
    return;
  }else{
    this.setState({loading : true});
    //fetch purchased categories of this user
    fetch(API_URL + '/auth/getpishpurchased/'+ window._username, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization' : 'Bearer ' + window._token,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      response = ""+responseJson.message;
      if(response == "Unauthenticated." || responseJson == "nothing"){
        this.setState({loading : false});
        this.forceUpdate();
        }else {
          var count = Object.keys(responseJson).length;
          for(let i = 0 ; i < count; i++){
            global.boughtrendernum[i] = i;
            global.boughtsubjects[i] = responseJson[i].Mainsubject;
            global.boughtdescriptions[i] = responseJson[i].Maindescription;
            global.boughtimageurl[i] = responseJson[i].Mainimageurl;
            global.boughtid[i] = responseJson[i].id;
          }
          if(count > 0){
            //if there's a bought category for this user we need to know so we will render bought section on the page
            this.setState({boughtpishnamayesh : '1'});
          }
          this.setState({loading : false});
          this.forceUpdate();
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

}

  mytitle(){
    //dont render the title head before data is fetched
    if(this.state.flatdata == ''){
      return([]);
    }else{
      return(      
        <CardItem style={styles.containerStyle}>
        <Right style = {{flex:1,}}>
        <Text style = {{color:'white',fontSize: 13,fontWeight:'bold',textAlign:'center',alignSelf: "center"}}>علاقه مندی ها</Text>
        </Right>
        </CardItem>
      );
    }
  }
  removepish(rowData){
    //removing a preview mode category from favorite page

    fetch(API_URL + '/auth/removepishnamayesh/'+global.id[rowData]+'/'+window._username, {
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
      this.fetchContent();
      this.fetchboughtContent();
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

  pishnamayeshtitle(){
    //if there's a preview category for this user render the preview header title
    if(this.state.pishnamayesh == '0'){
      return([]);
    }else{
      return(      
        <CardItem style={styles.containerStyle}>
        <Right style = {{flex:1,}}>
        <Text style = {{color:'white',fontSize: 13,fontWeight:'bold',textAlign:'center',alignSelf: "center"}}>پیش نمایش ها</Text>
        </Right>
        </CardItem>
      );
    }
  }

  boughtpishnamayeshtitle(){
    //if there's a bought category for this user render the bought header title
    if(this.state.boughtpishnamayesh == '0'){
      return([]);
    }else{
      return(      
        <CardItem style={styles.containerStyle}>
        <Right style = {{flex:1,}}>
        <Text style = {{color:'white',fontSize: 13,fontWeight:'bold',textAlign:'center',alignSelf: "center"}}>خریده شده ها</Text>
        </Right>
        </CardItem>
      );
    }
  }

  fetchpishbutton(rowData){
    //if preview category has been previewd for more than 6 days change the button to buy 
    //maximom preview date for each category is 6days
    if(global.expire[rowData] > 6){
      return("خرید");
    }else{
      return("بیشتر");
    }
  }

  buy(rowData){
    //buy a category
    fetch(API_URL + '/auth/buyitem/'+global.id[rowData]+'/'+window._username, {
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
      if(responseJson == undefined || responseJson == ""){

      }
      else if(responseJson == "not enough money"){
        Alert.alert(
  
          "قیمت "+global.price[rowData]+"واحد است",
      
          'متاسفانه اعتبار شما برای خرید کافی نیست لطقا برای خرید اکانت خود را شارژ فرمایید',
          [
            {text: 'انصراف', onPress: () => console.log('dismiss Button Clicked')},
            {text: 'شارز', onPress: () => console.log('charge Button Clicked')},

            //TODO dargah pardakht
            
          ]
      
        )
      }else if(responseJson == "bought"){
        this.fetchContent();
        this.fetchboughtContent();
        Toast.show({
          text: "با موفقیت خریده شد",
          buttonText: "Okay",
          position: "bottom",
          duration: 3000,
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

  handlepishpress(rowData){

    //alert that you need to buy this category to use it more than 6 days

    if(global.expire[rowData]>6){
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
            if(global.price[rowData] < responseJson.money){
              Alert.alert(
  
                "قیمت "+global.price[rowData]+"واحد است",
            
                'اعتبار شما برای خرید کافی است آیا به خرید خود اطمینان دارید',
                [
                  // First Text Button in Alert Dialog.
                  {text: 'خیر', onPress: () => console.log('Ask me later Button Clicked')},
                  {text: 'بله', onPress: () => this.buy(rowData)},
                  
                ]
            
              )
            }
            else{
              Alert.alert(

                "قیمت "+global.price[rowData]+"واحد است",
            
                'متاسفانه اعتبار شما برای خرید کافی نیست لطقا برای خرید اکانت خود را شارژ فرمایید',
                [
                  {text: 'انصراف', onPress: () => console.log('dismiss Button Clicked')},
                  {text: 'شارز', onPress: () => console.log('charge Button Clicked')},

                  //TODO dargah pardakht
                ]
            
              )
            }
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
    }else{

      // if it's in preview mode and 6 days are not expired yet enter the category

      this.props.navigation.navigate("conIndex", { name: global.id[rowData] , subject:global.subjects[rowData] });
      window._id = global.id[rowData];
      window._thissubject = global.subjects[rowData];
    }
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

        <View>

        
          {this.mytitle()}
              

              <FlatList
              horizontal
              extraData={this.state.color}
              data={this.flatlistdata()}
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
                      <Icon name='close' style={{color:row2Data.color,textAlign:'center'}} />
                      </TouchableOpacity>
                      <Text note numberOfLines={1} style={{flex:1,fontSize:10,color:'white',textAlign:'center'}}>{row2Data.Subcategory}</Text>
                  </CardItem>
                </Card>
                );
              }}
              keyExtractor={(item, index) => index}
            />
            </View>

            {this.boughtpishnamayeshtitle()}

            <ListView 
            removeClippedSubviews={false}
            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(global.boughtrendernum)}
            renderRow={rowData =>
            <ListItem noBorder style={{flex:1 , marginBottom: 10}} thumbnail>
            <Left>
                <Thumbnail square source={{isStatic:true,uri : global.boughtimageurl[rowData]}} />
              </Left>
              <Body>
                <Text style={{alignSelf:"flex-end"}}>{global.boughtsubjects[rowData] }</Text>
                <Text style={{alignSelf:"flex-end"}}note numberOfLines={1}>{global.boughtdescriptions[rowData] }</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => {this.props.navigation.navigate("conIndex", { name: global.boughtid[rowData] , subject:global.boughtsubjects[rowData] });
                  window._id = global.boughtid[rowData];
                  window._thissubject = global.boughtsubjects[rowData];
                }}>
                  <Text>بیشتر</Text>
                  </Button>
              
              </Right>
            </ListItem>}
            />

            {this.pishnamayeshtitle()}

            <ListView 
          removeClippedSubviews={false}
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(global.rendernum)}
            renderRow={rowData =>
              <ListItem noBorder style={{flex:1 , marginBottom: 10}} thumbnail>
               <Left>
                   <Thumbnail square source={{isStatic:true,uri : global.imageurl[rowData]}} />
                </Left>
                <Body>
                  <Text style={{alignSelf:"flex-end"}}>{global.subjects[rowData] }</Text>
                  <Text style={{alignSelf:"flex-end"}}note numberOfLines={1}>{global.descriptions[rowData] }</Text>
                </Body>
                <Right>
                <Button style={{height:12,marginBottom:5}} transparent onPress={() => {this.removepish(rowData); 
                  }}>
                    <Icon style={{fontSize:15 , color :'red'}} name="close"></Icon>
                  </Button>
                  <Button transparent onPress={() => {this.handlepishpress(rowData)
                  }}>
                    <Text>{this.fetchpishbutton(rowData)}</Text>
                    </Button>
                 
                </Right>
              </ListItem>}
              />


      
      </Content>
    );
  }
}

export default withNavigation(App);
