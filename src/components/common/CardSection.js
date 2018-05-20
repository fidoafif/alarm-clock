import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../themes/colors";

const CardSection = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderColor: colors.grayBackground,
    position: "relative",
  },
});

export { CardSection };
