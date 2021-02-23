import { View, Image, Text } from "react-native";
import React from "react";

export interface PremuimCardProps {
  image: string;
  title: string;
  quantity: number;
}

const PremuimCard: React.FC<PremuimCardProps> = ({
  image,
  title,
  quantity,
}) => {
  return (
    <View>
      <View
        style={{
          borderRadius: 6,
          backgroundColor: "#F9F9F9",
          width: 170,
          height: 80,
          marginTop: 10,
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
            source={{ uri: encodeURI(image) }}
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
            style={{ fontWeight: "bold", fontSize: 11 }}
          >{`${quantity} ลัง`}</Text>
        </View>
      </View>
    </View>
  );
};

export default PremuimCard;
