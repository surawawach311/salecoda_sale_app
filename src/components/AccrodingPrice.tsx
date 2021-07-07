import React from 'react'
import { Accordion, Icon } from 'native-base'
import { View, Text, StyleSheet } from 'react-native'
import { currencyFormat } from '../utilities/CurrencyFormat'

export interface AccrodingPriceProps {
  title: string
  total: number
  price_color?: string
  detail: {
    item: string
    price: number
    quantity: number
  }[]
}

const AccrodingPrice: React.FC<AccrodingPriceProps> = ({ title, total, detail, price_color }) => {
  const props = [
    {
      header: title,
      total: total,
      detail: detail,
    },
  ]

  return (
    <Accordion style={{ borderWidth: 0, marginHorizontal: -11 }}>
      <Accordion.Item>
        <Accordion.Summary
          _expanded={{ backgroundColor: '#FFFFFF' }}
          style={{
            fontSize: 14,
            justifyContent: 'space-between',
            alignItem: 'center',
            marginBottom: -15,
            marginHorizontal: -2
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 14, color: '#6B7995' }}> {`${title}`}</Text>
            <Accordion.Icon style={{ color: 'black' }} />
          </View>
          <Text style={[styled.textContentName, price_color ? { color: price_color } : { color: '#6B7995' }]}>
            {`${currencyFormat(total, 2)}`}
          </Text>
        </Accordion.Summary>
        <Accordion.Details style={{ marginVertical: -10 }}>
          {detail.map((item: { item: React.ReactNode; price: number; quantity: number }, index: number) => {
            return (
              <View key={index} style={styled.textDetailContainer}>
                <Text style={[styled.textDetail, { width: 220 }]}>{item.item}</Text>
                <Text style={styled.textDetail}>{currencyFormat(item.price * item.quantity, 2)}</Text>
              </View>
            )
          })}
        </Accordion.Details>
      </Accordion.Item>
    </Accordion>
  )
}

export default AccrodingPrice

const styled = StyleSheet.create({
  textContentName: {
    color: '#6B7995',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textDetailContainer: {
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  HeaderContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconAccording: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(107, 121, 149, 1)',
  },
  textDetail: {
    fontSize: 14,
    color: 'rgba(156, 169, 197, 1)',
  },
})
