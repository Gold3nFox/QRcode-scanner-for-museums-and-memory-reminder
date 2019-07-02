import Orientation from 'react-native-orientation';
import React from "react";
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
  Right
} from "native-base";


export default class Home2Screen extends React.Component {
  
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  render() {
    return (
      <Container style={{backgroundColor: "#87cefa"}}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer()}}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>FUN FUN FUN</Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Homeindex")}
          >
            <Text>Home</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => {this.props.navigation.navigate("Login")}}
          >
            <Text>Login</Text>
          </Button>

          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => {this.props.navigation.navigate("Swiper")}}
          >
            <Text>Swiper</Text>
          </Button>

          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => {this.props.navigation.navigate("Register")}}
          >
            <Text>Register</Text>
          </Button>

          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => {this.props.navigation.navigate("PickPage")}}
          >
            <Text>2</Text>
          </Button>

            <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => {this.props.navigation.navigate("bankView")}}
          >
            <Text>3</Text>
          </Button>

           <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => {this.props.navigation.navigate("QRmooze")}}
          >
            <Text>4</Text>
          </Button>

          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => {this.props.navigation.navigate("contentPage")}}
          >
            <Text>5</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}
