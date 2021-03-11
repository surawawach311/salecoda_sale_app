import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TagStatusProps {
  status: string;
}

const TagStatus: React.FC<TagStatusProps> = ({ status }) => {
  if (status == "waiting_confirm") {
    return (
      <View style={[styled.containerBadge, styled.badgeYellow]}>
        <Text style={styled.textYellow}>รอยืนยันคำสั่งซื้อ</Text>
      </View>
    );
  } else if (status == "waiting_sale_approve") {
    return (
      <View style={[styled.containerBadge, styled.badgeRed]}>
        <Text style={styled.textRed}>รออนุมัติคำสั่งซื้อ</Text>
      </View>
    );
  } else if (status == "confirmed") {
    return (
      <View style={[styled.containerBadge, styled.badgeBlue]}>
        <Text style={styled.textBlue}>ยืนยันแล้ว</Text>
      </View>
    );
  } else if (status == "opened") {
    return (
      <View style={[styled.containerBadge, styled.badgeYellow]}>
        <Text style={styled.textYellow}>กำลังดำเนินการ</Text>
      </View>
    );
  } else if (status == "delivering") {
    return (
      <View style={[styled.containerBadge, styled.badgeRed]}>
        <Text style={styled.textRed}>กำลังจัดส่ง</Text>
      </View>
    );
  } else {
    return <Text>unknow</Text>;
  }
};
export default TagStatus;

const styled = StyleSheet.create({
  textYellow: { color: "#F4BF00" },
  textRed: { color: "#FF8824" },
  textBlue: { color: "#4C95FF" },
  badgeYellow: { backgroundColor: "#FFF3CA" },
  badgeRed: { backgroundColor: "#FFE9D8" },
  badgeBlue: { backgroundColor: "#E3F0FF" },
  containerBadge: {
    // backgroundColor: "#FFE9D8",
    borderRadius: 18,
    padding: 10,
    marginLeft: 15,
  },
});
