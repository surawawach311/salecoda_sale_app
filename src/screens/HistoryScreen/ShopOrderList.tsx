import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'

import { OrderDataSource } from '../../datasource/OrderDataSource'
import { accountStore } from '../../stores/AccountStore'
import { useIsFocused } from '@react-navigation/native'
import { UserDataContext } from '../../provider/UserDataProvider'
import { ResponseEntity } from '../../entities/ResponseEntity'
import { ShopGroupOrderEntity } from '../../entities/ShopGroupOrderEntity'
import Subheading4 from '../../components/Font/Subheading4'
import Subheading2 from '../../components/Font/Subheading2'
import Paragraph2 from '../../components/Font/Paragraph2'

type OrderListProp = {
  statusFilter: string
  onItemClick?: (shopName: string) => void
  renderEmpty?: () => JSX.Element
}

type Pagination = {
  total: number
  limit: number
  offset: number
}

const defaultPagination: Pagination = {
  total: 0,
  limit: 10,
  offset: 0,
}

const OrderList: React.FC<OrderListProp> = ({ statusFilter, onItemClick, renderEmpty }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [order, setOrder] = useState<ShopGroupOrderEntity[]>([])
  const [pager, setPager] = useState<Pagination>(defaultPagination)
  const isFocused = useIsFocused()
  const userDataStore = useContext(UserDataContext)
  const { userData } = userDataStore

  useEffect(() => {
    setIsLoading(true)
    setOrder([])
    loadData(defaultPagination.limit, defaultPagination.offset).then(
      (response: ResponseEntity<ShopGroupOrderEntity[]>) => {
        setOrder(response.responseData)
        setPager({
          total: response.responseData.length,
          limit: defaultPagination.limit,
          offset: defaultPagination.offset,
        })
        setIsLoading(false)
      },
    )
    // .catch((err) => alert(err))
  }, [isFocused])

  const dataLoader = (status: string, limit: number, offset: number, territory?: string) => {
    return OrderDataSource.GroupShopOrderList(status, limit, offset, territory)
  }

  const loadData = (limit: number, offset: number) => {
    return dataLoader(statusFilter, limit, offset, userData.territory)
  }

  const handlePullToRefresh = () => {
    setIsRefreshing(true)
    setOrder([])
    loadData(defaultPagination.limit, defaultPagination.offset).then(
      (response: ResponseEntity<ShopGroupOrderEntity[]>) => {
        setOrder(response.responseData)
        setPager({
          total: response.responseData.length,
          limit: defaultPagination.limit,
          offset: defaultPagination.offset,
        })
        setIsRefreshing(false)
      },
    )
    // .catch((err) => alert(err))
  }

  const handleLoadMore = () => {
    if (isLoading || order.length >= pager.total) return
    setIsLoading(true)
    loadData(pager.limit, pager.offset + pager.limit).then((response: ResponseEntity<ShopGroupOrderEntity[]>) => {
      setOrder((prev) => prev.concat(response.responseData))
      setPager({ total: response.responseData.length, limit: pager.limit, offset: pager.offset + pager.limit })
      setIsLoading(false)
    })
    // .catch((err) => alert(err))
  }

  const renderListIndicator = () => {
    if (isLoading) {
      return (
        <View style={{ ...styled.emptySpace, paddingTop: 16 }}>
          <ActivityIndicator size="large" color="#4C95FF" />
        </View>
      )
    }
    if (isRefreshing) {
      return <View style={styled.emptySpace} />
    }
    if (order.length === 0) {
      return <View>{renderEmpty?.()}</View>
    }
    return <View style={styled.emptySpace} />
  }

  return (
    <View>
      <FlatList
        style={{ paddingTop: 20 }}
        data={order}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onItemClick?.(item.shop_name)
            }}
          >
            <View key={item.shop_id} style={styled.shopCard}>
              <View>
                <Image style={styled.imageNotFound} source={require('../../../assets/empty-product.png')} />
              </View>
              <View style={{ marginLeft: 10, width: '90%' }}>
                <Subheading2>{item.shop_name}</Subheading2>
                <Text style={{ color: '#6B7995' }}>
                  <Paragraph2>{item.territory}</Paragraph2>
                  <Paragraph2>| {item.province}</Paragraph2>
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
                    {`${item.total_order} คำสั่งซื้อ`}
                  </Subheading4>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.shop_id}
        ListFooterComponent={renderListIndicator}
        onRefresh={handlePullToRefresh}
        refreshing={isRefreshing}
        onEndReached={handleLoadMore}
      />
    </View>
  )
}

export default OrderList

const styled = StyleSheet.create({
  emptySpace: {
    height: 112,
  },
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
