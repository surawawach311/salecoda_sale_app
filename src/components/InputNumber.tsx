import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

interface InputNumberProps {
  value: string;
  onPlus: () => void;
  onMinus: () => void;
  onChangeText?: (e: string) => void;
  onBlur: () => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onPlus,
  onMinus,
  onChangeText,
  onBlur,
}) => {
  return (
    <View style={styled.container}>
      <TouchableOpacity onPress={onMinus}>
        <Image
          style={styled.iconAdjust}
          source={require("../../assets/minus.png")}
        />
      </TouchableOpacity>
      <TextInput
        maxLength={6}
        defaultValue={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      <TouchableOpacity onPress={onPlus}>
        <Image
          style={styled.iconAdjust}
          source={require("../../assets/plus.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
const styled = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#EFF3FD",
    borderRadius: 14,
    width: 105,
    height: 28,
    alignItems: "flex-start",
    padding: 3,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  iconAdjust: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
});
export default InputNumber;
