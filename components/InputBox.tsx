import { StyleSheet, TextInput, View } from "react-native";

import { Colors } from "../utils/Colors";
import { useCurrency } from "../store/context/CurrencyProvider";

import Label from "./Label";

export default function InputBox() {
  const { input, dispatch } = useCurrency();

  return (
    <View style={styles.container}>
      <Label text="AMOUNT" />
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={input}
        onChangeText={(text: string) =>
          dispatch({ type: "inputValue", payload: text })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  input: {
    borderColor: Colors.borderColor,
    color: Colors.textColor,
    fontFamily: "PlusJakartaSans-Regular",
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
});
