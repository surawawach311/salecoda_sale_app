import React from 'react'
import { View, Image, Text, StyleSheet, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { OrderItemEnitity, StatusBadge } from '../entities/OrderEntity'
import { ShopEntity } from '../entities/ShopEntity'
import { currencyFormat } from '../utilities/CurrencyFormat'
import { ThaiDateFormat, ThaiTimeFormat } from '../utilities/ThaiDateFormat'
import Subheading4 from './Font/Subheading4'
import Text3 from './Font/Text3'
import OrderCardStatus from './OrderCardStatus'
import TagStatus from './TagStatus'

interface OrderHistoryCardProps {
  orderNumber: string
  createDatetime: string
  quantity: number
  productIconList: string[]
  totalAmount: number
  isComplete: boolean
  shop: ShopEntity
  status: StatusBadge
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  orderNumber,
  createDatetime,
  quantity,
  productIconList,
  totalAmount,
  isComplete,
  shop,
  status,
}) => {
  return (
    <View style={styled.orderCard}>
      <View style={styled.headerCard}>
        <View style={styled.innerheaderLeftCard}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styled.iconInvoice} source={require('../../assets/invoice.png')} />
            <Text style={styled.textOrderNumber}>{orderNumber}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styled.iconPackage} source={require('../../assets/package.png')} />
            <Text style={styled.itemQuantity}>{`${quantity} รายการ`}</Text>
          </View>
        </View>
        <View style={styled.innerheaderRightCard}>
          <Text style={styled.detail}>ดูรายละเอียด</Text>
          <Text style={styled.textDate}>{`${ThaiDateFormat(createDatetime)}, ${ThaiTimeFormat(createDatetime)}`}</Text>
        </View>
      </View>
      <View>
        <View style={styled.breakLine} />
        <ScrollView style={styled.productList} horizontal>
          {productIconList.map((p, index) =>
            p ? (
              <Image
                key={index}
                style={styled.iconProduct}
                source={{
                  uri: p,
                }}
                resizeMethod={Platform.OS === 'android' ? 'resize' : 'auto'}
              />
            ) : null,
          )}
        </ScrollView>
        <View style={styled.statusContainer}>
          <View style={styled.cardFooter}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'baseline',
                alignContent: 'flex-start',
              }}
            >
              <View>
                <Image style={styled.imageCardFooter} source={require('../../assets/location3.png')} />
              </View>
              <View style={{ alignItems: 'flex-start', marginLeft: 1, marginRight: 34 }}>
                <Text3 style={styled.textCardFooter}>{shop.name}</Text3>
                <Subheading4
                  style={{ color: '#6B7995' }}
                >{`${shop.address} ${shop.sub_district} ${shop.district} ${shop.province} ${shop.post_code}`}</Subheading4>
              </View>
            </View>
          </View>
          <View style={styled.cardFooter}>{!isComplete && <OrderCardStatus isComplete={isComplete} />}</View>
          <View style={{ width: '50%',marginTop:5 }}>
            <TagStatus
              name={status.title}
              fontColor={status.color.text_color}
              backgroundColor={status.color.bg_color}
            />
          </View>
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
  innerheaderLeftCard: {},
  innerheaderRightCard: {
    alignItems: 'flex-end',
  },
  textDate: { color: '#6B7995', fontWeight: 'bold', fontSize: 12 },
  bodyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
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
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // alignContent:"flex-start",
    // borderWidth: 1,
  },
  statusContainer: { justifyContent: 'space-between' },
  textCardFooter: {
    color: '#314364',
    fontSize: 12,
  },
  imageCardFooter: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
})
