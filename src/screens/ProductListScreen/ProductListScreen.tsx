import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, FlatList, View, Dimensions, TouchableOpacity } from 'react-native'
import { PurchaseStackParamList } from '../../navigations/PurchaseNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import Search from '../../components/Search'
import ProductCard from '../../components/ProductCard'
import { ShopDataSource } from '../../datasource/ShopDataSource'
import { ProductApiEntity, ProductEntity } from '../../entities/ProductEntity'
import CustomHeader from '../../components/CustomHeader'
import MiniCart from '../../components/MiniCart'
import { CartDataSource } from '../../datasource/CartDataSource'
import Heading3 from '../../components/Font/Heading3'
import { UserDataContext } from '../../provider/UserDataProvider'
import { ResponseEntity } from '../../entities/ResponseEntity'
import FertProductCard from '../../components/FertProductCard'
import { ProductCategoryEntity } from '../../entities/ProductCategory'
import Text2 from '../../components/Font/Text2'
import TabSwitcher from '../../components/TabSwitcher'
import Text1 from '../../components/Font/Text1'

type ProductListScreenRouteProp = StackScreenProps<PurchaseStackParamList, 'ProductList'>

const SPACING = 8
const WIDTH = (Dimensions.get('window').width - 4 * SPACING - (SPACING / 2) * 4) / 2
const TABS = [
  { id: 'PRODUCTS', title: 'สินค้า' },
  { id: 'PROMOTIONS', title: 'โปรโมชั่น' },
]

const ProductListScreen: React.FC<ProductListScreenRouteProp> = ({ navigation, route }) => {
  const [productList, setProductList] = useState<ProductEntity[]>()
  const [totalItem, setTotalItem] = useState(0)
  const [activeTab, setActiveTab] = useState('PRODUCTS')

  const [category, setCategory] = useState<ProductCategoryEntity[] | undefined>([
    {
      company: 'All',
      code: 'All',
      name: 'กลุ่มทั้งหมด',
      logo: null,
      icon_regular: null,
      icon_hover: null,
      navision_updated: null,
      is_active: true,
      created_at: null,
      updated_at: null,
    },
  ])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const profile = useContext(UserDataContext)
  const { config, brand, shopNo, userData } = profile

  useEffect(() => {
    getProductCategory()
    getProductList()
    initialQuantity()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initialQuantity()
    })
    return unsubscribe
  }, [navigation])

  const handleTabChange = (id: string) => {
    setActiveTab(id)
  }

  const getProductCategory = async () => {
    const res = await ShopDataSource.getProductCategory(shopNo, brand).then((res) => res.responseData)
    if (category?.length === 1) {
      res.map((item: ProductCategoryEntity) => category?.push(item))
    }
  }

  const initialQuantity = async () => {
    try {
      const res = await CartDataSource.getCartByShop(shopNo, brand)
      setTotalItem(res.responseData.total_item)
    } catch (error) {
      console.log(error)
    }
  }

  const getProductList = async () => {
    ShopDataSource.getProduct(shopNo, brand).then((res: ResponseEntity<ProductApiEntity>) => {
      setProductList(res.responseData.items)
    })
  }

  const searchProduct = (keywords: string) => {
    ShopDataSource.getProduct(shopNo, brand, selectedCategory, keywords).then(
      (res: ResponseEntity<ProductApiEntity>) => {
        setProductList(res.responseData.items)
      },
    )
  }

  const renderMiniCart = () => {
    return (
      <MiniCart
        itemCount={totalItem}
        onPress={() =>
          navigation.navigate('Cart', {
            shop: route.params.shop
          })
        }
      />
    )
  }

  const renderPromotionList = () => {
    return (
      <FlatList
        style={{ backgroundColor: '#FFFFFF' }}
        numColumns={2}
        data={[]}
        columnWrapperStyle={{ paddingHorizontal: SPACING }}
        renderItem={() => null}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', margin: 16 }}>
            <Image
              style={{ width: 85, height: 70, resizeMode: 'contain' }}
              source={require('../../../assets/empty-product.png')}
            />
            <Text2 style={{ color: '#C2C6CE', marginTop: 5 }}>ไม่พบสินค้าที่คุณต้องการ</Text2>
          </View>
        )}
        ListFooterComponent={() => <View style={{ height: 50 }}></View>}
      />
    )
  }

  const renderProductList = () => {
    return (
      <FlatList
        style={{ backgroundColor: '#FFFFFF' }}
        numColumns={2}
        data={productList}
        columnWrapperStyle={{ paddingHorizontal: SPACING }}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) =>
          renderProductCard(
            item.id,
            item.title,
            item.common_title,
            item.packing_size,
            item.price_per_volume,
            item.image,
            item.sale_unit,
            item.is_have_promotion,
            item.price_per_sale_unit,
          )
        }
        ListFooterComponent={() => <View style={{ height: 50 }}></View>}
      />
    )
  }

  const renderProductCard = (
    id: string,
    title: string,
    common_title: string,
    packing_size: string,
    price_per_volume: number,
    image: string,
    sale_unit: string,
    is_have_promotion: boolean,
    price_per_sale_unit: number,
  ) => {
    return (
      <TouchableOpacity
        key={id.toString()}
        onPress={() =>
          navigation.navigate('ProductDetail', {
            productId: id,
            shop:route.params.shop
          })
        }
      >
        <View style={{ width: WIDTH, margin: SPACING }}>
          {userData.company === 'icpl' ? (
            <ProductCard
              thName={title}
              enName={common_title}
              productInfo={packing_size}
              price={price_per_volume}
              imagePath={image}
              havePromo={is_have_promotion}
              unit={sale_unit}
              saleUnitPrice={price_per_sale_unit}
            />
          ) : (
            <FertProductCard
              image={image}
              title={title}
              packing_size={packing_size}
              price={price_per_volume}
              havePromo={is_have_promotion}
              unit={sale_unit}
              saleUnitPrice={price_per_sale_unit}
            />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  const handleProductCategory = (category: string) => {
    setSelectedCategory(category)
    ShopDataSource.getProduct(shopNo, brand, category).then((res: ResponseEntity<ProductApiEntity>) => {
      setProductList(res.responseData.items)
    })
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
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF' }}>
          <TabSwitcher style={{ top: -29 }} data={TABS} active={activeTab} onPress={handleTabChange} />
          <View style={{ backgroundColor: '#FFF' }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ backgroundColor: '#FFFFFF' }}
              data={category}
              contentContainerStyle={{ flexDirection: 'row' }}
              keyExtractor={(i) => i.code.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.code}
                  style={[styles.btnCate, selectedCategory === item.code ? { borderColor: '#314364' } : undefined]}
                  onPress={() => handleProductCategory(item.code)}
                >
                  <Text2 style={{ color: '#314364' }}>{item.name}</Text2>
                </TouchableOpacity>
              )}
              ListFooterComponent={() => <View style={{ height: 50 }}></View>}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 13, paddingVertical: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text1 style={{ fontSize: 20, fontWeight: 'bold' }}>
              {activeTab === 'PRODUCTS' ? 'สินค้าทั้งหมด' : activeTab === 'PROMOTIONS' ? 'สินค้าโปรโมชั่น' : null}
            </Text1>
          </View>
        </View>
        {activeTab === 'PRODUCTS' ? renderProductList() : activeTab === 'PROMOTIONS' ? renderPromotionList() : null}
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
  btnCate: {
    borderColor: '#E1E7F6',
    borderWidth: 1,
    borderRadius: 6,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 2,
    width: 106,
    height: 40,
  },
})

export default ProductListScreen
