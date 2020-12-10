import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

const InputNumber: React.FC = () => {
  return (
    <View style={styled.container}>
      <TouchableOpacity>
        <Image style={styled.plus} source={require("../../assets/plus.png")} />
      </TouchableOpacity>
      <TextInput maxLength={6} defaultValue="0" />
      <TouchableOpacity>
        <Image style={styled.plus} source={require("../../assets/minus.png")} />
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
