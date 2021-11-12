import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Image, Platform, Alert, TextInput } from 'react-native'
import ButtonShop from '../../components/ButtonShop'
import { StackScreenProps } from '@react-navigation/stack'
import { PurchaseStackParamList } from '../../navigations/PurchaseNavigator'
import ProductCartCard from '../../components/ProductCartCard'
import InputNumber from '../../components/InputNumber'
import { CartDataSource } from '../../datasource/CartDataSource'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ShopEntity } from '../../entities/ShopEntity'
import Dash from 'react-native-dash'
import { CartEntity, ItemCart } from '../../entities/CartEntity'
import { OrderFacade } from '../../facade/OrderFacade'
import { OrderApiEntity, OrderEntity } from '../../entities/OrderEntity'
import { currencyFormat } from '../../utilities/CurrencyFormat'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import CartEmptyState from './CartEmptyState'
import AccrodingPrice from '../../components/AccrodingPrice'
import { useIsFocused } from '@react-navigation/native'
import PremiumCard from '../../components/PremiumCard'
import { AccrodionPriceModel } from '../../models/AccrodionPriceModel'
import { Checkbox } from 'native-base'
import { UserDataContext } from '../../provider/UserDataProvider'
import ShipmentSection from './ShipmentSection'
import { Shipment } from './Shipment'
import { CartContext } from '../../context/cartStore'
import { Types } from '../../context/cartReducer'
import PaymentSection from './PaymentSection'
import CustomHeader from '../../components/CustomHeader'
import { ExclusdePromotionModel } from '../../models/ExcludePromotion'
import _ from 'lodash'
import Heading3 from '../../components/Font/Heading3'
import Text1 from '../../components/Font/Text1'
import Subheading2 from '../../components/Font/Subheading2'
import Heading2 from '../../components/Font/Heading2'
import Paragraph2 from '../../components/Font/Paragraph2'
import Text2 from '../../components/Font/Text2'
import { ResponseEntity } from '../../entities/ResponseEntity'
import { OrderDataSource } from '../../datasource/OrderDataSource'

type ShopScreenRouteProp = StackScreenProps<PurchaseStackParamList, 'Cart'>

