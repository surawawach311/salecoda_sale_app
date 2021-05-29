import React from 'react'
import { View, Image, Text, StyleSheet, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { OrderItemEnitity } from '../entities/OrderEntity'
import { currencyFormat } from '../utilities/CurrencyFormat'
import { ThaiDateFormat, ThaiTimeFormat } from '../utilities/ThaiDateFormat'
import OrderCardStatus from './OrderCardStatus'

interface OrderHistoryCardProps {
  orderNumber: string
  createDatetime: string
  quantity: number
  productIconList: OrderItemEnitity[]
  totalAmount: number
  isComplete: boolean
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  orderNumber,
  createDatetime,
  quantity,
  productIconList,
  totalAmount,
  isComplete,
}) => {
  return (
    <View style={styled.orderCard}>
      <View style={styled.headerCard}>
        <View style={styled.innerheaderLeftCard}>
          <Image style={styled.iconInvoice} source={require('../../assets/invoice.png')} />
          <Text style={styled.textOrderNumber}>{orderNumber}</Text>
        </View>
        <View style={styled.innerheaderRightCard}>
          <Text style={styled.detail}>ดูรายละเอียด</Text>
          <Text style={styled.textDate}>{`${ThaiDateFormat(createDatetime)} ${ThaiTimeFormat(createDatetime)}`}</Text>
          <View />
        </View>
      </View>
      <View style={styled.breakLine} />
      <View>
        <View style={styled.bodyCard}>
          <Image style={styled.iconPackage} source={require('../../assets/package.png')} />
          <Text style={styled.itemQuantity}>{`${quantity} รายการ`}</Text>
        </View>
        <ScrollView style={styled.productList} horizontal>
          {productIconList.map((p,a) =>
            p ? (
              <Image
                key={p.id}
                style={styled.iconProduct}
                source={{
                  uri: p.cover,
                }}
                resizeMethod={Platform.OS === 'android' ? 'resize' : 'auto'}
              />
            ) : null,
          )}
        </ScrollView>
        <View style={styled.statusContainer}>
          <View style={styled.cardFooter}>
            <Image style={styled.imageCardFooter} source={require('../../assets/icon-cash.png')} />
            <Text style={styled.textCardFooter}>ชำระ {currencyFormat(totalAmount)}</Text>
          </View>
          <View style={styled.cardFooter}>{!isComplete && <OrderCardStatus isComplete={isComplete} />}</View>
        </View>
      </View>
    </View>
  )
}

export default OrderHistoryCard

const styled = StyleSheet.create({
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 20,
    padding: 20,
    marginTop: 4,
  },
  headerCard: { flexDirection: 'row', justifyContent: 'space-between' },
  textOrderNumber: { fontSize: 14, fontWeight: 'bold', marginLeft: 4 },
  iconInvoice: { height: 20, width: 16, resizeMode: 'contain' },
  detail: {
    color: '#4C95FF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  breakLine: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#EFF3FD',
    marginVertical: 10,
  },
  innerheaderLeftCard: { flexDirection: 'row' },
  innerheaderRightCard: { alignItems: 'flex-end' },
  textDate: { color: '#6B7995', fontWeight: 'bold', fontSize: 12 },
  bodyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconPackage: { height: 13, width: 14, resizeMode: 'contain' },
  itemQuantity: { color: '#6B7995', marginLeft: 5 },
  productList: {
    flexDirection: 'row',
    height: 36,
    marginBottom: 10,
    marginLeft: 20,
  },
  iconProduct: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  textCompanyAddress: { color: '#6B7995', marginLeft: 5 },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: { flexDirection: 'row', justifyContent: 'space-between' },
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
