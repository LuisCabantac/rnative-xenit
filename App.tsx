import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { CurrencyProvider } from "./store/context/CurrencyProvider";

import HeaderText from "./components/HeaderText";
import InputBox from "./components/InputBox";
import Results from "./components/Results";

export default function App() {
  const [loaded] = useFonts({
    "PlusJakartaSans-Regular": require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
  });

  if (!loaded) <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CurrencyProvider>
        <HeaderText />
        <View style={styles.separator}></View>
        <InputBox />
        <Results />
      </CurrencyProvider>
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
    gap: 12,
  },
  separator: {
    borderTopWidth: 1,
    borderColor: "#343a40",
    marginTop: 8,
  },
});