const CartScreen: React.FC<ShopScreenRouteProp> = ({ navigation, route }) => {
  const [shipment, setShipment] = useState<Shipment>()
  const [cart, setCart] = useState<CartEntity | undefined>()
  const [quantity, setQuantity] = useState(0)
  const [payment, setPayment] = useState<string>()
  const [remark, setRemark] = useState<string | undefined>()
  const [specialRequest, setSpecialRequest] = useState<AccrodionPriceModel[]>([])
  const [discoutPromo, setDiscoutPromo] = useState<AccrodionPriceModel[]>([])
  const [useSubsidize, setUseSubsudize] = useState(false)
  const [excludePromotion, setExcludePromotion] = useState<ExclusdePromotionModel[]>([])
  const isFocused = useIsFocused()
  const userDataStore = useContext(UserDataContext)
  const { userData, permissions, shopNo, brand } = userDataStore
  const { dispatch } = useContext(CartContext)

  useEffect(() => {
    getCart()
  }, [isFocused])

  useEffect(() => {
    filterExcludePromotion(cart?.available_promotions, cart?.applied_promotions)
  }, [cart])

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

  const getCart = async () => {
    CartDataSource.getCartByShop(shopNo, brand).then((res: ResponseEntity<CartEntity>) => {
      setCart(res.responseData)
      setRemark(res.responseData.sale_co_remark)
      handlePayment(res.responseData.selected_payment?.id)
      let discountSpecial: AccrodionPriceModel[] = formatAccrodion(res.responseData.received_special_request_discounts)
      let discountProduct: AccrodionPriceModel[] = formatAccrodion(
        res.responseData.received_discounts.filter((item) => item.item_id != null),
      )
      setSpecialRequest(discountSpecial)
      setDiscoutPromo(discountProduct)
      if (res.responseData.subsidize_discount !== 0) {
        setUseSubsudize(true)
      }
      if (res?.responseData.available_payments && res?.responseData.available_payments.length <= 1) {
        res?.responseData.available_payments.map((item) => {
          setPayment(item.id)
        })
      }
    })
  }

  const increaseProduct = async (itemId: string, quantity: number) => {
    dispatch({
      type: Types.Adjust,
      payload: {
        id: itemId,
        quantity: quantity + 1,
        shopId: shopNo,
      },
    })
    await CartDataSource.addToCartByShopId(shopNo, brand, itemId, quantity + 1).then(
      (res: ResponseEntity<CartEntity>) => {
        setCart(res.responseData)

        let discountSpecial: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_special_request_discounts,
        )
        let discountProduct: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_discounts.filter((item) => item.item_id != null),
        )
        setSpecialRequest(discountSpecial)
        setDiscoutPromo(discountProduct)
      },
    )
  }

  const decreaseProduct = async (itemId: string, quantity: number) => {
    await CartDataSource.addToCartByShopId(shopNo, brand, itemId, quantity - 1).then(
      (res: ResponseEntity<CartEntity>) => {
        setCart(res.responseData)
        let discountSpecial: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_special_request_discounts,
        )
        let discountProduct: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_discounts.filter((item) => item.item_id != null),
        )
        setSpecialRequest(discountSpecial)
        setDiscoutPromo(discountProduct)
      },
    )
  }

  const adjustProduct = async (itemId: string, quantity: number) => {
    const regexp = /^[0-9\b]+$/
    if (quantity.toString() === '' || regexp.test(quantity.toString())) {
      CartDataSource.addToCartByShopId(shopNo, brand, itemId, quantity).then((res: ResponseEntity<CartEntity>) => {
        setCart(res.responseData)
        let discountSpecial: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_special_request_discounts,
        )
        let discountProduct: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_discounts.filter((item) => item.item_id != null),
        )
        setSpecialRequest(discountSpecial)
        setDiscoutPromo(discountProduct)
      })
    } else {
      alert('Number Only')
    }
  }
  const handleRemark = (remark: string) => {
    CartDataSource.addOrderRemark(remark, shopNo, brand)
      .then((res: ResponseEntity<CartEntity>) => {
        setCart(res.responseData)
      })
      .catch((err) => {
        alert('Something went wrong' + err)
      })
  }

  const removeItem = async (itemId: string) => {
    Alert.alert('ต้องการลบสินค้าใช่หรือไม่', '', [
      {
        text: 'ยกเลิก',
        style: 'cancel',
      },
      {
        text: 'ยืนยัน',
        onPress: () => {
          dispatch({
            type: Types.Delete,
            payload: {
              id: itemId,
              shopId: route.params.shop.id,
            },
          })
          CartDataSource.addToCartByShopId(shopNo, brand, itemId, 0).then((res: ResponseEntity<CartEntity>) => {
            setCart(res.responseData)
            let discountSpecial: AccrodionPriceModel[] = formatAccrodion(
              res.responseData.received_special_request_discounts,
            )
            let discountProduct: AccrodionPriceModel[] = formatAccrodion(
              res.responseData.received_discounts.filter((item) => item.item_id != null),
            )
            setSpecialRequest(discountSpecial)
            setDiscoutPromo(discountProduct)
          })
        },
      },
    ])
  }

  const handleShipmentChange = (s: Shipment) => {
    setShipment(s)
  }

  const handlePayment = (p: string) => {
    if (p == 'cash') {
      setPayment('cash')
      CartDataSource.updatePaymentMethods('cash', shopNo, brand).then((res: ResponseEntity<CartEntity>) => {
        // CartDataSource.calculate(shopNo, res.selected_payment.id, brand).then((res: CartEntity) => {
        setCart(res.responseData)
        let discountSpecial: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_special_request_discounts,
        )
        let discountProduct: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_discounts.filter((item) => item.item_id != null),
        )
        setPayment(res.responseData.selected_payment.id)
        setSpecialRequest(discountSpecial)
        setDiscoutPromo(discountProduct)
        // })
      })
    } else {
      setPayment('credit')
      CartDataSource.updatePaymentMethods('credit', shopNo, brand).then((res: ResponseEntity<CartEntity>) => {
        setCart(res.responseData)
        let discountSpecial: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_special_request_discounts,
        )
        let discountProduct: AccrodionPriceModel[] = formatAccrodion(
          res.responseData.received_discounts.filter((item) => item.item_id != null),
        )
        setPayment(res.responseData.selected_payment.id)
        setSpecialRequest(discountSpecial)
        setDiscoutPromo(discountProduct)
      })
    }
  }

  const handleUseSubsidize = (b: boolean) => {
    CartDataSource.updateSubidizeDiscount(shopNo, brand).then((res: CartEntity) => {
      setCart(res)
      setUseSubsudize(b)
    })
  }

  const confirmOrder = (shop: ShopEntity, cart: CartEntity) => {
    if (!cart.selected_payment) {
      alert('กรุณาเลือกวิธีการชำระเงิน')
    } else if (!shipment) {
      alert('กรุณาเลือกสถานที่จัดส่ง')
    } else {
      Alert.alert('ยืนยันคำสั่งซื้อใช่หรือไม่', '', [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ยืนยัน',
          onPress: () => {
            OrderDataSource.comfirmOrder(shopNo, brand).then((res: ResponseEntity<OrderApiEntity>) => {
              navigation.navigate('OrderSuccess', { orderId: res.responseData.order_id })
            })
          },
        },
      ])
    }
  }

  const getCashDiscount = (cart: CartEntity): number => {
    let discountItem = cart.received_discounts.find((i) => i.id === 'cash')
    return discountItem ? discountItem.price * discountItem.quantity : 0
  }

  const getPromoDiscountForItem = (cart: CartEntity, itemId: string): number => {
    let discountItem = cart.received_discounts.find((i) => i.item_id === itemId)
    return discountItem ? discountItem.price * discountItem.quantity : 0
  }

  const callUpdateExcludePromotion = (e: ExclusdePromotionModel) => {
    let newExcludePromotion = excludePromotion.map((p) => ({
      ...p,
      checked: e.promotion_id === p.promotion_id ? !p.checked : p.checked,
    }))
    setExcludePromotion(newExcludePromotion)
    let arrUncheckPromotion: Array<string> = newExcludePromotion.filter((p) => !p.checked).map((p) => p.promotion_id)

    CartDataSource.updateExcludePromotion(arrUncheckPromotion, shopNo, brand)
      .then((res: CartEntity) => {
        setCart(res)
        filterExcludePromotion(res.available_promotions, res.applied_promotions)
        let discountSpecial: AccrodionPriceModel[] = formatAccrodion(res.received_special_request_discounts)
        let discountProduct: AccrodionPriceModel[] = formatAccrodion(
          res.received_discounts.filter((item) => item.item_id != null),
        )
        setSpecialRequest(discountSpecial)
        setDiscoutPromo(discountProduct)
      })
      .catch((err) => {
        alert('Something went wrong' + err)
      })
  }

  const checkAllExcludePromotion = () => {
    let promotionIdAll: Array<string>
    if (excludePromotion.every((e) => e.checked)) {
      promotionIdAll = excludePromotion.map((e) => e.promotion_id)
    } else {
      promotionIdAll = []
    }
    CartDataSource.updateExcludePromotion(promotionIdAll, shopNo, brand)
      .then((res: CartEntity) => {
        setCart(res)
        filterExcludePromotion(res.available_promotions, res.applied_promotions)
        let discountSpecial: AccrodionPriceModel[] = formatAccrodion(res.received_special_request_discounts)
        let discountProduct: AccrodionPriceModel[] = formatAccrodion(
          res.received_discounts.filter((item) => item.item_id != null),
        )
        setSpecialRequest(discountSpecial)
        setDiscoutPromo(discountProduct)
      })
      .catch((err) => {
        alert('Something went wrong' + err)
      })
  }

  const filterExcludePromotion = (
    AvailablePromotions: Array<ExclusdePromotionModel>,
    AppliedPromotions: Array<ExclusdePromotionModel>,
  ) => {
    const uniqAvailablePromotions = _.uniqBy(AvailablePromotions, 'promotion_id')
    const uniqAppliedPromotions = _.uniqBy(AppliedPromotions, 'promotion_id')
    const applyFilter = uniqAppliedPromotions.length ? uniqAppliedPromotions.map((ap) => ap.promotion_id) : []
    const newAvaliable = uniqAvailablePromotions.map((av) => ({
      ...av,
      checked: applyFilter.includes(av.promotion_id),
    }))
    setExcludePromotion(newAvaliable)
  }
  return (
    <>
      <CustomHeader title={'ตะกร้าสินค้า'} showBackBtn onPressBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={styled.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={styled.warpChangeShop}>
          <ButtonShop shopName={route.params.shop.name} onPress={() => navigation.navigate('ShopList')} />
        </View>
        {cart !== undefined ? (
          <View style={styled.borderContainer}>
            {cart.items.length > 0 ? (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styled.productContainer}>
                    <Heading3 style={styled.textProduct}>สินค้า</Heading3>
                    {cart.items.map((item: ItemCart, index: number) => {
                      let discount = getPromoDiscountForItem(cart, item.id)
                      return (
                        <ProductCartCard
                          key={item.id}
                          title={item.title}
                          pricePerVolume={item.price_per_volume}
                          volumeUnit={item.volume_unit}
                          packingSize={item.packing_size}
                          image={item.image}
                          pricePerUnit={item.price}
                          saleUnit={item.sale_unit}
                          quantity={item.quantity}
                          priceTotal={item.total_price + discount}
                          onDelete={() => removeItem(item.id)}
                          mode="cart"
                          discount={Math.abs(discount)}
                          originalPrice={item.total_price}
                        >
                          <InputNumber
                            key={item.title}
                            value={item.quantity.toString()}
                            onPlus={() => increaseProduct(item.id, item.quantity)}
                            onMinus={() => decreaseProduct(item.id, item.quantity)}
                            onChangeText={(e: any) => {
                              setQuantity((cart.items[index].quantity = e))
                            }}
                            onBlur={() => adjustProduct(item.id, quantity)}
                          />
                        </ProductCartCard>
                      )
                    })}
                  </View>

                  {cart.available_premiums.length > 0 ? (
                    <View style={styled.remarkWrapper}>
                      <View>
                        <Heading3>ของแถมที่ได้รับ</Heading3>
                      </View>

                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={cart.available_premiums}
                        renderItem={({ item }) => (
                          <PremiumCard
                            title={item.name}
                            desc={item.packing_size}
                            image={item.image}
                            quantity={item.quantity}
                            unit={item.unit}
                          />
                        )}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                  ) : null}

                  {excludePromotion.length > 0 ? (
                    <View style={styled.remarkWrapper}>
                      <Heading3>โปรโมชั่นที่ร่วมรายการ</Heading3>
                      <View style={styled.promotionCheckbox}>
                        <Checkbox
                          value={'checkAll'}
                          colorScheme="rgba(76, 149, 255,1)"
                          style={{ marginVertical: 10 }}
                          onChange={() => checkAllExcludePromotion()}
                          isChecked={excludePromotion.every((e) => e.checked)}
                          isDisabled={permissions.responseData.cartPage.checkJoinPromotion === 'disable' ? true : false}
                        >
                          <Text1 style={{ color: '#6B7995', marginLeft: 10 }}>เข้าร่วมโปรโมชั่นทั้งหมด</Text1>
                        </Checkbox>

                        {excludePromotion.map((e, i) => (
                          <View style={styled.excludePromotionWrapper} key={i}>
                            <View style={styled.textExcludeContainer}>
                              <TouchableOpacity
                                onPress={() => callUpdateExcludePromotion(e)}
                                disabled={
                                  permissions.responseData.cartPage.checkJoinPromotion === 'disable' ? true : false
                                }
                              >
                                <Paragraph2 style={{ color: '#6B7995' }}>{e.promotion_name}</Paragraph2>
                              </TouchableOpacity>
                            </View>
                            <Checkbox
                              value={'exclude Promotion'}
                              colorScheme="rgba(76, 149, 255,1)"
                              isChecked={e.checked}
                              onChange={() => callUpdateExcludePromotion(e)}
                              isDisabled={
                                permissions.responseData.cartPage.checkJoinPromotion === 'disable' ? true : false
                              }
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}

                  <View style={styled.remarkWrapper}>
                    <Heading3>หมายเหตุ (สำหรับ Sale Co)</Heading3>
                    <TextInput
                      style={styled.remarkTextInput}
                      value={remark}
                      placeholder="ใส่หมายเหตุ..."
                      onChangeText={setRemark}
                      onEndEditing={(e) => handleRemark(e.nativeEvent.text)}
                      multiline
                    />
                  </View>
                  {specialRequest.length > 0 ? (
                    <View style={styled.specialRequestContainer}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Heading3>Special Request</Heading3>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('SpecialRequest', {
                              cart: cart,
                              shop: route.params.shop,
                              item: specialRequest,
                              productBrand: route.params.productBrand,
                              company: route.params.company,
                            })
                          }
                        >
                          <Paragraph2
                            style={{
                              color: '#4C95FF',
                            }}
                          >
                            แก้ไข
                          </Paragraph2>
                        </TouchableOpacity>
                      </View>
                      <View style={styled.line} />
                      <AccrodingPrice
                        title="ขอส่วนลดพิเศษเพิ่ม"
                        total={cart.total_received_special_request_discount}
                        detail={specialRequest}
                        price_color={'#BB6BD9'}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SpecialRequest', {
                          cart: cart,
                          shop: route.params.shop,
                          item: specialRequest,
                          productBrand: route.params.productBrand,
                          company: route.params.company,
                        })
                      }
                      style={styled.buttonSpecialRequestContainer}
                    >
                      <View style={styled.buttonSpecialRequest}>
                        <Image
                          style={{ width: 25, height: 25 }}
                          source={require('../../../assets/special_request.png')}
                        />
                        <Heading3 style={styled.textButtonSpecialRequest}>Special Request</Heading3>
                      </View>
                    </TouchableOpacity>
                  )}

                  {cart.special_request_remark ? (
                    <View
                      style={{
                        paddingLeft: 20,
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <Heading3>หมายเหตุ</Heading3>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: 12,
                          alignItems: 'center',
                        }}
                      >
                        <Heading3 style={{ color: '#6B7995' }}>{cart.special_request_remark}</Heading3>
                      </View>
                    </View>
                  ) : null}
                  <PaymentSection
                    selectPayment={cart.selected_payment?.id}
                    payments={cart.available_payments}
                    onChange={(e) => {
                      handlePayment(e)
                    }}
                  />
                  <View style={{ paddingHorizontal: 15, backgroundColor: 'white' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Heading3>ส่วนลดดูแลราคา</Heading3>
                      <Text2 style={{ color: '#616A7B' }}>
                        {useSubsidize
                          ? currencyFormat(cart.available_subsidize - cart.usable_subsidize, 2)
                          : currencyFormat(cart.available_subsidize, 2)}
                      </Text2>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 12,
                        alignItems: 'center',
                      }}
                    >
                      {cart.available_subsidize > 0 ? (
                        <>
                          <Checkbox
                            value=""
                            isChecked={useSubsidize}
                            onChange={() => handleUseSubsidize(!useSubsidize)}
                            colorScheme="rgba(255, 93, 93, 1)"
                            style={{
                              borderRadius: 4,
                              width: 20,
                              height: 20,
                              alignItems: 'center',
                            }}
                            isDisabled={
                              permissions.responseData.cartPage.checkJoinCoDiscount === 'disable' ? true : false
                            }
                          />
                          <Subheading2 style={{ marginLeft: 15, color: '#6B7995' }}>ใช้ส่วนลด</Subheading2>
                          <Subheading2 style={{ color: '#FF5D5D', fontWeight: 'bold' }}>
                            {' ' + currencyFormat(cart.usable_subsidize, 2)}
                          </Subheading2>
                        </>
                      ) : (
                        <Subheading2 style={{ color: '#6B7995' }}>ไม่มีวงเงินที่สามารถใช้ได้</Subheading2>
                      )}
                    </View>
                  </View>
                  <Dash
                    dashGap={2}
                    dashLength={4}
                    dashThickness={4}
                    style={{ width: '100%', height: 1 }}
                    dashColor="#C8CDD6"
                  />
                  <View style={styled.totalPriceContainer}>
                    <View style={styled.warpPrice}>
                      <Text1 style={{ color: '#6B7995' }}>ราคาก่อนลด</Text1>
                      <Text1 style={{ color: '#6B7995' }}>{currencyFormat(cart.before_discount, 2)}</Text1>
                    </View>

                    {cart.received_discounts.filter((item) => item.item_id != null).length > 0 ? (
                      <AccrodingPrice
                        title="ส่วนลดรายการ"
                        total={cart?.received_discounts
                          .filter((item) => item.item_id != null)
                          .reduce((sum, item) => sum + item.total, 0)}
                        detail={discoutPromo}
                        price_color={'#3AAE49'}
                      />
                    ) : null}
                    {cart.received_special_request_discounts.length > 0 ? (
                      <AccrodingPrice
                        title="ขอส่วนลดพิเศษเพิ่ม"
                        total={cart.total_received_special_request_discount}
                        detail={specialRequest}
                        price_color={'#BB6BD9'}
                      />
                    ) : null}
                    {cart.subsidize_discount != 0 ? (
                      <View style={styled.warpPrice}>
                        <Text1 style={{ color: '#6B7995' }}>ส่วนลดดูแลราคา</Text1>
                        <Subheading2 style={{ color: '#FF5D5D' }}>
                          {currencyFormat(cart.subsidize_discount, 2)}
                        </Subheading2>
                      </View>
                    ) : null}
                    {getCashDiscount(cart) != 0 ? (
                      <View style={styled.warpPrice}>
                        <Text1 style={{ color: '#6B7995' }}>ส่วนลดเงินสด</Text1>
                        <Subheading2
                          style={{
                            color: '#FF8329',
                          }}
                        >
                          {currencyFormat(getCashDiscount(cart), 2)}
                        </Subheading2>
                      </View>
                    ) : null}
                    <View
                      style={{
                        backgroundColor: '#FBFBFB',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 5,
                        padding: 5,
                      }}
                    >
                      <Text1 style={{ color: '#6B7995' }}>ส่วนลดรวม</Text1>
                      <Subheading2 style={styled.textTotalDiscount}>
                        {currencyFormat(cart.total_discount, 2)}
                      </Subheading2>
                    </View>
                    <View style={styled.warpPrice}>
                      <Heading3 style={{ color: '#616A7B' }}>ราคารวม</Heading3>
                      <Heading2 style={{ color: '#4C95FF' }}>{currencyFormat(cart.total_price, 2)}</Heading2>
                    </View>
                  </View>
                  <View style={styled.warpDelivery}>
                    <ShipmentSection
                      company={route.params.company}
                      shopId={route.params.shop.id}
                      onChange={(v) => {
                        if (v) handleShipmentChange(v)
                      }}
                      withDefault={true}
                    />
                  </View>
                </ScrollView>
                <View
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'column',
                    height: 90,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                    shadowOpacity: 0.39,
                    shadowRadius: 8.3,
                    elevation: 13,
                  }}
                >
                  <TouchableOpacity
                    style={styled.confirmOrderButton}
                    onPress={() => {
                      confirmOrder(route.params.shop, cart)
                    }}
                  >
                    <View style={styled.iconCartWarp}>
                      <Image style={styled.iconLocation} source={require('../../../assets/order-cart.png')} />
                    </View>
                    <Heading3 style={styled.textconfirmOrderButton}>ยืนยันคำสั่งซื้อ</Heading3>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <CartEmptyState />
            )}
          </View>
        ) : (
          <>
            <View style={styled.productContainer}>
              <Heading3 style={styled.textProduct}>สินค้า</Heading3>
              <SkeletonPlaceholder>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 60, height: 60 }} />
                  <View style={{ marginLeft: 20 }}>
                    <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
              </SkeletonPlaceholder>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </>
  )
}

