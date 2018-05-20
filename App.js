import Expo from "expo";
import { Container } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Router, Stack, Scene } from "react-native-router-flux";
import CreateAlarmPage from "./src/pages/CreateAlarmPage";
import EditeAlarmPage from "./src/pages/EditeAlarmPage";
import HomePage from "./src/pages/HomePage";
import colors from "./src/themes/colors";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      appReady: false,
    };
  }

  async componentWillMount(): Promise<*> {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });

    this.setState({ appReady: true });
  }

  render() {
    if (!this.state.appReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container style={styles.appContainer}>
        <Router>
          <Stack key="root" headerMode="none">
            <Scene key="homePage" component={HomePage} />
            <Scene key="createAlarmPage" component={CreateAlarmPage} />
            <Scene key="editeAlarmPage" component={EditeAlarmPage} />
          </Stack>
        </Router>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    shadowColor: "rgba(0, 0, 0, 0.7)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
