import { StyleSheet, Text } from "react-native";

import { Colors } from "../utils/Colors";

export default function Label({ text }: { text: string }) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "PlusJakartaSans-Regular",
    textTransform: "uppercase",
    color: Colors.labelColor,
    fontSize: 14,
    fontWeight: 500,
  },
});