export default CartScreen

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  warpChangeShop: {
    padding: 10,
  },
  borderContainer: {
    flex: 2,
    backgroundColor: '#F8FAFF',
  },
  productContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  innerProductContainer: { marginTop: 10 },
  textProduct: { marginBottom: 10 },
  paymentContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'white',
  },
  paymentMethod: {
    marginTop: 10,
    borderBottomColor: '#EBEFF2',
    borderBottomWidth: 2,
    borderTopColor: '#EBEFF2',
    borderTopWidth: 2,
    borderRadius: 3,
    padding: 20,
  },
  textBodyPayment: {
    fontSize: 16,
    color: '#616A7B',
  },
  lineDash: {
    borderStyle: 'dashed',
    borderWidth: 5,
    borderRadius: 5,
    borderColor: '#C8CDD6',
    borderTopWidth: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  line: {
    marginTop: 10,
    borderBottomColor: '#EBEFF2',
    borderBottomWidth: 2,
    borderRadius: 3,
  },
  totalPriceContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  warpPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  textSubsidizeDiscount: {
    color: '#FF5D5D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDiscountFromProduct: {
    color: 'rgba(58, 174, 73, 1)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textDiscountFromCash: {
    color: '#4C95FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textTotalDiscount: {
    color: '#616A7B',
  },
  confirmOrderButton: {
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#4C95FF',
    padding: 10,
    margin: 20,
    alignItems: 'center',
  },
  iconLocation: { width: 20, height: 20, resizeMode: 'contain' },
  iconCartWarp: {
    marginRight: 100,
    marginLeft: 10,
  },
  textconfirmOrderButton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSpecialRequestContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    padding: 20,
  },
  buttonSpecialRequest: {
    backgroundColor: '#EAF4FF',
    height: 48,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonSpecialRequest: {
    color: '#4C95FF',
    marginLeft: 10,
  },
  PremiumContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    padding: 20,
  },
  specialRequestContainer: {
    marginTop: 5,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  warpDelivery: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  iconPin: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#4C95FF',
    width: 20,
    height: 20,
    marginRight: 5,
  },
  iconUnPin: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    width: 20,
    height: 20,
    marginRight: 5,
  },
  methodChoiceContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  remarkWrapper: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
  },
  remarkTextInput: {
    height: 128,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#E1E7F6',
    marginTop: 12,
    textAlignVertical: 'top',
  },
  promotionCheckbox: {
    flex: 1,
    alignItems: 'flex-start',
  },
  excludePromotionWrapper: {
    backgroundColor: '#FBFBFB',
    padding: 10,
    borderBottomColor: '#EBEFF2',
    borderBottomWidth: 0.5,
    width: '100%',
    flexDirection: 'row',
  },
  textExcludeContainer: {
    width: '95%',
  },
})
