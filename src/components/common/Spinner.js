import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Spinner = ({ size, color }) => {
  return (
    <View>
      <ActivityIndicator size={size || "large"} color={color || "#000"} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export { Spinner };
