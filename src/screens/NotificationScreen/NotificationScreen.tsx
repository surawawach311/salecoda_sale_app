import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const NotificationScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, paddingTop: "10%", backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>การแจ้งเตือน</Text>
      </View>
      <View
        style={{
          width: "100%",
          marginVertical: 10,
          padding: 10,
          flexDirection: "row",
        }}
      >
        <View style={styled.badgeStatus}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#4C95FF" }}>
            คำสั่งซื้อ
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 25,
            padding: 15,
            borderRadius: 25,
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#6B7995" }}>
            โปรโมชั่น
          </Text>
        </View>
      </View>
      <ScrollView style={{backgroundColor:"#F8FAFF"}}>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F4FBFF",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              marginLeft: 10,
              borderRadius: 50,
              width: 10,
              height: 10,
              backgroundColor: "#FF5D5D",
              borderColor: "#FF5D5D",
              alignSelf: "flex-start",
              marginTop: 9,
            }}
          />

          <View style={{ marginHorizontal: 30 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              บริษัท ไอ ซี พี เฟอทิไลเซอร์ มีคำสั่งซื้อ รอให้คุณ ยืนยันอยู่
            </Text>
            <Text style={{ marginTop: 15, color: "#6B7995", fontSize: 16 }}>
              คำสั่งซื้อ SP020110024 จากบริษัท ไอ ซี พีเฟอทิไลเซอร์ ในแบรนด์
              ม้าบิน กำลัง ”รอยืนยันคำสั่งซื้อ” จากคุณ
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={styled.iconPackage}
                source={require("../../../assets/package.png")}
              />
              <Text style={{ marginLeft: 9, fontSize: 14, color: "#6B7995" }}>
                2 รายการ
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#CBD4DF",
                  borderRadius: 4,
                  padding: 5,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Image
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                  source={require("../../../assets/empty-product.png")}
                />
              </View>
            </View>
            <Text style={{ color: "#6B7995", fontSize: 12, marginTop: 5 }}>
              13 พ.ย. 2563 - 12:40.
            </Text>
          </View>
          <Image
            style={styled.iconRight}
            source={require("../../../assets/right.png")}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

const styled = StyleSheet.create({
  badgeStatus: {
    backgroundColor: "#E3F0FF",
    paddingHorizontal: 25,
    padding: 15,
    borderRadius: 25,
    marginLeft: 10,
  },
  iconRight: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    alignSelf: "flex-start",
    marginTop: 5,
  },
  iconPackage: {
    height: 13,
    width: 14,
    resizeMode: "contain",
    marginVertical: 9,
  },
});
