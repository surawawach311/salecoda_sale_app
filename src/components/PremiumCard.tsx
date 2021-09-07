import { View, Image, Text } from 'react-native'
import React from 'react'
import Text2 from './Font/Text2'
import Heading4 from './Font/Heading4'

export interface PremiumCardProps {
  image: string
  title: string
  desc: string
  quantity: number
  unit: string
}

const PremiumCard: React.FC<PremiumCardProps> = ({ image, title, desc, quantity, unit }) => {
  return (
    <View>
      <View
        style={{
          borderRadius: 6,
          backgroundColor: '#F9F9F9',
          width: 170,
          height: 80,
          marginVertical: 10,
          marginHorizontal: 2,
          padding: 10,
          paddingLeft: 5,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
            }}
            source={{ uri: image }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 5,
            justifyContent: 'space-around',
            width: 120,
          }}
        >
          <Text2
            numberOfLines={1}
            style={{
              color: '#616A7B',
            }}
          >
            {title}
          </Text2>
          <Text2
            style={{
              color: '#616A7B',
            }}
          >
            {desc}
          </Text2>
          <Heading4>{`${quantity} ${unit}`}</Heading4>
        </View>
      </View>
    </View>
  )
}

export default PremiumCard
