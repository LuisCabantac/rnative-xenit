import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import HeaderText from "./components/HeaderText";

export default function App() {
  const [loaded] = useFonts({
    "PlusJakartaSans-Regular": require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
  });

  if (!loaded) <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <HeaderText />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212529",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
});
