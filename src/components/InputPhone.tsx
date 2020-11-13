import { Input } from "native-base";
import React from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";

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
}) => {
  const [number, setNumber] = React.useState(value ? value : "");
  const [isError, setIsError] = React.useState(false);

  const onTextChange = (text: string) => {
    setNumber(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderColor: "#EBEFF2",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 6,
    marginTop: 30,
  },
  flag: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  countryCode: {
    fontSize: 16,
  },
  pipe: {
    width: 1,
    height: 15,
    backgroundColor: "#E5E5E5",
    borderRadius: 100,
  },
  numberText: {
    marginLeft: 5,
    height: 50,
    justifyContent: "center",
    fontSize: 16,
  },
});
