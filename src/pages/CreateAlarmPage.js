import { Font, AppLoading } from "expo";
import moment from "moment";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
  H1,
} from "native-base";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Actions } from "react-native-router-flux";
import colors from "../themes/colors";
import { setItems } from "../utils/asynStorage";

const ASYNS_STORGE_KEY = "CUTIEALARM:CLOCK";

type PropsType = {
  items: ?object,
};
class CreateAlarmPage extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      items: props.items,
      item: {
        id: null,
        time: null,
        isRepeat: null,
        desc: null,
      },
      isDateTimePickerVisible: false,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  async componentDidMount(): ?void {
    const item = {
      id: null,
      time: moment().format("HH:mm"),
      isRepeat: null,
      desc: null,
    };
    this.setState({ item });
  }

  async onCancel(): ?void {
    Actions.reset("homePage");
  }

  async onSave(): ?void {
    let oldItems = this.state.items;
    let index = oldItems.length;

    oldItems.push({
      id: index + 1,
      time: this.state.item.time,
      isRepeat: false,
      desc: "Some information",
    });

    const items = {
      items: oldItems,
    };
    await setItems(ASYNS_STORGE_KEY, items).then(response => {
      Actions.reset("homePage");
    });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = time => {
    const item = {
      id: null,
      time: moment(time).format("HH:mm"),
      isRepeat: null,
      desc: null,
    };
    this.setState({ item });
    this._hideDateTimePicker();
  };

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
            <Button transparent onPressOut={this.onCancel}>
              <Icon
                style={{ color: colors.white }}
                type="MaterialIcons"
                name="clear"
              />
            </Button>
          </Right>
        </Header>
        <Content style={styles.contentContainer}>
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <H1 style={styles.h1}>{this.state.item.time}</H1>
          </TouchableOpacity>

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            is24Hour={true}
            mode={"time"}
            titleIOS={"Set Alarm"}
            datePickerModeAndroid={"spinner"}
          />
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
  contentContainer: {
    margin: 15,
  },
  h1: {
    flex: 1,
    alignSelf: "center",
    fontSize: 56,
    lineHeight: 66,
    letterSpacing: 3,
    color: colors.white,
  },
});

export default CreateAlarmPage;
