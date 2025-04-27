import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { Colors } from "../utils/Colors";
import { useCurrency } from "../store/context/CurrencyProvider";

import Label from "./Label";

export default function Select({
  choiceType,
}: {
  choiceType: "choiceOne" | "choiceTwo";
}) {
  const { choices, dispatch, choiceFrom, choiceTo } = useCurrency();

  return (
    <View style={styles.container}>
      <Label
        text={`${choiceType === "choiceOne" ? "Base" : "Foreign"} Currency`}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={choices}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={choiceType === "choiceOne" ? choiceFrom : choiceTo}
        onChange={(item) => dispatch({ type: choiceType, payload: item.value })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  dropdown: {
    height: 44,
    borderColor: Colors.borderColor,
    color: Colors.textColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingBottom: 4,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "white",
    fontFamily: "PlusJakartaSans-Regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white",
    fontFamily: "PlusJakartaSans-Regular",
  },
});
