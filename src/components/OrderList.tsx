import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { OrderDataSource } from '../datasource/OrderDataSource'
import { accountStore } from '../stores/AccountStore'
import { useIsFocused } from '@react-navigation/native'
import OrderHistoryCard from './OrderHistoryCard'
import { OrderEntity } from '../entities/OrderEntity'
import { UserDataContext } from '../provider/UserDataProvider'
import { ResponseEntity } from '../entities/ResponseEntity'
import Text1 from './Font/Text1'

export enum StatusFilter {
  WaitingConfirm = 'waiting_order_confirm',
  Confirmed = 'opened',
  Delivered = 'success',
  Canceled = 'canceled',
}

type OrderListProp = {
  statusFilter: string
  date?: { startDate: string; endDate: string }
  onItemClick?: (orderId: string) => void
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

const OrderList: React.FC<OrderListProp> = ({ statusFilter, date, onItemClick, renderEmpty }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [order, setOrder] = useState<OrderEntity[]>([])
  const [pager, setPager] = useState<Pagination>(defaultPagination)
  const isFocused = useIsFocused()
  const userDataStore = useContext(UserDataContext)
  const { userData } = userDataStore

  const dataLoader = (
    status: string,
    startDate: string | undefined,
    endDate: string | undefined,
    limit: number,
    offset: number,
    territory?: string,
  ) => {
    return OrderDataSource.listOrder(status, startDate, endDate, limit, offset, territory)
  }

  const loadData = (limit: number, offset: number) => {
    return dataLoader(statusFilter, date?.startDate, date?.endDate, limit, offset, userData.territory)
  }

  const handlePullToRefresh = () => {
    setIsRefreshing(true)
    setOrder([])
    loadData(defaultPagination.limit, defaultPagination.offset).then((response: ResponseEntity<OrderEntity[]>) => {
      setOrder(response.responseData)
      setPager({
        total: response.responseData.length,
        limit: defaultPagination.limit,
        offset: defaultPagination.offset,
      })
      setIsRefreshing(false)
    })
    // .catch((err) => alert(err))
  }

  const handleLoadMore = () => {
    if (isLoading || order.length >= pager.total) return
    setIsLoading(true)
    loadData(pager.limit, pager.offset + pager.limit).then((response: ResponseEntity<OrderEntity[]>) => {
      setOrder((prev) => prev.concat(response.responseData))
      setPager({ total: response.responseData.length, limit: pager.limit, offset: pager.offset + pager.limit })
      setIsLoading(false)
    })
    // .catch((err) => alert(err))
  }

  useEffect(() => {
    setIsLoading(true)
    setOrder([])
    loadData(defaultPagination.limit, defaultPagination.offset).then((response: ResponseEntity<OrderEntity[]>) => {
      setOrder(response.responseData)
      setPager({
        total: response.responseData.length,
        limit: defaultPagination.limit,
        offset: defaultPagination.offset,
      })
      setIsLoading(false)
    })
    // .catch((err) => alert(err))
  }, [isFocused])

  const isComplete = statusFilter !== StatusFilter.WaitingConfirm

  const renderListIndicator = () => {
    if (isLoading) {
      return (
        <View style={{ ...styles.emptySpace, paddingTop: 16 }}>
          <ActivityIndicator size="large" color="#4C95FF" />
        </View>
      )
    }
    if (isRefreshing) {
      return <View style={styles.emptySpace} />
    }
    if (order.length === 0) {
      return <View>{renderEmpty?.()}</View>
    }
    return <View style={styles.emptySpace} />
  }

  return (
    <View>
      <FlatList
        style={{ paddingTop: 20 }}
        data={order}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onItemClick?.(item.id)}>
            <OrderHistoryCard
              orderNumber={item.order_no}
              createDatetime={item.created}
              quantity={item.items.length}
              productIconList={item.items.map((i) => i.cover)}
              totalAmount={item.total_price}
              isComplete={isComplete}
              shopName={item.buyer.name}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderListIndicator}
        onRefresh={handlePullToRefresh}
        refreshing={isRefreshing}
        onEndReached={handleLoadMore}
        ListEmptyComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Image
              style={{ height: 100, resizeMode: 'contain' }}
              source={require('../../assets/empty-state/order.png')}
            />
            <Text1 style={{ color: '#C2C6CE' }}>ไม่มีประวัติการสั่งซื้อ</Text1>
          </View>
        )}
      />
    </View>
  )
}

export default OrderList

const styles = StyleSheet.create({
  emptySpace: {
    height: 112,
  },
})
