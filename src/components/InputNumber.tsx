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
}

const InputNumber: React.FC<InputNumberProps> = ({ value }) => {
  return (
    <View style={styled.container}>
      <TouchableOpacity>
        <Image style={styled.plus} source={require("../../assets/minus.png")} />
      </TouchableOpacity>
      <TextInput maxLength={6} value={value} />
      <TouchableOpacity>
        <Image style={styled.plus} source={require("../../assets/plus.png")} />
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
  plus: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
});
export default InputNumber;
