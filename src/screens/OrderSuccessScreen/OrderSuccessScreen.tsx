import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { PurchaseStackParamList } from '../../navigations/PurchaseNavigator'
import Dash from 'react-native-dash'
import { currencyFormat } from '../../utilities/CurrencyFormat'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ShopDataSource } from '../../datasource/ShopDataSource'
import { ShopEntity } from '../../entities/ShopEntity'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { AccrodionPriceModel } from '../../models/AccrodionPriceModel'
import AccrodingPrice from '../../components/AccrodingPrice'
import { DiscountOrderEntity, OrderEntity } from '../../entities/OrderEntity'
import TagStatus from '../../components/TagStatus'
import Heading3 from '../../components/Font/Heading3'
import Subheading1 from '../../components/Font/Subheading1'
import Text2 from '../../components/Font/Text2'
import Subheading2 from '../../components/Font/Subheading2'
import Text1 from '../../components/Font/Text1'
import Heading2 from '../../components/Font/Heading2'
import Heading4 from '../../components/Font/Heading4'
import { OrderDataSource } from '../../datasource/OrderDataSource'
import { ResponseEntity } from '../../entities/ResponseEntity'

type OrderSuccessScreenRouteProp = StackScreenProps<PurchaseStackParamList, 'OrderSuccess'>

