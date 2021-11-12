import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import Dash from 'react-native-dash'
import { ScrollView } from 'react-native-gesture-handler'
import ProductCartCard from '../../components/ProductCartCard'
import { ShopDataSource } from '../../datasource/ShopDataSource'
import { PaymentMethod } from '../../definitions/PaymentMethod'
import { ShopEntity } from '../../entities/ShopEntity'
import { PurchaseStackParamList } from '../../navigations/PurchaseNavigator'
import { currencyFormat } from '../../utilities/CurrencyFormat'
import { ThaiDateFormat, ThaiTimeFormat } from '../../utilities/ThaiDateFormat'
import AccrodingPrice from '../../components/AccrodingPrice'
import { AccrodionPriceModel } from '../../models/AccrodionPriceModel'
import TagStatus from '../../components/TagStatus'
import { UserDataContext } from '../../provider/UserDataProvider'
import { SHIPPING_METHOD_MAPPING } from '../../definitions/ShippingMethod'
import CustomHeader from '../../components/CustomHeader'
import Text1 from '../../components/Font/Text1'
import Subheading1 from '../../components/Font/Subheading1'
import Subheading2 from '../../components/Font/Subheading2'
import Paragraph1 from '../../components/Font/Paragraph1'
import Heading3 from '../../components/Font/Heading3'
import Heading2 from '../../components/Font/Heading2'
import Text2 from '../../components/Font/Text2'
import Heading4 from '../../components/Font/Heading4'
import { OrderDataSource } from '../../datasource/OrderDataSource'
import { ResponseEntity } from '../../entities/ResponseEntity'
import { OrderEntity } from '../../entities/OrderEntity'

type OrderSuccessScreenDetailRouteProp = StackScreenProps<PurchaseStackParamList, 'SuccessDetail'>

