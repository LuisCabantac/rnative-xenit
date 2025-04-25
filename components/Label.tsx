import { StyleSheet, Text } from "react-native";

export default function Label({ text }: { text: string }) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    textTransform: "uppercase",
    fontSize: 14,
    color: "#868e96",
    fontWeight: 500,
    fontFamily: "PlusJakartaSans-Regular",
  },
});
