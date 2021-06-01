import React from 'react'
import { Image, Text, StyleSheet } from 'react-native'

interface OrderCardStatusProps {
  isComplete: boolean
}

const OrderCardStatus: React.FC<OrderCardStatusProps> = (props) => {
  return props.isComplete ? (
    <>
      <Image style={styled.imageCardFooter} source={require('../../assets/correct.png')} />
      <Text style={styled.textCardFooter}>ยืนยันแล้ว</Text>
    </>
  ) : (
    <>
      <Image style={styled.imageCardFooter} source={require('../../assets/reject-order.png')} />
      <Text style={styled.textCardFooter}>รอยืนยันคำสั่งซื้อ</Text>
    </>
  )
}
export default OrderCardStatus

const styled = StyleSheet.create({
  textCardFooter: {
    color: '#6B7995',
    marginLeft: 5,
  },
  imageCardFooter: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
})
