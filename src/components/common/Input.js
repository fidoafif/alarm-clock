import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{label}</Text>
      <TextInput
        style={styles.textInputStyle}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid={"#fff"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  textStyle: {
    fontSize: 18,
    flex: 1,
  },
  textInputStyle: {
    fontSize: 18,
    color: "#000",
    flex: 2,
    lineHeight: 30,
  },
});

export { Input };
