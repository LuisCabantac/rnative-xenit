import { Image, StyleSheet, Text, View } from "react-native";

export default function HeaderText() {
  return (
    <>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>Xenit</Text>
      </View>
      <Text style={styles.conversionText}>EUR to USD conversion</Text>
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontFamily: "PlusJakartaSans-Bold",
    color: "#f8f9fa",
    fontSize: 30,
  },
  conversionText: {
    fontFamily: "PlusJakartaSans-Bold",
    color: "#f8f9fa",
    fontSize: 24,
  },
  logoImage: {
    width: 26,
    height: 32,
    marginTop: 6,
  },
});
