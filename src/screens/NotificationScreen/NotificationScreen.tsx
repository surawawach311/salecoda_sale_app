import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native'
import { AppNotificationDataSource } from '../../datasource/AppNotificationDataSource'
import { OrderDataSource } from '../../datasource/OrderDataSource'
import { NotificationEntity, NotificationListEntity } from '../../entities/NotificationEntity'
import { OrderEntity } from '../../entities/OrderEntity'
import { HomeStackParamList } from '../../navigations/HomeNavigator'
import { UserDataContext } from '../../provider/UserDataProvider'
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view'
import NotificationFeedCard from '../../components/NotificationFeedCard'
import Subheading3 from '../../components/Font/Subheading3'
import Text1 from '../../components/Font/Text1'
import Heading3 from '../../components/Font/Heading3'

type NotificationScreenRouteProp = StackScreenProps<HomeStackParamList, 'Notification'>
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
const NotificationScreen: React.FC<NotificationScreenRouteProp> = ({ navigation, route }) => {
  const [index, setIndex] = React.useState(0)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pager, setPager] = useState<Pagination>(defaultPagination)
  const [feed, setFeed] = useState<NotificationEntity[]>()
  const userDataStore = useContext(UserDataContext)
  const { userData } = userDataStore
  const isFocused = useIsFocused()

  useEffect(() => {
    AppNotificationDataSource.feeds().then((feed: NotificationListEntity) => {
      setFeed(feed.data)
    })
  }, [isFocused])

  type SceneProp = SceneRendererProps & {
    route: { key: string; title: string }
  }

  type TabBarProp = SceneRendererProps & {
    navigationState: NavigationState<{
      key: string
      title: string
    }>
  }

  enum Menu {
    Orders = 'orders',
    Promotions = 'promotions',
  }

  const [routes] = React.useState([
    { key: Menu.Orders, title: 'คำสั่งซื้อ' },
    { key: Menu.Promotions, title: 'โปรโมชั่น' },
  ])

  type TabBarIndicatorProp = TabBarProp & {
    getTabWidth: (i: number) => number
  }

  const handlePullToRefresh = () => {
    setIsRefreshing(true)

    AppNotificationDataSource.feeds()
      .then((feed) => {
        setFeed(feed.data)
        setPager({ total: feed.count, limit: defaultPagination.limit, offset: defaultPagination.offset })
        setIsRefreshing(false)
      })
      .catch((err) => alert(err))
  }

  const handleClick = (notiId: string, orderNo: string, dealerId: string) => {
    OrderDataSource.getOrderDetail(userData.company, dealerId, orderNo).then((order: OrderEntity) => {
      AppNotificationDataSource.read(notiId).then(() => {
        // @ts-ignore
        navigation.navigate('Purchase', {
          screen: 'SuccessDetail',
          params: { data: order },
        })
      })
    })
  }

  const renderTabBar = (props: TabBarProp) => {
    return (
      <TabBar
        scrollEnabled
        {...props}
        renderLabel={({ focused, route }) => (
          <Subheading3 style={[focused ? styled.activeTabLabel : styled.inactiveTabLabel]}>{route.title}</Subheading3>
        )}
        renderIndicator={renderIndicator}
        pressColor="transparent"
        tabStyle={{ width: 'auto', padding: 16 }}
        contentContainerStyle={{ marginHorizontal: 16 }}
        indicatorContainerStyle={{ marginHorizontal: 16 }}
        style={{
          backgroundColor: '#FFF',
          borderBottomWidth: 4,
          borderColor: '#FFF',
        }}
      />
    )
  }
  const renderIndicator = (props: TabBarIndicatorProp) => {
    const { position, navigationState, getTabWidth } = props
    const inputRange = routes.map((_, i) => i)
    const translateX = position.interpolate({
      inputRange: inputRange,
      outputRange: routes.reduce<number[]>((acc, _, i) => {
        if (i === 0) return [0]
        return [...acc, acc[i - 1] + getTabWidth(i - 1)]
      }, []),
    })

    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: '#E3F0FF',
          borderRadius: 20,
          marginVertical: 8,
          width: getTabWidth(navigationState.index),
          transform: [{ translateX }],
        }}
      />
    )
  }

  const renderScene = ({ route }: SceneProp) => {
    switch (route.key) {
      case Menu.Orders:
        return (
          <View style={{ paddingHorizontal: 5 }}>
            <FlatList
              style={{ paddingTop: 20 }}
              data={feed}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    handleClick(item.id, item.order_no, item.buyer_id)
                  }}
                >
                  <NotificationFeedCard
                    title={item.title}
                    body={item.body}
                    description={item.body}
                    created={item.created}
                    items={item.order_item}
                    isRead={item.is_read}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              onRefresh={handlePullToRefresh}
              refreshing={isRefreshing}
            />
          </View>
        )
      case Menu.Promotions:
        return (
          <>
            <View style={{ justifyContent: 'center', backgroundColor: '#F8FAFF', alignItems: 'center', flex: 1 }}>
              <Image
                style={{ height: 100, resizeMode: 'contain' }}
                source={require('../../../assets/empty-state/notification.png')}
              />
              <Text1 style={{ color: '#C2C6CE' }}>ไม่มีรายการแจ้งเตือน</Text1>
            </View>
          </>
        )
    }
  }

  return (
    <View style={styled.container}>
      <SafeAreaView style={styled.headerSafeArea}>
        <View style={styled.headerWraper}>
          <Heading3>การแจ้งเตือน</Heading3>
        </View>
      </SafeAreaView>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  )
}

export default NotificationScreen

const styled = StyleSheet.create({
  container: { flex: 1, paddingTop: '10%', backgroundColor: '#FFFFFF' },
  tabSelected: {
    backgroundColor: '#E3F0FF',
    paddingHorizontal: 25,
    padding: 15,
    borderRadius: 25,
    marginLeft: 10,
  },
  tabSectionContainer: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
  },
  tabUnselected: {
    paddingHorizontal: 25,
    padding: 15,
    borderRadius: 25,
    marginLeft: 10,
  },
  headerSafeArea: {
    backgroundColor: '#FFF',
    paddingTop: StatusBar.currentHeight,
  },
  headerWraper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  activeTabLabel: { color: '#4C95FF', fontWeight: 'bold' },
  inactiveTabLabel: { color: '#616A7B', fontWeight: 'bold' },
})
