
import Orientation from 'react-native-orientation';
import React, {Component} from 'react';
import {Platform, StyleSheet, View,TouchableOpacity,Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
	Icon,
	Root,
  Right
} from "native-base";


const styles = StyleSheet.create({
		  wrapper: {
		  	height: 100
		  },
		  slide1: {
		    flex: 1,
		    justifyContent: 'center',
		    alignItems: 'center',
		    // backgroundColor: '#9DD6EB',
		  },
		  slide2: {
		    flex: 1,
		    justifyContent: 'center',
		    alignItems: 'center',
		    // backgroundColor: '#97CAE5',
		  },
		  slide3: {
		    flex: 1,
		    justifyContent: 'center',
		    alignItems: 'center',
		    // backgroundColor: '#92BBD9',
		  },
		  text: {
		    color: '#fff',
		    fontSize: 30,
		    fontWeight: 'bold',
		  },
		  button: {
		  	flex : 1,
		  	height: 10
		  }
})

class MySwiper extends React.Component {
	constructor(props) {
    super(props);
    this.state = {buttonEnable : false};
  	}

		static navigationOptions = {
			title: 'swiper',
		};

next(){
  	const { navigate } = this.props.navigation;
  	navigate('test')
  }

	componentDidMount() {
		Orientation.lockToPortrait();
	}
	  render(){
	    return (
				<Root>
				<View style ={{flex : 1 , backgroundColor: '#9DD6EB'}}>
	      <Swiper style={styles.wrapper} loop = {false} showsButtons={false} 
	      onIndexChanged={(index) => {
	      	if(index == 2)
	      	{
	      		this.setState({buttonEnable : true});
	      	}
	      	else{
	      		this.setState({buttonEnable : false})
	      	}
	      }
	  }
	      >
	        <View style={styles.slide1}>
					<Image source = {require('./1.png')} style = {{width: 200 , height:200}} />
	          <Text style={styles.text}>1</Text>
	        </View>
	        <View style={styles.slide2}>
					<Image source = {require('./2.png')}  style = {{width: 200 , height:200}} />
	          <Text style={styles.text}>2</Text>
	        </View>
	        <View style={styles.slide3}>
					<Image source = {require('./3.png')}  style = {{width: 200 , height:200}} />
	          <Text style={styles.text}>3</Text>
	        </View>
	      </Swiper>

			<Button
            rounded
            primary
            style={{ marginBottom: 10,marginTop: 10 ,alignSelf: "center",
              justifyContent: "center",
              alignItems: "center"}}
            onPress={() => {this.props.navigation.navigate("Login")}}
            disabled={ !this.state.buttonEnable }
          >
            <Text>Agree</Text>
          </Button>
	      
	      </View>
	      
</Root>
	    );
  }
}

module.exports = MySwiper;