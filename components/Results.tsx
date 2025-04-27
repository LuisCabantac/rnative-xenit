import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../utils/Colors";
import { useCurrency } from "../store/context/CurrencyProvider";

export default function Results() {
  const { choiceFrom, choiceTo, input, convertedLong, convertedInverted } =
    useCurrency();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textSecondary}>{` ${input} ${choiceFrom} = `}</Text>
        <Text style={styles.textPrimary}>{`${convertedLong} ${choiceTo}`}</Text>
      </View>
      <View style={styles.separator}></View>
      <View>
        <Text style={styles.textSecondary}>{` ${input} ${choiceTo} = `}</Text>
        <Text
          style={styles.textPrimary}
        >{`${convertedInverted} ${choiceFrom}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginTop: 4,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.secondaryBackgroundColor,
  },
  textPrimary: {
    color: "#f1f3f5",
    fontSize: 24,
    fontFamily: "PlusJakartaSans-Bold",
  },
  textSecondary: {
    color: "#868e96",
    fontFamily: "PlusJakartaSans-Regular",
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
  },
});
