import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import colors from "../themes/colors";
import { Card, CardSection } from "./common";

type PropsType = {
  item: ?object,
  items: ?object,
};

class AlarmItem extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      items: props.items,
      item: props.item,
    };
    this._onPressItem = this._onPressItem.bind(this);
  }

  async _onPressItem(): ?void {
    const items = this.state.items;
    Actions.push("editeAlarmPage", {
      items: items,
      item: this.state.item,
    });
  }
  render() {
    return (
      <Card>
        <TouchableOpacity onPress={this._onPressItem}>
          <CardSection>
            <View style={styles.headerContentStyle}>
              <Text style={styles.textTimeStyle}>{this.state.item.time}</Text>
              <Text style={styles.textRepeatStyle}>
                {this.state.item.isRepeat ? (
                  "Repeat every Monday"
                ) : (
                  "No Repeats"
                )}
              </Text>
              <Text style={styles.textDescStyle}>{this.state.item.desc}</Text>
            </View>
            <View style={styles.thumbnailContainerStyle}>
              <Image
                style={styles.thumbnailStyle}
                source={{
                  uri:
                    "https://openclipart.org/image/2400px/svg_to_png/23511/StudioFibonacci-Cartoon-triceratops.png",
                }}
              />
            </View>
          </CardSection>
        </TouchableOpacity>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  headerContentStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  textTimeStyle: {
    color: colors.white,
    fontSize: 45,
  },
  textRepeatStyle: {
    color: colors.white,
    fontSize: 16,
  },
  textDescStyle: {
    color: colors.dustyGray,
    fontSize: 15,
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 3,
    marginRight: 5,
  },
  thumbnailStyle: {
    width: 70,
    height: 70,
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
  },
});

export default AlarmItem;
