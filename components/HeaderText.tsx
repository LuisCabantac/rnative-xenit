import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../utils/Colors";
import { useCurrency } from "../store/context/CurrencyProvider";

export default function HeaderText() {
  const { error, choiceFrom, choiceTo } = useCurrency();
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
        {error ? error : message ? message : "Currency converter"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  logoText: {
    fontFamily: "PlusJakartaSans-Bold",
    color: Colors.textColor,
    fontSize: 30,
  },
  conversionText: {
    fontFamily: "PlusJakartaSans-Bold",
    color: Colors.textColor,
    fontSize: 24,
  },
  logoImage: {
    width: 26,
    height: 32,
    marginTop: 6,
  },
});
