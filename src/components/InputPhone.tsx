import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface InputPhoneProps {
  value: string;
  onChangeText?: (text: string) => void;
  maxLength: number;
  autoFocus?: boolean;
  onError?: boolean;
}
export const InputPhone: React.FC<InputPhoneProps> = ({
  value,
  maxLength,
  autoFocus,
  onChangeText,
  onError,
}) => {
  const [number, setNumber] = React.useState(value ? value : "");
  const onTextChange = (text: string) => {
    setNumber(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={!onError ? styles.boder : styles.boderError}>
        <Image source={require("../../assets/nation-flag/TH.png")} />
        <Text style={styles.countryCode}> +66 </Text>
        <View style={styles.pipe} />
        <TextInput
          style={styles.numberText}
          keyboardType="number-pad"
          editable={true}
          value={number}
          onChangeText={onTextChange}
          maxLength={maxLength}
          autoFocus={autoFocus}
        />
        <TouchableOpacity style={styles.clearBtn} onPress={() => setNumber("")}>
          <Image  source={require("../../assets/x.png")} />
        </TouchableOpacity>
      </View>
      {!onError ? null : (
        <Text style={styles.textError}>ไม่พบหมายเลขโทรศัพท์ในระบบ</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  boder: {
    padding: 10,
    marginTop: 30,
    alignItems: "center",
    height: 44,
    flexDirection: "row",
    borderColor: "#E8E8E8",
    borderRadius: 6,
    borderWidth: 1,
  },
  boderError: {
    padding: 10,
    marginTop: 30,
    alignItems: "center",
    height: 44,
    flexDirection: "row",
    borderColor: "#EB2C21",
    borderRadius: 6,
    borderWidth: 1,
  },
  flag: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  countryCode: {
    fontSize: 16,
    lineHeight: 15,
  },
  pipe: {
    width: 1,
    height: 15,
    backgroundColor: "#E5E5E5",
    borderRadius: 100,
  },
  numberText: {
    marginLeft: 5,
    height: 40,
    justifyContent: "center",
    lineHeight: 19,
    fontSize: 16,
    flex: 1,
  },
  textError: {
    color: "#EB2C21",
    alignSelf: "center",
    marginTop: 15,
    fontSize: 12,
  },
  clearBtn: { flex:0.1, height: 40,justifyContent:"center",alignItems:"center" },
});
