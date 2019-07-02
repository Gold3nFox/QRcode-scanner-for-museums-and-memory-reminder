import React from "react";
import { AppRegistry, View, StatusBar } from "react-native";
import { NavigationActions } from "react-navigation";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Input,
  InputGroup,
  Item,
  Tab,
  Tabs,
  Footer,
  FooterTab,
  Label
} from "native-base";
import HomeScreen from "../HomeScreen";

export default class LucyChat extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Behnam page</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Behnam Chat</Label>
            <Input />
          </Item>
          <Button
            rounded
            danger
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => {
              const navigationAction = NavigationActions.navigate({
                routeName: "ProfileScreen",
                params: { name: "Behnam" }
              });
              this.props.navigation.dispatch(navigationAction);
            }}
          >
            <Text>Goto Behnam Profile</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
