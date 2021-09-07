import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { OrderItem } from '../entities/NotificationEntity'
import Heading3 from './Font/Heading3'
import Paragraph3 from './Font/Paragraph3'
import Text1 from './Font/Text1'
import Text2 from './Font/Text2'

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
      <View style={{ flexDirection: 'row', flex: 1, padding: 10 }}>
        <View style={{ alignSelf: 'flex-start', marginTop: 9, flex: 0.1 }}>
          {!isRead ? <View style={styled.orangeDot} /> : null}
        </View>
        <View style={{ flex: 0.9 }}>
          <Heading3>{title}</Heading3>
          <Text1 style={{ marginTop: 15, color: '#6B7995' }}>{body}</Text1>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styled.iconPackage} source={require('../../assets/package.png')} />
            <Text2 style={{ marginLeft: 9, color: '#6B7995' }}>{items.length} รายการ</Text2>
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
          <Paragraph3 style={{ color: '#6B7995', marginTop: 5 }}>{created}</Paragraph3>
        </View>
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
