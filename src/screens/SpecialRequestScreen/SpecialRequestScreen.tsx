import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import AccrodingPrice from '../../components/AccrodingPrice'
import CustomHeader from '../../components/CustomHeader'
import Heading2 from '../../components/Font/Heading2'
import Heading3 from '../../components/Font/Heading3'
import Paragraph1 from '../../components/Font/Paragraph1'
import Subheading2 from '../../components/Font/Subheading2'
import Text1 from '../../components/Font/Text1'
import SpecialRequestProductCard from '../../components/SpecialProductCard'
import { CartDataSource } from '../../datasource/CartDataSource'
import { CartEntity } from '../../entities/CartEntity'
import { CartFacade } from '../../facade/CartFacade'
import { AccrodionPriceModel } from '../../models/AccrodionPriceModel'
import { ItemSpecialRequest, ProductSpecialRequestModel } from '../../models/SpecialRequestModel'
import { PurchaseStackParamList } from '../../navigations/PurchaseNavigator'
import { currencyFormat } from '../../utilities/CurrencyFormat'

type SpecialRequestScreennRouteProp = StackScreenProps<PurchaseStackParamList, 'SpecialRequest'>

const SpecialRequestScreen: React.FC<SpecialRequestScreennRouteProp> = ({ navigation, route }) => {
  const [products, setProducts] = useState<ProductSpecialRequestModel[]>([])
  const [request, setRequest] = useState<ItemSpecialRequest[]>([])
  const [cart, setCart] = useState<CartEntity>(route.params.cart)
  const [discoutPromo, setDiscoutPromo] = useState<AccrodionPriceModel[]>([])
  const [specialRequest, setSpecialRequest] = useState<any[]>([])
  const [remark, setRemark] = useState('')

  useEffect(() => {
    formatData()
  }, [])
  const formatData = () => {
    const productSpecialRequest: ProductSpecialRequestModel[] = route.params.cart.items.map((item) => ({
      id: item.id,
      name: item.title,
      image: item.image,
      quantity: item.quantity,
      sale_unit: item.sale_unit,
      promotion_discount: route.params.cart.received_discounts.find((a) => a.item_id == item.id)?.price,
      total_price: item.total_price,
      discount: route.params.cart.received_special_request_discounts.find((special) => special.item_id == item.id)
        ?.price,
    }))

    const itemRequest: ItemSpecialRequest[] = route.params.cart.received_special_request_discounts.map((item) => ({
      price_id: item.id,
      amount: Math.abs(item.price),
    }))
    setProducts(productSpecialRequest)
    setRequest(itemRequest)
    let promo = formatAccrodion(
      route.params.cart.received_discounts.filter((item) => item.item_id != null && item.item_id != ''),
    )
    let request = formatAccrodion(route.params.cart.received_special_request_discounts)
    setDiscoutPromo(promo)
    setSpecialRequest(request)
    setRemark(route.params.cart.special_request_remark)
  }

  // TODO: don't use any type
  const formatAccrodion = (data: any[]): AccrodionPriceModel[] => {
    let arrayOutput: any[] = []
    data.map((item: any) => {
      let unit = item.sale_unit ? item.sale_unit : item.unit
      arrayOutput.push({
        id: item.id,
        item: `${item.name} (${Math.abs(item.price)}??? x ${item.quantity} ${unit})`,
        price: Math.abs(item.price),
        quantity: item.quantity,
      })
    })
    return arrayOutput
  }

  const handleRemoveItem = (value?: string) => {
    const id = value
    setSpecialRequest(specialRequest.filter((item) => item.id !== id))
    setRequest(request.filter((item) => item.price_id !== id))
  }
  const propsCallback = (e: ItemSpecialRequest) => {
    let productRequestDiscount: ItemSpecialRequest[] = request?.map((item: ItemSpecialRequest) => {
      return item.price_id == e.price_id
        ? {
            ...item,
            amount: e.amount,
          }
        : item
    })

    if (request.length <= 0) {
      setRequest([{ amount: e.amount, price_id: e.price_id }])
    } else {
      let checkDuplicateId = request.find((item) => item.price_id === e.price_id)
      if (checkDuplicateId) {
        setRequest((prevState) =>
          prevState.map((item) => {
            return item.price_id === e.price_id
              ? {
                  ...item,
                  amount: e.amount,
                }
              : item
          }),
        )
      } else {
        setRequest((prevArray) => [...prevArray, { amount: e.amount, price_id: e.price_id }])
      }
    }

    let productCardRequestDiscount = products.map((item: ProductSpecialRequestModel) => {
      return item.id == e.price_id
        ? {
            ...item,
            discount: e.amount,
          }
        : item
    })
    let newItem = {
      id: e.price_id,
      item: `${products.find((a) => a.id == e.price_id)?.name} (${currencyFormat(parseInt(e.amount))} x ${
        products.find((a) => a.id == e.price_id)?.quantity
      } ${products.find((a) => a.id == e.price_id)?.sale_unit})`,
      price: e.amount,
      quantity: products.find((a) => a.id == e.price_id)?.quantity,
    }

    if (specialRequest.length <= 0) {
      setSpecialRequest([newItem])
    } else {
      let checkDuplicateId = specialRequest.find((item) => item.id === e.price_id)
      if (checkDuplicateId) {
        setSpecialRequest((prevState) =>
          prevState.map((item) => {
            return item.id === e.price_id
              ? {
                  ...item,
                  item: `${products.find((a) => a.id == e.price_id)?.name} (${currencyFormat(parseInt(e.amount))} x ${
                    products.find((a) => a.id == e.price_id)?.quantity
                  } ${products.find((a) => a.id == e.price_id)?.sale_unit})`,
                  price: e.amount,
                }
              : item
          }),
        )
      } else {
        setSpecialRequest((prevArray) => [...prevArray, newItem])
      }
    }

    setProducts(productCardRequestDiscount)

    CartDataSource.calculateSpecialRequest(
      route.params.company,
      route.params.shop.id,
      productRequestDiscount,
      remark,
      route.params.productBrand,
    ).then((res) => {
      setCart(res)
    })
  }

  const createSpecialRequest = () => {
    CartFacade.createSpecialRequest(route.params.shop.id, request, remark).then((res) => {
      CartDataSource.addSpecialRequest(
        route.params.company,
        route.params.shop.id,
        res,
        undefined,
        undefined,
        route.params.productBrand,
      ).then((res: CartEntity) => {
        navigation.navigate('Cart', {
          shop: route.params.shop,
          productBrand: route.params.productBrand,
          company: route.params.company,
        })
      })
    })
  }

  const handleConfirmSpecialRequest = () => {
    createSpecialRequest()
  }

  return (
    <>
      <CustomHeader title={'???????????????????????????????????????'} showBackBtn onPressBack={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={90}>
          <View style={styled.specialLabel}>
            <Heading3>???????????????????????????????????????????????????</Heading3>
          </View>
          {products
            ? products.map((product) => {
                return (
                  <SpecialRequestProductCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    image={product.image}
                    quantity={product.quantity}
                    sale_unit={product.sale_unit}
                    total_price={product.total_price}
                    promotion_discount={product.promotion_discount}
                    callback={propsCallback}
                    discountRequest={product.discount}
                    onDelete={handleRemoveItem}
                  />
                )
              })
            : null}

          <View style={styled.remarkWrapper}>
            <Heading3>????????????????????????</Heading3>
            <TextInput
              style={styled.remarkTextInput}
              value={remark}
              placeholder="?????????????????????????????????..."
              onChangeText={setRemark}
              multiline
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 20,
          paddingBottom: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 11.14,
          elevation: 17,
        }}
      >
        <View
          style={{
            padding: 10,
          }}
        >
          <View style={styled.warpSummary}>
            <Text1 style={{ color: '#6B7995' }}>??????????????????????????????</Text1>
            <Subheading2 style={{ color: '#6B7995' }}>{currencyFormat(cart?.before_discount, 2)}</Subheading2>
          </View>

          <AccrodingPrice
            title="????????????????????????????????????"
            total={discoutPromo
              .filter((item) => item.item != '')
              .reduce((sum, item) => sum + item.quantity * item.price, 0)}
            detail={discoutPromo}
            price_color={'#3AAE49'}
          />
          <AccrodingPrice
            title="??????????????????????????????????????????????????????"
            total={specialRequest.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            detail={specialRequest}
            price_color={'#BB6BD9'}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: '#EBEFF2',
              marginVertical: 10,
            }}
          />
          <View style={styled.warpSummary}>
            <Subheading2 style={{ color: '#616A7B' }}>?????????????????????</Subheading2>
            <Heading2 style={{ color: '#4C95FF' }}>{currencyFormat(cart?.total_price)}</Heading2>
          </View>
        </View>
        <TouchableOpacity style={styled.confirmOrderButton} onPress={() => handleConfirmSpecialRequest()}>
          <Text1 style={{ color: '#FFFFFF' }}>???????????????????????????????????????????????????</Text1>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default SpecialRequestScreen

const styled = StyleSheet.create({
  specialLabel: { padding: 16, backgroundColor: '#FFFFFF', marginBottom: 5, marginTop: 1 },
  remarkWrapper: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
  },
  remarkTextInput: {
    height: 128,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#E1E7F6',
    marginTop: 12,
    textAlignVertical: 'top',
    fontFamily: 'NotoSansThaiMedium',
    fontSize: 16,
  },
  confirmOrderButton: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#4C95FF',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warpSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
})
