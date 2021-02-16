import React, { useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { ItemSpecialRequest } from "../models/SpecialRequestModel";
import { currencyFormat } from "../utilities/CurrencyFormat";

export interface SpecialRequestProductCardProps {
  id?: string;
  title: string;
  total_price: number;
  image: string;
  quantity: number;
  sale_unit: string;
  promotion_discount?: number;
  callback: (data:ItemSpecialRequest) => void;
  discountRequest?: number;
}

const SpecialRequestProductCard: React.FC<SpecialRequestProductCardProps> = ({
  id,
  title,
  total_price,
  image,
  quantity,
  sale_unit,
  promotion_discount,
  callback,
  discountRequest,
}) => {
  const [requestPrice, setRequestPrice] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>();

  return (
    <View style={{ padding: 20, marginBottom: 10, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 75,
              height: 75,
              backgroundColor: "#FAFAFA",
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 65, height: 65, resizeMode: "contain" }}
              source={{ uri: encodeURI(image) }}
            />
          </View>
          <View style={{ justifyContent: "space-evenly" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
            <Text style={{ color: "#616A7B", fontSize: 16 }}>
              {currencyFormat(total_price)}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 14 }}>{`${quantity} x (${sale_unit})`}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "189,189,189,0.25",
          marginVertical: 10,
          opacity: 0.5,
        }}
      />
      {promotion_discount ? (
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ color: "#616A7B", fontSize: 14 }}>
              ส่วนลดจากรายการโปรโมชั่น
            </Text>
            <Text
              style={{ color: "#616A7B", fontWeight: "bold", fontSize: 16 }}
            >
              {` ${currencyFormat(promotion_discount)}/ลัง`}
            </Text>
          </View>
        </View>
      ) : null}

      {!requestPrice && (!discountRequest || discountRequest == 0) ? (
        <TouchableOpacity
          onPress={() => setRequestPrice(!requestPrice)}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
            backgroundColor: "#F0F8FF",
            borderRadius: 8,
            height: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              paddingHorizontal: 3,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#4C95FF" }}
            >
              กดเพื่อระบุส่วนลด
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginTop: 10,
            borderRadius: 8,
            borderColor: "#EBEFF2",
            borderWidth: 1,
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../../assets/discount.png")}
              />
              <Text style={{ color: "#6B7995", fontSize: 16, marginLeft: 10 }}>
                ส่วนลดพิเศษ
              </Text>
            </View>

            {discountRequest && discountRequest != 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setRequestPrice(true);
                  callback({ price_id: id, amount: "" });
                }}
              >
                <Text
                  style={{ color: "#4C95FF", fontWeight: "500", fontSize: 14 }}
                >
                  แก้ไข
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {discountRequest && discountRequest != 0 ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "#E1E7F6",
                opacity: 0.5,
                borderRadius: 6,
                borderWidth: 1,
                padding: 10,
                backgroundColor: "#F5F8FF",
                marginTop: 16,
              }}
            >
              <Text>{discountRequest}</Text>
              <Text>{`฿/${sale_unit}`}</Text>
            </View>
          ) : null}

          {!discountRequest || discountRequest == 0 ? (
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderColor: "#E1E7F6",
                  opacity: 0.5,
                  borderRadius: 6,
                  borderWidth: 1,
                  padding: 10,
                  width: "80%",
                }}
              >
                <TextInput
                  style={{ flex: 1 }}
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder={"ระบุส่วนลดพิเศษ"}
                  onChangeText={(e) => setAmount(e)}
                />
                <Text>{`฿/${sale_unit}`}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setRequestPrice(false);
                  callback({ price_id: id, amount });
                }}
                style={{
                  backgroundColor: "#4C95FF",
                  borderRadius: 6,
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20%",
                  marginLeft: 5,
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "500" }}
                >
                  ยืนยัน
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};
export default SpecialRequestProductCard;
