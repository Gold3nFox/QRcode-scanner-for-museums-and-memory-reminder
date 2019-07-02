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

export default class JadeChat extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
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
            <Title>Met Page</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>MoIn Chat</Label>
            <Input />
          </Item>
          <Button
            rounded
            success
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => {
              const navigationAction = NavigationActions.navigate({
                routeName: "ProfileScreen", 
                action: NavigationActions.navigate({
                  routeName: "Profile",
                  params: { name: "MOIN" }
                })
              });
              this.props.navigation.dispatch(navigationAction);
            }}
          >
            <Text>Goto Met Profile</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
