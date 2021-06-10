import { View, Image, Text } from "react-native";
import React from "react";

export interface PremiumCardProps {
  image: string;
  title: string;
  desc: string;
  quantity: number;
  unit: string;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ image, title, desc, quantity, unit }) => {
  return (
    <View>
      <View
        style={{
          borderRadius: 6,
          backgroundColor: "#F9F9F9",
          width: 170,
          height: 80,
          marginVertical: 10,
          marginHorizontal:2,
          padding: 10,
          paddingLeft: 5,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
            }}
            source={{ uri: image }}
          />
        </View>
        <View
          style={{
            marginLeft: 5,
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#616A7B",
              fontWeight: "600",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#616A7B",
            }}
          >
            {desc}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 11 }}>{`${quantity} ${unit}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default PremiumCard;