const OrderSuccessScreen: React.FC<OrderSuccessScreenRouteProp> = ({ navigation, route }) => {
  const [order, setOrder] = useState<OrderEntity>()
  const [shop, setShop] = useState<ShopEntity>()
  const [specialRequest, setSpecialRequest] = useState<AccrodionPriceModel[]>([])
  const [discoutPromo, setDiscoutPromo] = useState<AccrodionPriceModel[]>([])

  useEffect(() => {
    getOrderDetail()
    initialData()
  }, [])
  useEffect(() => {
    initialData()
  }, [])

  // TODO: don't use any type
  const formatAccrodion = (data: any[]): AccrodionPriceModel[] => {
    let arrayOutput: any[] = []
    data.map((item: any) => {
      let unit = item.sale_unit ? item.sale_unit : item.unit
      arrayOutput.push({
        item: `${item.name} (${item.price}฿ x ${item.quantity} ${unit})`,
        price: item.price,
        quantity: item.quantity,
      })
    })
    return arrayOutput
  }

  const initialData = () => {
    let promo = formatAccrodion(
      order?.discount_memo.filter((item) => item.item_id != null && item.item_id != '') || [],
    )
    let request = formatAccrodion(order?.special_request_discounts || [])
    setDiscoutPromo(promo)
    setSpecialRequest(request)
  }

  const getOrderDetail = () => {
    OrderDataSource.getOrderDetail(route.params.orderId).then((res: ResponseEntity<OrderEntity>) =>
      setOrder(res.responseData),
    )
  }

  return (
    <View style={styled.container}>
      {order ? (
        <>
          <View style={styled.headerWarp}>
            <TouchableOpacity
              style={styled.iconCloseContainer}
              onPress={() => navigation.navigate('Shop', { shop: shop })}
            >
              <Image style={styled.iconClose} source={require('../../../assets/cancle.png')} />
            </TouchableOpacity>
            <Heading3 style={{ color: '#FFFFFF' }}>รอยืนยันคำสั่งซื้อ</Heading3>
          </View>
          <ScrollView>
            <View style={styled.bodyContainer}>
              <View style={styled.shopNameWarp}>
                <Subheading1 style={{ color: '#4C95FF' }}>{order.buyer.name}</Subheading1>
              </View>
              <View style={styled.iconWaitWarp}>
                <Image style={styled.iconWait} source={require('../../../assets/wait-Confirm.png')} />
              </View>
              <View style={styled.iconWaitWarp}>
                <Text2 style={{ color: '#6B7995' }}>
                  {order.status == 'waiting_confirm' ? 'รอยืนยันคำสั่งซื้อ' : 'รออนุมัติคำสั่งซื้อ'}
                </Text2>
              </View>
              <Dash dashGap={2} dashLength={4} dashThickness={1} style={styled.lineDash} dashColor="#C8CDD6" />
              <View style={styled.orderNoWarp}>
                <Image style={styled.iconInvoice} source={require('../../../assets/invoice.png')} />
                <Subheading2 style={{ marginLeft: 5 }}>{order.order_no}</Subheading2>
              </View>
              <View style={styled.productHeaderWarp}>
                <Subheading2>สินค้า</Subheading2>
                <Subheading2>ราคารวม</Subheading2>
              </View>

              {order.items.map((item) => {
                return (
                  <View key={item.id} style={styled.productTextWarp}>
                    <View style={{ width: '75%' }}>
                      <Text1 style={{ color: '#333333' }}>
                        {item.unit === 'ตัน'
                          ? `${item.title} ${item.quantity}x${item.unit}`
                          : `${item.title} ${item.quantity}x(${item.unit})`}
                      </Text1>
                    </View>
                    <Text1 style={{ color: '#333333' }}>{currencyFormat(item.quantity * item.price)}</Text1>
                  </View>
                )
              })}
              <Dash dashGap={2} dashLength={4} dashThickness={1} style={styled.lineDash} dashColor="#C8CDD6" />
              <View style={styled.productTextWarp}>
                <Text1 style={{ color: '#6B7995' }}>ราคาก่อนลด</Text1>
                <Text1 style={{ color: '#616A7B' }}>{currencyFormat(order.before_discount, 2)}</Text1>
              </View>
              {order.discount_memo.filter((item: DiscountOrderEntity) => item.item_id != '').length > 0 ? (
                <AccrodingPrice
                  title="ส่วนลดรายการ"
                  total={order.discount_memo
                    .filter((item: DiscountOrderEntity) => item.item_id != '')
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)}
                  detail={discoutPromo}
                  price_color={'#3AAE49'}
                />
              ) : null}
              {order.special_request_discounts.length > 0 ? (
                <AccrodingPrice
                  title="ขอส่วนลดพิเศษเพิ่ม"
                  total={order.special_request_discounts.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                  detail={specialRequest}
                  price_color={'#BB6BD9'}
                />
              ) : null}
              {order.subsidize != 0 ? (
                <View style={styled.productTextWarp}>
                  <Text1 style={{ color: '#6B7995' }}>ส่วนลดดูแลราคา</Text1>
                  <Heading3 style={{ color: '#FF5D5D' }}>{currencyFormat(order.subsidize, 2)}</Heading3>
                </View>
              ) : null}
              {order.discount_memo.length > 0
                ? order.discount_memo
                    .filter((item) => item.id == 'cash')
                    .map((item) => {
                      return (
                        <View
                          key={item.id}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 10,
                          }}
                        >
                          <Text1 style={{ color: '#6B7995' }}>ส่วนลดเงินสด</Text1>
                          <Heading3 style={{ color: '#4C95FF' }}>{currencyFormat(item.price, 2)}</Heading3>
                        </View>
                      )
                    })
                : null}
              <View style={styled.productTextWarp}>
                <Text1 style={{ color: '#6B7995' }}>ส่วนลดรวม</Text1>
                <Heading3 style={{ color: '#616A7B' }}>{currencyFormat(order.total_discount, 2)}</Heading3>
              </View>
              <View style={styled.productTextWarp}>
                <Heading3>ราคารวม</Heading3>
                <Heading2 style={{ color: '#4C95FF' }}>{currencyFormat(order.total_price, 2)}</Heading2>
              </View>
              <Dash dashGap={2} dashLength={4} dashThickness={1} style={styled.lineDash} dashColor="#C8CDD6" />
              <View style={{ marginTop: 10 }}>
                <Heading3>ของแถมที่ได้รับ</Heading3>
                <View style={{ marginTop: 10 }}>
                  {order.premium_memo.length > 0 ? (
                    order.premium_memo.map((item) => {
                      return (
                        <View
                          key={item.id}
                          style={{
                            borderRadius: 6,
                            padding: 10,
                            paddingLeft: 5,
                            flexDirection: 'row',
                            width: 299,
                          }}
                        >
                          <Image
                            style={{
                              width: 60,
                              height: 60,
                              resizeMode: 'contain',
                            }}
                            source={{ uri: item.cover }}
                          />
                          <View
                            style={{
                              marginLeft: 5,
                              justifyContent: 'space-around',
                            }}
                          >
                            <Text1 numberOfLines={1} style={{ color: '#616A7B' }}>
                              {item.name}
                            </Text1>
                            <Text1 style={{ color: '#616A7B' }}>{item.packing_size}</Text1>
                            <Heading4>{`${item.quantity} ${item.unit}`}</Heading4>
                          </View>
                        </View>
                      )
                    })
                  ) : (
                    <>
                      <Image
                        style={{
                          width: 52,
                          height: 52,
                          marginTop: 20,
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                        source={require('../../../assets/box-empty.png')}
                      />
                      <Text1 style={{ alignSelf: 'center', color: '#C2C6CE' }}>ไม่มีของแถมที่ได้รับ</Text1>
                    </>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={{ marginTop: 30 }}
                onPress={() => navigation.navigate('SuccessDetail', { orderId: route.params.orderId })}
              >
                <Text1 style={{ color: '#616A7B', alignSelf: 'center' }}>ดูรายละเอียดคำสั่งซื้อนี้</Text1>
              </TouchableOpacity>
              <View style={styled.deliveryButtonContainer}>
                <TouchableOpacity
                  style={styled.deliveryButton}
                  onPress={() => {
                    navigation.navigate('Order')
                  }}
                >
                  <Heading3 style={styled.deliveryButtonText}>ดูคำสั่งซื้อทั้งหมด</Heading3>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Image
                style={{
                  height: 23,
                  width: '100%',
                  resizeMode: 'cover',
                }}
                source={require('../../../assets/bill.png')}
              />
            </View>
          </ScrollView>
        </>
      ) : null}
    </View>
  )
}
export default OrderSuccessScreen

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4C95FF' },
  headerWarp: {
    flexDirection: 'row',
    height: '10%',
    alignItems: 'center',
    marginTop: 20,
  },
  iconCloseContainer: { marginLeft: 15, marginRight: 100 },
  iconClose: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bodyContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 15,
  },
  shopNameWarp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconWaitWarp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconWait: {
    height: 111,
    width: 111,
    resizeMode: 'cover',
  },
  lineDash: {
    width: '100%',
    height: 1,
    alignSelf: 'center',
    marginTop: 20,
  },
  iconInvoice: { height: 20, width: 20, resizeMode: 'contain' },
  orderNoWarp: { flexDirection: 'row', marginTop: 10 },
  productHeaderWarp: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productTextWarp: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryButton: {
    height: 50,
    backgroundColor: '#4C95FF',
    justifyContent: 'center',
    borderRadius: 8,
  },
  deliveryButtonText: {
    color: '#FFF',
    alignSelf: 'center',
  },
  deliveryButtonContainer: {
    marginTop: '5%',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  warpPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
})