const OrderSuccessScreenDetail: React.FC<OrderSuccessScreenDetailRouteProp> = ({ navigation, route }) => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0)
  const [shop, setShop] = useState<ShopEntity>()
  const [order, setOrder] = useState<OrderEntity>()
  const [discoutPromo, setDiscoutPromo] = useState<AccrodionPriceModel[]>([])
  const [specialRequest, setSpecialRequest] = useState<AccrodionPriceModel[]>([])
  const userDataStore = useContext(UserDataContext)
  const { userData } = userDataStore

  useEffect(() => {
    getOrderDetail()
  }, [])

  const getOrderDetail = () => {
    OrderDataSource.getOrderDetail(route.params.orderId).then((res: ResponseEntity<OrderEntity>) =>
      setOrder(res.responseData),
    )
  }

  const sumTotal = () => {
    let total = 0
    if (order?.items) {
      order?.items.map((item) => {
        total += item.quantity
      })
    }
    setTotalQuantity(total)
  }

  useEffect(() => {
    sumTotal()
    initialData()
  }, [])

  const initialData = () => {
    let orderItems = order?.items
    let recevied_item_discounts = order?.discount_memo
      .filter((item) => item.item_id != null && item.item_id != '')
      .map((i) => {
        let refItem = orderItems?.find((x) => x.id === i.item_id)
        return {
          name: refItem?.title,
          price: i.price,
          quantity: i.quantity,
          sale_unit: refItem?.unit,
        }
      })
    let recevied_request_item_discounts = order?.special_request_discounts.map((i) => {
      let refItem = orderItems?.find((x) => x.id === i.item_id)
      return {
        name: refItem?.title,
        price: i.price,
        quantity: i.quantity,
        sale_unit: refItem?.unit,
      }
    })
    let promo = formatAccrodion(recevied_item_discounts)
    let request = formatAccrodion(recevied_request_item_discounts)
    setDiscoutPromo(promo)
    setSpecialRequest(request)
  }

  // TODO: don't use any type
  const formatAccrodion = (
    data:
      | {
          name: string | undefined
          price: number
          quantity: number
          sale_unit: string | undefined
        }[]
      | undefined,
  ): AccrodionPriceModel[] => {
    let arrayOutput: any[] = []
    if (data) {
      data.map((item: any) => {
        let unit = item.sale_unit ? item.sale_unit : item.unit
        arrayOutput.push({
          item: `${item.name} (${item.price}฿ x ${item.quantity} ${unit})`,
          price: item.price,
          quantity: item.quantity,
        })
      })
    }
    return arrayOutput
  }

  const totalQuantityUnit = (): string => {
    return userData.company === 'icpf' ? 'ตัน' : 'ชุด'
  }

  const cancelByWording = (status: string): string => {
    if (status == 'sale_executive_rejected') {
      return '(ผู้จัดการ)'
    } else if (status == 'customer_canceled') {
      return '(ลูกค้า)'
    } else {
      return '(บริษัท)'
    }
  }

  return (
    <View style={styled.container}>
      {order ? (
        <>
          <CustomHeader
            title={ThaiDateFormat(order.created)}
            showBackBtn
            onPressBack={() => navigation.navigate('Home')}
          />
          <ScrollView>
            {order.status == 'sale_executive_rejected' ||
            order.status == 'customer_canceled' ||
            order.status == 'company_canceled' ? (
              <View style={{ paddingHorizontal: 20 }}>
                <Image
                  style={{ alignSelf: 'center', width: 120, height: 120 }}
                  source={require('../../../assets/reject-order.png')}
                />
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: 15,
                    borderRadius: 12,
                  }}
                >
                  <Heading3 style={{ paddingBottom: 12 }}>รายละเอียดการยกเลิก</Heading3>
                  <Text1 style={{ color: '#6B7995', paddingBottom: 4 }}>หมายเลขคำสั่งซื้อ: {order.order_no}</Text1>
                  <Text1 style={{ color: '#6B7995', paddingBottom: 12 }}>
                    ขอยกเลิก: {`${ThaiDateFormat(order.updated)} ${ThaiTimeFormat(order.updated)}`}
                  </Text1>
                  <View style={{ borderWidth: 1, borderColor: '#EBEFF2' }} />
                  <Heading3
                    style={{
                      paddingVertical: 12,
                    }}
                  >
                    เหตุผลที่ยกเลิก
                    {cancelByWording(order.status)}
                  </Heading3>
                  <Text1 style={{ color: '#6B7995', paddingBottom: 12 }}>{order.remark}</Text1>
                </View>
              </View>
            ) : null}

            <View style={styled.upperContainer}>
              <View style={styled.innerUpperContainer}>
                <View style={styled.orderNumberContainer}>
                  <Image style={styled.iconInvoice} source={require('../../../assets/invoice.png')} />
                  <Text style={styled.textOrderNumber}>{order.order_no}</Text>
                </View>
                <TagStatus status={order.status} />
              </View>
              <Dash dashGap={2} dashLength={4} dashThickness={1} style={styled.lineDash} dashColor="#C8CDD6" />
              <View>
                <Text1 style={styled.textGrayLabel}>ออเดอร์ของ</Text1>

                <Subheading1>{order.buyer.name}</Subheading1>

                <Text1 style={styled.textGrayLabel}>เวลาที่เปิดออเดอร์</Text1>
                <Subheading1>{`${ThaiDateFormat(order.created)} ${ThaiTimeFormat(order.created)}`}</Subheading1>
              </View>
            </View>
            <View style={styled.sectionBreak}>
              <Dash dashGap={2} dashLength={4} dashThickness={1} style={styled.lineDash} dashColor="#C8CDD6" />
              <View style={styled.footerOfHeader}>
                <View style={styled.borderLeftCircle} />
                <View style={styled.borderRightCircle} />
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FFF',
                marginHorizontal: 18,
                paddingHorizontal: 20,
              }}
            >
              <Text1 style={styled.textGrayLabel}>การจัดส่ง</Text1>
              <Subheading1>{SHIPPING_METHOD_MAPPING[order.shipping_method]}</Subheading1>
              <View style={{ marginVertical: 10 }}>
                <Paragraph1>{order.shipping_address.line_one + '\n' + order.shipping_address.line_two}</Paragraph1>
              </View>
              <Dash dashGap={2} dashLength={4} dashThickness={1} style={styled.lineDash} dashColor="#C8CDD6" />
              <View style={{ marginVertical: 10 }}>
                <Text1 style={styled.textGrayLabel}>หมายเหตุ</Text1>
                <Text>{order.shipping_address.remark ? order.shipping_address.remark.trim() : '-'}</Text>
              </View>
              <Dash dashGap={2} dashLength={4} dashThickness={1} style={styled.lineDash} dashColor="#C8CDD6" />
              <Text1 style={styled.textGrayLabel}>รายละเอียดสินค้า</Text1>
              {order.items.length > 0
                ? order.items.map((product) => {
                    return (
                      <ProductCartCard
                        key={product.id}
                        mode="show"
                        title={product.title}
                        pricePerUnit={product.price}
                        priceTotal={product.price * product.quantity}
                        image={product.cover}
                        quantity={product.quantity}
                        saleUnit={product.unit}
                        packingSize={product.packing_size}
                      />
                    )
                  })
                : null}
              <View style={styled.totalQuantity}>
                <Heading3>จำนวนรวม</Heading3>
                <Heading3>{`${totalQuantity} ${totalQuantityUnit()}`}</Heading3>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text1 style={styled.textGrayLabel}>หมายเหตุการขอส่วนลดพิเศษ</Text1>
                <Text1>{order.special_request_remark ? order.special_request_remark.trim() : '-'}</Text1>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text1 style={styled.textGrayLabel}>หมายเหตุ(Sale Co.) </Text1>
                <Text1>{order.sale_co_remark ? order.sale_co_remark.trim() : '-'}</Text1>
              </View>
              <Dash dashGap={2} dashLength={4} dashThickness={1} style={styled.lineDash} dashColor="#C8CDD6" />
              <Text1 style={styled.textGrayLabel}>วิธีชำระเงิน</Text1>
              <Text1>{order.payment_method == 'cash' ? PaymentMethod.cash : PaymentMethod.credit}</Text1>
              <View style={styled.productTextWarp}>
                <Text1 style={{ color: '#6B7995' }}>ราคาก่อนลด</Text1>
                <Subheading2 style={{ color: '#616A7B' }}>{currencyFormat(order.before_discount, 2)}</Subheading2>
              </View>

              {order.discount_memo.filter((item) => item.item_id != null).length > 0 ? (
                <AccrodingPrice
                  title="ส่วนลดรายการ"
                  total={order.discount_memo
                    .filter((item) => item.item_id != '')
                    .reduce((sum, item) => sum + item.quantity * item.price, 0)}
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
                  <Subheading2 style={{ color: '#FF5D5D' }}>{currencyFormat(order.subsidize, 2)}</Subheading2>
                </View>
              ) : null}
              {order.discount_memo.length > 0
                ? order.discount_memo
                    .filter((item) => item.item_id == null || item.id == 'cash')
                    .map((item) => {
                      return (
                        <View
                          key={item.id}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 10,
                            marginTop: 10,
                          }}
                        >
                          <Text1 style={{ color: '#6B7995' }}>ส่วนลดเงินสด</Text1>
                          <Subheading2 style={{ color: '#FF8329' }}>{currencyFormat(item.price, 2)}</Subheading2>
                        </View>
                      )
                    })
                : null}
              <View style={styled.productTextWarp}>
                <Text1 style={{ color: '#6B7995' }}>ส่วนลดรวม</Text1>
                <Subheading2 style={{ color: '#616A7B' }}>{currencyFormat(order.total_discount, 2)}</Subheading2>
              </View>
              <View style={{ borderWidth: 1, borderColor: '#EBEFF2' }} />
              <View style={styled.totalPrice}>
                <Subheading2 style={{ color: '#616A7B' }}>ราคารวม</Subheading2>
                <Heading2 style={{ color: '#4C95FF' }}>{currencyFormat(order.total_price, 2)}</Heading2>
              </View>
              <Dash dashGap={2} dashLength={4} dashThickness={1} style={styled.lineDash} dashColor="#C8CDD6" />
              <View style={styled.emptyPremiumContainer}>
                <Text1>ของแถมที่ได้รับ</Text1>
                {order.premium_memo.length > 0 ? (
                  <View style={{ marginTop: 10 }}>
                    {order.premium_memo.map((item) => {
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
                    })}
                  </View>
                ) : (
                  <View>
                    <Image style={styled.imgEmpty} source={require('../../../assets/box-empty.png')} />
                    <Text style={styled.textPremuimEmpty}>ไม่มีของแถมที่ได้รับ</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styled.footer}>
              <Image style={styled.imageFooter} source={require('../../../assets/subtract-detail.png')} />
            </View>
          </ScrollView>
        </>
      ) : null}
    </View>
  )
}

