import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Subheading4 from "./Font/Subheading4";

interface TagStatusProps {
  status: string;
}

const TagStatus: React.FC<TagStatusProps> = ({ status }) => {
  if (status == "waiting_confirm") {
    return (
      <View style={[styled.containerBadge, styled.badgeYellow]}>
        <Subheading4 style={styled.textYellow}>รอยืนยันคำสั่งซื้อ</Subheading4>
      </View>
    );
  } else if (status == "waiting_sale_approve") {
    return (
      <View style={[styled.containerBadge, styled.badgeRed]}>
        <Subheading4 style={styled.textRed}>รออนุมัติคำสั่งซื้อ</Subheading4>
      </View>
    );
  } else if (status == "confirmed") {
    return (
      <View style={[styled.containerBadge, styled.badgeBlue]}>
        <Subheading4 style={styled.textBlue}>ยืนยันแล้ว</Subheading4>
      </View>
    );
  } else if (status == "opened") {
    return (
      <View style={[styled.containerBadge, styled.badgeYellow]}>
        <Subheading4 style={styled.textYellow}>กำลังดำเนินการ</Subheading4>
      </View>
    );
  } else if (status == "delivering") {
    return (
      <View style={[styled.containerBadge, styled.badgeRed]}>
        <Subheading4 style={styled.textRed}>กำลังจัดส่ง</Subheading4>
      </View>
    );
  } else if (status == "company_canceled") {
    return (
      <View style={[styled.containerBadge, styled.badgeRed]}>
        <Subheading4 style={styled.textRed}>ยกเลิกคำสั่งซื้อโดยบริษัท</Subheading4>
      </View>
    );
  } else if (status == "customer_canceled") {
    return (
      <View style={[styled.containerBadge, styled.badgeRed]}>
        <Subheading4 style={styled.textRed}>ยกเลิกคำสั่งซื้อโดยร้านค้า</Subheading4>
      </View>
    );
  } else if (status == "sale_executive_rejected") {
    return (
      <View style={[styled.containerBadge, styled.badgeRed]}>
        <Subheading4 style={styled.textRed}>ไม่อนุมัติคำสั่งซื้อ</Subheading4>
      </View>
    );
  } else {
    return <Subheading4>unknow</Subheading4>;
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
    borderRadius: 18,
    padding: 10,
    marginLeft: 15,
  },
});
