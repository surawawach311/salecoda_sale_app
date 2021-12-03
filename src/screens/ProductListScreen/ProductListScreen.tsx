import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, FlatList, View } from 'react-native'
import { PurchaseStackParamList } from '../../navigations/PurchaseNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import Search from '../../components/Search'
import ButtonShop from '../../components/ButtonShop'
import ProductCard from '../../components/ProductCard'
import { ShopDataSource } from '../../datasource/ShopDataSource'
import { ProductApiEntity, ProductEntity } from '../../entities/ProductEntity'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProductDataSource } from '../../datasource/ProductDataSource'
import CustomHeader from '../../components/CustomHeader'
import MiniCart from '../../components/MiniCart'
import { CartDataSource } from '../../datasource/CartDataSource'
import Heading3 from '../../components/Font/Heading3'
import { UserDataContext } from '../../provider/UserDataProvider'
import { ResponseEntity } from '../../entities/ResponseEntity'
import FertProductCard from '../../components/FertProductCard'

type ProductListScreenRouteProp = StackScreenProps<PurchaseStackParamList, 'ProductList'>

const ProductListScreen: React.FC<ProductListScreenRouteProp> = ({ navigation, route }) => {
  const [productList, setProductList] = useState<ProductEntity[]>()
  const [totalItem, setTotalItem] = useState(0)
  const profile = useContext(UserDataContext)
  const { config, brand, shopNo, userData } = profile

  useEffect(() => {
    getProductList()
    initialQuantity()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initialQuantity()
    })
    return unsubscribe
  }, [navigation])

  const initialQuantity = async () => {
    try {
      const res = await CartDataSource.getCartByShop(shopNo, brand)
      setTotalItem(res.responseData.total_item)
    } catch (error) {
      console.log(error)
    }
  }

  const getProductList = async () => {
    if (route.params.productBrand) {
      await ShopDataSource.getProductWithBrand(
        route.params.shop.id,
        route.params.company,
        route.params.productBrand,
      ).then((res: ResponseEntity<ProductApiEntity>) => {
        if (config.productPage.showProductPrice) {
          setProductList(res.responseData.items)
        } else {
          let products = res.responseData.items.map((item) => {
            item.is_have_promotion = false
            item.promotions = []
            return item
          })
          setProductList(products)
        }
      })
    } else {
      await ShopDataSource.getProduct(route.params.shop.id, route.params.company).then((res) => {
        if (config.productPage.showProductPrice) {
          setProductList(res)
        } else {
          let products = res.map((item) => {
            item.is_have_promotion = false
            return item
          })
          setProductList(products)
        }
      })
    }
  }

  const searchProduct = (keywords: string) => {
    ProductDataSource.getProductList(
      route.params.shop.id,
      route.params.company,
      route.params.productBrand,
      keywords,
    ).then((res) => {
      setProductList(res)
    })
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
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <CustomHeader
        title={'สั่งสินค้า'}
        showBackBtn
        onPressBack={() => navigation.popToTop()}
        headerRight={renderMiniCart}
      />
      <View style={styles.wrapSearch}>
        <Search
          placeholder="ค้นหาสินค้า"
          onChange={(value) => {
            searchProduct(value)
          }}
        />
      </View>
      <View style={styles.warpShopHeader}>
        <Image style={styles.bgImage} source={require('../../../assets/bgShop.png')} />
        <View style={styles.shopInfo}>
          <Heading3 style={{ color: '#FFFFFF' }}>{route.params.shop.name}</Heading3>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 60,
              backgroundColor: 'white',
              padding: 5,
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
              }}
              source={require('../../../assets/shop-empty.png')}
            />
          </View>
        </View>
      </View>
      <View style={styles.warpChangeShop}>
        <ButtonShop onPress={() => navigation.navigate('ShopList')} />
      </View>
      <View style={styles.wrapProduct}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={productList}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  product: item,
                  shop: route.params.shop,
                  productBrand: route.params.productBrand,
                  company: route.params.company,
                })
              }
            >
              {userData.company === 'icpl' ? (
                <ProductCard
                  thName={item.title}
                  enName={item.common_title}
                  productInfo={item.packing_size}
                  price={item.price_per_volume}
                  imagePath={item.image}
                  havePromo={item.is_have_promotion}
                  unit={item.sale_unit}
                  saleUnitPrice={item.price_per_sale_unit}
                />
              ) : (
                <FertProductCard
                  image={item.imgae}
                  title={item.title}
                  packing_size={item.packing_size}
                  price={item.price_per_volume}
                  havePromo={item.is_have_promotion}
                  unit={item.sale_unit}
                  saleUnitPrice={item.price_per_sale_unit}
                />
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapSearch: {
    marginTop: 4,
    height: 70,
  },
  warpShopHeader: {
    height: 150,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  shopInfo: {
    flexDirection: 'row',
    paddingTop: 40,
    padding: 60,
    paddingLeft: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapProduct: {
    flex: 1,
    marginHorizontal: '6%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  warpChangeShop: {
    padding: 25,
    height: 50,
    top: -50,
  },
  bgImage: {
    width: '100%',
    height: 150,
    position: 'absolute',
  },
  shopPoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skyRocket: {
    width: 130,
    height: 50,
    resizeMode: 'contain',
    marginTop: 15,
  },
  coin: {
    width: 30,
    height: 30,
  },
  textPoint: {
    color: '#FFFFFF',
    fontSize: 24,
    marginLeft: 10,
  },
})

export default ProductListScreen
