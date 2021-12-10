import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'styled-system'
import Subheading4 from './Font/Subheading4'

interface TagStatusProps {
  name: string
  fontColor: string
  backgroundColor: string
}

const TagStatus: React.FC<TagStatusProps> = ({ name, fontColor, backgroundColor }) => {
  return (
    <View style={[styled.containerBadge, { backgroundColor: backgroundColor }]}>
      <Subheading4 style={{ color: fontColor }}>{name}</Subheading4>
    </View>
  )
  // if (status == "waiting_confirm") {
  //   return (
  //     <View style={[styled.containerBadge, styled.badgeYellow]}>
  //       <Subheading4 style={styled.textYellow}>รอยืนยันคำสั่งซื้อ</Subheading4>
  //     </View>
  //   );
  // } else if (status == "waiting_sale_approve") {
  //   return (
  //     <View style={[styled.containerBadge, styled.badgeRed]}>
  //       <Subheading4 style={styled.textRed}>รออนุมัติคำสั่งซื้อ</Subheading4>
  //     </View>
  //   );
  // } else if (status == "confirmed") {
  //   return (
  //     <View style={[styled.containerBadge, styled.badgeBlue]}>
  //       <Subheading4 style={styled.textBlue}>ยืนยันแล้ว</Subheading4>
  //     </View>
  //   );
  // } else if (status == "opened") {
  //   return (
  //     <View style={[styled.containerBadge, styled.badgeYellow]}>
  //       <Subheading4 style={styled.textYellow}>กำลังดำเนินการ</Subheading4>
  //     </View>
  //   );
  // } else if (status == "delivering") {
  //   return (
  //     <View style={[styled.containerBadge, styled.badgeRed]}>
  //       <Subheading4 style={styled.textRed}>กำลังจัดส่ง</Subheading4>
  //     </View>
  //   );
  // } else if (status == "company_canceled") {
  //   return (
  //     <View style={[styled.containerBadge, styled.badgeRed]}>
  //       <Subheading4 style={styled.textRed}>ยกเลิกคำสั่งซื้อโดยบริษัท</Subheading4>
  //     </View>
  //   );
  // } else if (status == "customer_canceled") {
  //   return (
  //     <View style={[styled.containerBadge, styled.badgeRed]}>
  //       <Subheading4 style={styled.textRed}>ยกเลิกคำสั่งซื้อโดยร้านค้า</Subheading4>
  //     </View>
  //   );
  // } else if (status == "sale_executive_rejected") {
  //   return (
  //     <View style={[styled.containerBadge, styled.badgeRed]}>
  //       <Subheading4 style={styled.textRed}>ไม่อนุมัติคำสั่งซื้อ</Subheading4>
  //     </View>
  //   );
  // } else {
  //   return <Subheading4>unknow</Subheading4>;
  // }
}
export default TagStatus

const styled = StyleSheet.create({
  containerBadge: {
    borderRadius: 18,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginLeft: 15,
    alignItems: 'center',
  },
})
