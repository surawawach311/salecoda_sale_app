import { View, Text, Image } from "react-native";
import React from "react";
import { Container } from "native-base";

const HistoryScreen: React.FC = () => {
  return (
    <Container>
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          marginTop: 200,
          margin: 60,
          justifyContent: "center",
        }}
      >
        <Image
          style={{ height: 200, resizeMode: "contain" }}
          source={require("../../../assets/under-construction.png")}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Text style={{ color: "#C2C6CE", fontSize: 14 }}>
            อยู่ระหว่างการพัฒนาระบบ
          </Text>
          <Text style={{ color: "#C2C6CE", fontSize: 14 }}>
            เตรียมพบกันเร็วๆนี้
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default HistoryScreen;
