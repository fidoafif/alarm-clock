import { Font, AppLoading } from "expo";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Text,
  Content,
  H1,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import colors from "../themes/colors";
import { setItems } from "../utils/asynStorage";

const ASYNS_STORGE_KEY = "CUTIEALARM:CLOCK";

type PropsType = {
  items: ?object,
  item: ?object,
};
class EditeAlarmPage extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      items: props.items,
      item: props.item,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  async componentWillMount() {}

  async onCancel(): ?void {
    Actions.reset("homePage", { items: this.state.data });
  }

  async onDelete(): ?void {
    const oldItems = this.state.items;
    const itemToRemove = this.state.item;
    oldItems.forEach((element: ?object, key: ?number) => {
      if (element === itemToRemove) {
        oldItems.splice(key, 1);
      }
    });

    const items = {
      items: oldItems,
    };
    await setItems(ASYNS_STORGE_KEY, items).then(response => {
      Actions.reset("homePage");
    });
  }

  async onSave(): ?void {
    let oldItems = this.state.items;
    let index = oldItems.length;

    oldItems.push({
      id: index + 1,
      time: "09:00",
      isRepeat: false,
      desc: "Some information",
    });

    oldItems.reverse();

    const items = {
      items: oldItems,
    };
    await setItems(ASYNS_STORGE_KEY, items).then(response => {
      Actions.reset("homePage");
    });
  }
  render() {
    return (
      <Container style={styles.containerPage}>
        <Header style={{ backgroundColor: colors.deepIndigo }}>
          <Left>
            <Button transparent onPressOut={this.onSave}>
              <Icon
                style={{ color: colors.white }}
                type="MaterialIcons"
                name="done"
              />
              <Text style={{ fontSize: 14, color: colors.white }}>Save</Text>
            </Button>
          </Left>
          <Right>
            <Button transparent onPressOut={this.onDelete}>
              <Icon
                style={{ color: colors.white }}
                type="MaterialIcons"
                name="delete"
              />
            </Button>
            <Button transparent onPressOut={this.onCancel}>
              <Icon
                style={{ color: colors.white }}
                type="MaterialIcons"
                name="clear"
              />
            </Button>
          </Right>
        </Header>
        <Content>
          <H1>07:00</H1>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: colors.deepIndigo,
  },
});

export default EditeAlarmPage;
