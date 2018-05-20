import {
  Container,
  Header,
  Button,
  Left,
  Body,
  Title,
  Right,
  Icon
} from "native-base";
import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import AlarmItem from "../components/AlarmItem";
import config from "../config";
import colors from "../themes/colors";
import { getItem, setItems } from "../utils/asynStorage";
import {
  getNotificationPermission,
  setNotificationPermission
} from "../utils/premission";
import { setNotification } from "../utils/notifications";

const ASYNS_STORGE_KEY = "CUTIEALARM:CLOCK";

type PropsType = {
  items: ?object
};
class HomePage extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      items: []
    };

    this.onAddItem = this.onAddItem.bind(this);
  }

  async componentDidMount(): ?void {
    this.onGetItems();
    const notificationStatus = await getNotificationPermission();
    console.log(notificationStatus);
    if (notificationStatus) {
      setNotification();
    } else {
      setNotificationPermission();
    }
  }

  async onGetItems() {
    await getItem(ASYNS_STORGE_KEY).then(response => {
      const respJson = JSON.parse(response);
      this.setState({
        items: respJson ? respJson.items : []
      });
    });
  }

  async onAddItem() {
    Actions.reset("createAlarmPage", { items: this.state.items });
  }

  renderAlaramList() {
    if (this.state.items.length > 0) {
      const items = this.state.items;
      items.sort((a, b) => {
        var timeA = a.time.toUpperCase(); // ignore upper and lowercase
        var timeB = b.time.toUpperCase(); // ignore upper and lowercase
        if (timeA < timeB) {
          return -1;
        }
        if (timeA > timeB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      return items.map(item => (
        <AlarmItem key={item.id} item={item} items={this.state.items} />
      ));
    }
    return (
      <Text
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          fontSize: 30,
          color: colors.white
        }}
      >
        No Items
      </Text>
    );
  }

  render() {
    return (
      <Container style={styles.containerPage}>
        <Header style={{ backgroundColor: colors.deepIndigo }}>
          <Body>
            <Title style={{ color: colors.white }}>Cutie Alarm Clock</Title>
          </Body>
          <Right>
            <Button transparent onPressOut={this.onAddItem}>
              <Icon
                style={{ color: colors.white }}
                type="MaterialIcons"
                name="add"
              />
            </Button>
          </Right>
        </Header>
        <ScrollView>{this.renderAlaramList()}</ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: colors.deepIndigo
  }
});

export default HomePage;
