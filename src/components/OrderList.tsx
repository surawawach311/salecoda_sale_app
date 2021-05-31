import React, { useEffect, useState } from 'react'
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { OrderDataSource } from '../datasource/OrderDataSource'
import { accountStore } from '../stores/AccountStore'
import { useIsFocused } from '@react-navigation/native'
import OrderHistoryCard from './OrderHistoryCard'
import { OrderEntity } from '../entities/OrderEntity'

export enum StatusFilter {
  WaitingConfirm = 'waiting_order_confirm',
  Confirmed = 'opened',
  Delivered = 'delivering',
  Canceled = 'canceled',
}

type OrderListProp = {
  statusFilter: StatusFilter
  onItemClick?: (order: OrderEntity) => void
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
  const [data, setData] = useState<OrderEntity[]>([])
  const [pager, setPager] = useState<Pagination>(defaultPagination)
  const isFocused = useIsFocused()

  const dataLoader = (status: StatusFilter, company: string, limit: number, offset: number, territory?: string) => {
    return OrderDataSource.listOrder(status, company, limit, offset, territory)
  }

  const loadData = (limit: number, offset: number) => {
    const comp = accountStore.account?.company ? accountStore.account?.company : ''
    const territory = accountStore.account?.territory
    return dataLoader(statusFilter, comp, limit, offset, territory)
  }

  const handlePullToRefresh = () => {
    setIsRefreshing(true)
    setData([])
    loadData(defaultPagination.limit, defaultPagination.offset)
      .then((data) => {
        setData(data.orders)
        setPager({ total: data.total, limit: defaultPagination.limit, offset: defaultPagination.offset })
        setIsRefreshing(false)
      })
      .catch((err) => alert(err))
  }

  const handleLoadMore = () => {
    if (isLoading || data.length >= pager.total) return
    setIsLoading(true)
    loadData(pager.limit, pager.offset + pager.limit)
      .then((data) => {
        setData((prev) => prev.concat(data.orders))
        setPager({ total: data.total, limit: pager.limit, offset: pager.offset + pager.limit })
        setIsLoading(false)
      })
      .catch((err) => alert(err))
  }

  useEffect(() => {
    setIsLoading(true)
    setData([])
    loadData(defaultPagination.limit, defaultPagination.offset)
      .then((data) => {
        setData(data.orders)
        setPager({ total: data.total, limit: defaultPagination.limit, offset: defaultPagination.offset })
        setIsLoading(false)
      })
      .catch((err) => alert(err))
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
    if (data.length === 0) {
      return <View>{renderEmpty?.()}</View>
    }
    return <View style={styles.emptySpace} />
  }

  return (
    <View>
      <FlatList
        style={{ paddingTop: 20 }}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onItemClick?.(item)}>
            <OrderHistoryCard
              orderNumber={item.order_no}
              createDatetime={item.created}
              quantity={item.items.length}
              productIconList={item.items.map(i => i.cover)}
              totalAmount={item.total_price}
              isComplete={isComplete}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderListIndicator}
        onRefresh={handlePullToRefresh}
        refreshing={isRefreshing}
        onEndReached={handleLoadMore}
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
