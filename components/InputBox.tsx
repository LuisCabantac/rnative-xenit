import { StyleSheet, TextInput, View } from "react-native";

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
    borderColor: "#343a40",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingBottom: 14,
    fontFamily: "PlusJakartaSans-Regular",
    color: "#f8f9fa",
  },
});
