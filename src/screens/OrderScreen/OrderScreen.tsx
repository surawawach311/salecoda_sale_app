import { View, Text, StyleSheet, Image, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Search from '../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderCard from '../../components/OrderCard'
import { OrderDataSource } from '../../datasource/OrderDataSource'
import { OrderEntity } from '../../entities/OrderEntity'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { HomeStackParamList } from '../../navigations/HomeNavigator'
import { FilterOrder } from '../../definitions/FilterOrder'
import { OrderFacade } from '../../facade/OrderFacade'
import { ShopOrderCardModel } from '../../models/ShopOrderCard'
import { UserDataContext } from '../../provider/UserDataProvider'
import EmptyState from '../../components/EmptyState'
import Subheading2 from '../../components/Font/Subheading2'
import Paragraph2 from '../../components/Font/Paragraph2'
import Text1 from '../../components/Font/Text1'
import Subheading4 from '../../components/Font/Subheading4'

type OrderScreenRouteProp = StackScreenProps<HomeStackParamList, 'Order'>

const OrderScreen: React.FC<OrderScreenRouteProp> = ({ navigation }) => {
  const [orderList, setOrderList] = useState<OrderEntity[]>()
  const [shopOrderCard, setShopOrderCard] = useState<ShopOrderCardModel[]>()
  const [filter, setFilter] = useState<'waiting_order_confirm' | 'opened' | 'delivering' | 'canceled'>(
    'waiting_order_confirm',
  )
  const [navbutton, setNavbutton] = useState<FilterOrder>(FilterOrder.territory)
  const [showOrder, setShowOrder] = useState<boolean>(true)
  const [shopName, setShopName] = useState<string>()
  const [shopId, setShopId] = useState<string>('')
  const [refreshing, setRefreshing] = React.useState(false)

  const userDataStore = useContext(UserDataContext)
  const { userData } = userDataStore
  useEffect(() => {
    getOrder('waiting_order_confirm')
    getAllOrderGroupByShop(userData.territory, userData.company, 'waiting_order_confirm')
  }, [])

  const handleNavButton = () => {
    setShowOrder(false)
    setNavbutton(FilterOrder.shop)
    setShopName(undefined)
    getAllOrderGroupByShop(userData.territory, userData.company, filter)
  }

  const handleFilter = (status: 'waiting_order_confirm' | 'opened' | 'delivering' | 'canceled') => {
    setFilter(status)

    if (showOrder) {
      if (shopId != '') {
        OrderDataSource.getOrderListByShopId(shopId, userData.company, status).then((res) => {
          setShowOrder(true)
          setOrderList(res)
        })
      } else {
        OrderDataSource.getOrderWithStatus(userData.territory, userData.company, status).then((res) => {
          setOrderList(res)
        })
      }
    } else {
      OrderFacade.formatShopOrderCard(userData.territory, userData.company, status).then((res) => {
        setShopOrderCard(res)
      })
    }
  }

  const getOrder = (status: string) => {
    OrderDataSource.getOrderWithStatus(userData.territory, userData.company, status).then((res) => {
      setOrderList(res)
    })
  }

  const onRefresh = () => {
    setRefreshing(true)
    if (!shopId) {
      OrderDataSource.getOrderWithStatus(userData.territory, userData.company, filter).then((res) => {
        setOrderList(res)
        setRefreshing(false)
      })
    } else {
      OrderFacade.formatShopOrderCard(userData.territory, userData.company, filter).then((res) => {
        setShopOrderCard(res)
        setRefreshing(false)
      })
    }
  }

  const fetchOrderListByShop = (shopId: string, company: string) => {
    OrderDataSource.getOrderListByShopId(shopId, company, filter).then((res) => {
      setShowOrder(true)
      setOrderList(res)
    })
  }

  const getAllOrderGroupByShop = (territory: string, company: string, status: string) => {
    OrderFacade.formatShopOrderCard(territory, company, status).then((res) => {
      setShopOrderCard(res)
    })
  }

  const searchOrder = (keyword: string) => {
    if (navbutton == FilterOrder.territory) {
      OrderDataSource.getOrderWithStatus(userData.territory, userData.company, filter, keyword).then((res) => {
        setOrderList(res)
      })
    } else if (navbutton == FilterOrder.shop) {
      OrderDataSource.getOrderListByShopId(shopId, userData.company, filter, keyword).then((res) => {
        setOrderList(res)
      })
    }
  }
  return (
    <View style={styled.container}>
      <SafeAreaView>
        <Search
          placeholder="ค้นหาคำสั่งซื้อ"
          onChange={(event) => {
            searchOrder(event)
          }}
        />
        <View style={styled.filterWraper}>
          <TouchableWithoutFeedback
            onPress={() => {
              setNavbutton(FilterOrder.territory)
              setShowOrder(true)
              getOrder('waiting_order_confirm')
              setShopId('')
            }}
            style={styled.filterList}
          >
            {navbutton == FilterOrder.territory ? (
              <Image style={styled.icon} source={require('../../../assets/location2-active.png')} />
            ) : (
              <Image style={styled.icon} source={require('../../../assets/location2-inactive.png')} />
            )}
            <Subheading2 style={navbutton == FilterOrder.territory ? { color: '#4C95FF' } : { color: '#6B7995' }}>
              รายเขต ({userData.territory})
            </Subheading2>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              handleNavButton()
            }}
            style={styled.filterList}
          >
            {navbutton == FilterOrder.shop ? (
              <Image style={styled.icon} source={require('../../../assets/shop2-active.png')} />
            ) : (
              <Image style={styled.icon} source={require('../../../assets/shop2-inactive.png')} />
            )}

            <Subheading2 style={navbutton == FilterOrder.shop ? { color: '#4C95FF' } : { color: '#6B7995' }}>
              รายร้าน
            </Subheading2>
          </TouchableWithoutFeedback>
        </View>
        {navbutton == FilterOrder.shop ? (
          <View
            style={{
              padding: 10,
              backgroundColor: '#FBFBFB',
              borderColor: '#EEEEEE',
              borderTopWidth: 1,
            }}
          >
            <Paragraph2 style={{ color: '#6B799575' }}>คำสั่งซื้อของ</Paragraph2>
            {shopName == undefined ? (
              <Text1 style={{ color: '#6B7995' }}>ร้านทั้งหมด</Text1>
            ) : (
              <Text1 style={{ color: '#6B7995' }}>{shopName}</Text1>
            )}
          </View>
        ) : null}
        <View style={styled.breakLine} />
        <View style={styled.filterStatus}>
          <TouchableOpacity onPress={() => handleFilter('waiting_order_confirm')}>
            <View style={filter == 'waiting_order_confirm' ? styled.badgeStatus : null}>
              <Subheading4
                style={filter == 'waiting_order_confirm' ? styled.textStatusActive : styled.textStatusInActive}
              >
                รอยืนยันคำสั่งซื้อ
              </Subheading4>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('opened')}>
            <View style={filter == 'opened' ? styled.badgeStatus : null}>
              <Subheading4 style={filter == 'opened' ? styled.textStatusActive : styled.textStatusInActive}>
                เปิดออเดอร์แล้ว
              </Subheading4>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('delivering')}>
            <View style={filter == 'delivering' ? styled.badgeStatus : null}>
              <Subheading4 style={filter == 'delivering' ? styled.textStatusActive : styled.textStatusInActive}>
                กำลังจัดส่ง
              </Subheading4>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('canceled')}>
            <View style={filter == 'canceled' ? styled.badgeStatus : null}>
              <Subheading4 style={filter == 'canceled' ? styled.textStatusActive : styled.textStatusInActive}>
                ยกเลิกคำสั่ง
              </Subheading4>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styled.breakLine} />
        {showOrder ? (
          <ScrollView
            style={{ marginBottom: 120, marginTop: 10 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {orderList != undefined && orderList.length > 0 ? (
              orderList.map((order: OrderEntity) => {
                return (
                  <TouchableOpacity
                    key={order.order_no}
                    onPress={() => {
                      navigation.navigate('Purchase', {
                        screen: 'SuccessDetail',
                        params: { data: order },
                      })
                    }}
                  >
                    <OrderCard
                      key={order.order_no}
                      orderNumber={order.order_no}
                      createDatetime={order.created}
                      quantity={order.items.length}
                      address={order.buyer}
                      status={order.status}
                    />
                  </TouchableOpacity>
                )
              })
            ) : (
              <EmptyState />
            )}
          </ScrollView>
        ) : (
          <ScrollView
            style={{ height: '100%' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {shopOrderCard != undefined && shopOrderCard.length > 0 ? (
              shopOrderCard?.map((shop: ShopOrderCardModel) => {
                return (
                  <TouchableOpacity
                    key={shop.id}
                    onPress={() => {
                      fetchOrderListByShop(shop.id, userData.company)
                      setShopName(shop.name)
                      setShopId(shop.id)
                    }}
                  >
                    <View key={shop.name} style={styled.shopCard}>
                      <View>
                        <Image style={styled.imageNotFound} source={require('../../../assets/empty-product.png')} />
                      </View>
                      <View style={{ marginLeft: 10, width: '90%' }}>
                        <Subheading2>{shop.name}</Subheading2>
                        <Text style={{ color: '#6B7995' }}>
                          <Paragraph2>{shop.territory}</Paragraph2>
                          <Paragraph2>| {shop.province}</Paragraph2>
                        </Text>
                        <View
                          style={{
                            width: '30%',
                            padding: 7,
                            paddingHorizontal: 10,
                            backgroundColor: '#E3F0FF',
                            borderRadius: 4,
                            marginTop: 10,
                            flexDirection: 'row',
                          }}
                        >
                          <Image style={styled.iconInvoice} source={require('../../../assets/invoice.png')} />
                          <Subheading4
                            style={{
                              marginLeft: 4,
                              color: '#4C95FF',
                            }}
                          >
                            {`${shop.totalOrder} คำสั่งซื้อ`}
                          </Subheading4>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            ) : (
              <EmptyState />
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  )
}

export default OrderScreen

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  filterWraper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  badgeStatus: {
    backgroundColor: '#E3F0FF',
    padding: 7,
    borderRadius: 15,
  },
  textStatusActive: { color: '#4C95FF' },
  textStatusInActive: { color: '#6B7995' },
  filterList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  icon: { width: 20, height: 20, resizeMode: 'contain' },
  textFilterOrderActive: { fontSize: 16, fontWeight: 'bold', color: '#4C95FF' },
  textFilterOrderInActive: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 4,
    paddingVertical: 7,
  },
  breakLine: { borderWidth: 1, borderColor: '#EEEEEE', marginVertical: 0 },
  shopCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    paddingLeft: 10,
    padding: 20,
    alignItems: 'center',
  },
  imageNotFound: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  iconInvoice: { height: 20, width: 16, resizeMode: 'contain' },
})
