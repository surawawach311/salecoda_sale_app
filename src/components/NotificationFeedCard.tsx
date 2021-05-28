import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { OrderItem } from '../entities/NotificationEntity'

interface NotificationFeedCardProps {
  title: string
  description: string
  body: string
  created: string
  items: []
  isRead: boolean
}

const NotificationFeedCard: React.FC<NotificationFeedCardProps> = ({ title, body, items, created, isRead }) => {
  return (
    <View
      style={[
        {
          paddingVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        },
        !isRead ? { backgroundColor: '#F4FBFF' } : { backgroundColor: '#FFFFFF' },
      ]}
    >
      <View style={{ width:20, marginLeft: 10, alignSelf: 'flex-start', marginTop: 9 }}>
        {!isRead ? <View style={styled.orangeDot} /> : null}
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ marginTop: 15, color: '#6B7995', fontSize: 16 }}>{body}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styled.iconPackage} source={require('../../assets/package.png')} />
          <Text style={{ marginLeft: 9, fontSize: 14, color: '#6B7995' }}>{items.length} รายการ</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            {items.map((item: OrderItem) => {
              return (
                <View key={item.title} style={styled.productFrame}>
                  <Image style={styled.productImage} source={{ uri: item.cover }} />
                </View>
              )
            })}
          </View>
        </View>
        <Text style={{ color: '#6B7995', fontSize: 12, marginTop: 5 }}>{created}</Text>
      </View>
    </View>
  )
}

export default NotificationFeedCard

const styled = StyleSheet.create({
  orangeDot: {
    borderRadius: 50,
    width: 10,
    height: 10,
    backgroundColor: '#FF5D5D',
    borderColor: '#FF5D5D',
  },
  iconPackage: {
    height: 13,
    width: 14,
    resizeMode: 'contain',
    marginVertical: 9,
  },
  productFrame: {
    borderWidth: 1,
    borderColor: '#CBD4DF',
    borderRadius: 4,
    padding: 5,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  productImage: { width: 35, height: 35, resizeMode: 'contain' },
})
