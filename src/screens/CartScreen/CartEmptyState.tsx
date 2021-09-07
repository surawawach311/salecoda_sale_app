import React from 'react'
import { View, Text, Image } from 'react-native'
import Text1 from '../../components/Font/Text1'

const CartEmptyState: React.FC = () => {
  return (
    <View
      style={{
        alignContent: 'center',
        alignItems: 'center',
        margin: 60,
        justifyContent: 'center',
      }}
    >
      <Image style={{ width: 150, height: 150 }} source={require('../../../assets/empty-cart.png')} />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text1 style={{ color: '#C2C6CE' }}>ไม่มีสินค้าในตะกร้า</Text1>
        <Text1 style={{ color: '#C2C6CE' }}>เลือกซื้อสินค้าที่ร้านซื้อบ่อยได้ด้านล่าง</Text1>
      </View>
    </View>
  )
}

export default CartEmptyState