export default OrderSuccessScreenDetail

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5E5E5' },
  upperContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    marginTop: 18,
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  innerUpperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  orderNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textOrderNumber: { fontSize: 16, fontWeight: 'bold' },
  badgeStatus: {
    backgroundColor: '#FFE9D8',
    padding: 8,
    paddingVertical: 5,
    borderRadius: 15,
  },
  textStatus: { color: '#FF8824' },
  sectionBreak: {
    backgroundColor: '#FFF',
    marginHorizontal: 18,
  },
  iconInvoice: { height: 20, width: 20, resizeMode: 'contain' },
  lineDash: {
    width: '100%',
    height: 1,
    alignSelf: 'center',
  },
  textGrayLabel: {
    color: '#6B7995',
    marginVertical: 15,
  },
  borderLeftCircle: {
    backgroundColor: '#E5E5E5',
    borderRadius: 13,
    width: 13,
    padding: 13,
    left: -15,
    top: -13,
  },
  borderRightCircle: {
    backgroundColor: '#E5E5E5',
    borderRadius: 13,
    width: 13,
    padding: 13,
    right: -15,
    top: -13,
  },
  footer: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginBottom: 40,
    justifyContent: 'center',
  },
  emptyPremiumContainer: { marginTop: 10, marginBottom: 30 },
  imgEmpty: {
    width: 52,
    height: 52,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textPremuimEmpty: { alignSelf: 'center', color: '#C2C6CE' },
  imageFooter: {
    height: 11,
    width: '100%',
    resizeMode: 'cover',
  },
  totalQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  footerOfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  beforeDiscountWarper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 5,
  },
  totalDiscountWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  textDiscountFromProduct: {
    color: 'rgba(58, 174, 73, 1)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productTextWarp: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLabelTotal: { fontSize: 16, fontWeight: 'bold' },
  textTotal: { fontSize: 20, fontWeight: 'bold', color: '#4C95FF' },
})
