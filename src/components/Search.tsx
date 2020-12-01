import React from "react";
import { StyleSheet, Text, TextInput, Image, View } from "react-native";

const Search: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/search.png")} />
      <TextInput>
        <Text style={styles.placeholder}>ค้นหาสินค้า</Text>
      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EBEFF2",
    padding: 15,
    margin: 10,
    flexDirection: "row",
  },
  placeholder: {
    color: "#6B7995",
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
});

export default Search;
