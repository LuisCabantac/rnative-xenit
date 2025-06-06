import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../utils/Colors";
import { useCurrency } from "../store/context/CurrencyProvider";

export default function HeaderText() {
  const { choiceFrom, choiceTo } = useCurrency();
  const message = `${choiceFrom} to ${choiceTo} conversion`;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>Xenit</Text>
      </View>
      <Text style={styles.conversionText}>
        {message ? message : "Currency converter"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoText: {
    fontFamily: "PlusJakartaSans-Bold",
    color: Colors.textColor,
    fontSize: 28,
  },
  conversionText: {
    fontFamily: "PlusJakartaSans-Bold",
    color: Colors.textColor,
    fontSize: 22,
  },
  conversionTextError: {
    color: Colors.errorTextColor,
  },
  logoImage: {
    width: 26,
    height: 32,
    marginTop: 6,
  },
});
