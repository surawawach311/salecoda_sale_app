import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'

import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Types } from '../../context/cartReducer'
import { CartContext } from '../../context/cartStore'
import { CartDataSource } from '../../datasource/CartDataSource'
import { ProductDataSource } from '../../datasource/ProductDataSource'
import { ProductEntity, PromotionEntity } from '../../entities/ProductEntity'
import { PurchaseStackParamList } from '../../navigations/PurchaseNavigator'
import { currencyFormat } from '../../utilities/CurrencyFormat'
import Toast from 'react-native-root-toast'
import MiniCart from '../../components/MiniCart'
import CustomHeader from '../../components/CustomHeader'
import Heading2 from '../../components/Font/Heading2'
import Paragraph1 from '../../components/Font/Paragraph1'
import Subheading2 from '../../components/Font/Subheading2'
import Heading3 from '../../components/Font/Heading3'
import Subheading1 from '../../components/Font/Subheading1'
import { UserDataContext } from '../../provider/UserDataProvider'
import { ResponseEntity } from '../../entities/ResponseEntity'

type ProductDetailScreenNavigationProp = StackScreenProps<PurchaseStackParamList, 'ProductDetail'>

const ProductDetailScreen: React.FC<ProductDetailScreenNavigationProp> = ({ navigation, route }) => {
  const [quantity, setQuantity] = useState(0)
  const [product, setProduct] = useState<ProductEntity>()
  const [totalItem, setTotalItem] = useState(0)
  const { state, dispatch } = useContext(CartContext)
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(false)
  const profile = useContext(UserDataContext)
  const { config, shopNo, brand, userData } = profile

  useEffect(() => {
    initialQuantity()
    getProduct()
  }, [isFocused])

  const initialQuantity = () => {
    CartDataSource.getCartByShop(shopNo, brand).then((res) => {
      const itemQuantity = res.responseData.items.find((item) => item.prod_id === route.params.productId)
      setTotalItem(res.responseData.total_item)
      if (itemQuantity) {
        setQuantity(itemQuantity.quantity)
        dispatch({
          type: Types.Adjust,
          payload: {
            id: route.params.productId,
            quantity: itemQuantity.quantity,
            shopId: shopNo,
          },
        })
      } else {
        setQuantity(0)
      }
    })
  }

  const getProduct = async () => {
    await ProductDataSource.getProductDetail(brand, shopNo, route.params.productId).then(
      (res: ResponseEntity<ProductEntity>) => {
        if (config.productDetail.showPromotionLabel) {
          setProduct(res.responseData)
        } else {
          res.responseData.promotions = []
          setProduct(res.responseData)
        }
      },
    )
  }

  const addCart = async (action: string) => {
    const nextQuantity = action === 'plus' ? quantity + 5 : quantity - 5
    dispatch({
      type: Types.Adjust,
      payload: {
        id: route.params.productId,
        quantity: nextQuantity,
        shopId: shopNo,
      },
    })
    setQuantity(nextQuantity)
    const res = await CartDataSource.addToCartByShopId(shopNo, brand, route.params.productId, nextQuantity)
    if (res && action === 'plus') {
      if (!loading) {
        setLoading(true)
        setTimeout(() => {
          let toast = Toast.show('เพิ่มสินค้าไปยังตะกร้าแล้ว', {
            duration: Toast.durations.LONG,
            position: 750,
            shadow: true,
            animation: true,
            hideOnPress: true,
            opacity: 0.7,
          })
          setTimeout(function () {
            Toast.hide(toast)
            setLoading(false)
          }, 1500)
        }, 1500)
      }
    }
    setTotalItem(res.responseData.total_item)
  }

  const adjustProduct = async (quantity: number) => {
    const regexp = /^[0-9\b]+$/
    if (quantity.toString() === '' || regexp.test(quantity.toString())) {
      CartDataSource.addToCartByShopId(shopNo, brand, route.params.productId, quantity)
    } else {
      alert('Number Only')
    }
  }

  const renderMiniCart = () => {
    return (
      <MiniCart
        itemCount={totalItem}
        onPress={() =>
          navigation.navigate('Cart', {
            shop: route.params.shop,
            productBrand: route.params.productBrand,
            company: route.params.company,
          })
        }
      />
    )
  }

  return (
    <>
      {product ? (
        <>
          <CustomHeader showBackBtn onPressBack={() => navigation.goBack()} headerRight={renderMiniCart} />
          <ScrollView
            style={styled.container}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <View style={styled.wrapInfo}>
                <View style={styled.imageInfo}>
                  {product.image !== '' ? (
                    <Image style={styled.image} source={{ uri: product?.image }} />
                  ) : (
                    <Image style={styled.image} source={require('../../../assets/empty-product.png')} />
                  )}
                </View>
                <View>
                  {userData.company === 'icpl' ? (
                    <View style={styled.wrapTitlePrice}>
                      <View style={{ width: '70%' }}>
                        <Heading2>{product?.title}</Heading2>
                      </View>
                      <Heading2>{currencyFormat(Math.trunc(product?.price_per_volume), 0)}</Heading2>
                    </View>
                  ) : (
                    <>
                      <View style={styled.wrapTitlePrice}>
                        <View>
                          <Heading2>{product?.title}</Heading2>
                        </View>
                      </View>
                      <Heading2 style={{ color: '#4C95FF' }}>
                        {currencyFormat(Math.trunc(product?.price_per_volume), 0)}
                      </Heading2>
                    </>
                  )}
                  <View>
                    <Paragraph1 style={styled.textCommon}>{product?.common_title}</Paragraph1>
                    <Paragraph1 style={styled.textSize}>{`${product.packing_size} | ${currencyFormat(
                      Math.trunc(product.price_per_sale_unit),
                    )}/${product.sale_unit}`}</Paragraph1>
                  </View>
                </View>
              </View>
              <View style={styled.containerDescription}>
                <View style={styled.wrapDescriptionHeader}>
                  <Subheading2>รายละเอียดสินค้า</Subheading2>
                </View>
                <View style={styled.wrapDescription}>
                  <Subheading2>สารสำคัญ</Subheading2>
                  <Paragraph1 style={styled.textH5}>{product?.common_title}</Paragraph1>
                  <Subheading2>คุณสมบัติและ ประโยชน์</Subheading2>
                  <Paragraph1 style={styled.textH5}>{product.property ? product.property : '-'}</Paragraph1>
                </View>
                {product?.promotions
                  ? product.promotions.map((promotion: PromotionEntity) => {
                      return (
                        <View key={promotion.id} style={styled.warpPromotion}>
                          <Image style={{ width: 25, height: 25 }} source={require('../../../assets/promotion.png')} />
                          <View style={{ marginLeft: 5 }}>
                            <Heading3 style={{ color: '#FFFFFF' }}>โปรโมชั่น</Heading3>
                            <Paragraph1 style={{ color: '#FFFFFF' }}>{promotion.desc}</Paragraph1>
                          </View>
                        </View>
                      )
                    })
                  : null}
              </View>
            </View>
          </ScrollView>
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={styled.wrapBottom}>
              <View style={styled.safeAreaBottom}>
                <View style={styled.warpQuantity}>
                  {quantity <= 0 ? (
                    <TouchableOpacity disabled>
                      <Image style={styled.imgIcon} source={require('../../../assets/minus-cart.png')} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={async () => {
                        addCart('minus')
                      }}
                    >
                      <Image style={styled.imgIcon} source={require('../../../assets/minus-cart.png')} />
                    </TouchableOpacity>
                  )}

                  <TextInput
                    style={{
                      marginHorizontal: 10,
                      minWidth: 60,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: '#616A7B',
                      fontSize: 20,
                      fontWeight: '600',
                    }}
                    maxLength={5}
                    value={quantity.toString()}
                    onChangeText={(text) => {
                      setQuantity(Number(text))
                      adjustProduct(Number(text))
                    }}
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      addCart('plus')
                    }}
                  >
                    <Image style={styled.imgIcon} source={require('../../../assets/add-cart.png')} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Cart', {
                      shop: route.params.shop,
                      productBrand: route.params.productBrand,
                      company: route.params.company,
                    })
                  }
                >
                  <View style={styled.buttonCheckout}>
                    <Subheading1 style={styled.textButton}>สั่งซื้อสินค้า</Subheading1>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      ) : null}
    </>
  )
}

export default ProductDetailScreen

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  wrapInfo: {
    flex: 0.7,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  imageInfo: {
    padding: 10,
  },
  wrapTitlePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  textCommon: { fontSize: 14, color: '#333333' },
  textSize: { fontSize: 16, color: '#616A7B', marginTop: 10 },
  image: {
    height: 160,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  containerDescription: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
  wrapDescriptionHeader: {
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    padding: 20,
  },
  textH5: { color: '#6B7995', marginTop: 20, marginBottom: 20 },
  wrapDescription: {
    padding: 20,
  },

  imgIcon: {
    width: 42,
    height: 42,
  },
  warpQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  wrapBottom: {
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
  },
  safeAreaBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  buttonCheckout: {
    width: 160,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#4C95FF',
    borderRadius: 8,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
  },
  warpPromotion: {
    borderRadius: 10,
    padding: 20,
    margin: 20,
    backgroundColor: '#DE2828',
    flexDirection: 'row',
  },
})
