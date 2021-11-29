import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Animated, Image } from 'react-native'
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view'
import Paragraph2 from '../../components/Font/Paragraph2'
import Subheading3 from '../../components/Font/Subheading3'
import Text1 from '../../components/Font/Text1'
import OrderList from '../../components/OrderList'
import { OrderDataSource } from '../../datasource/OrderDataSource'
import { ResponseEntity } from '../../entities/ResponseEntity'
import ShopOrderList from './ShopOrderList'
import { useNavigation } from '@react-navigation/native'

type TabBarProp = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string
    title: string
  }>
}

type TabBarIndicatorProp = TabBarProp & {
  getTabWidth: (i: number) => number
}

type SceneProp = SceneRendererProps & {
  route: { key: string; title: string }
}

export interface ShopSceneProps {
  date: { startDate: string; endDate: string }
}

const ShopScene: React.FC<ShopSceneProps> = ({ date }) => {
  const [index, setIndex] = useState(0)
  const [routes, setRoutes] = useState<
    {
      key: string
      title: string
    }[]
  >([])
  const [shopName, setShopName] = useState<string | undefined>(undefined)
  const navigation = useNavigation()

  useEffect(() => {
    OrderDataSource.getOrderStatus().then((response: ResponseEntity<{ key: string; title: string }[]>) => {
      setRoutes(response.responseData)
    })
  }, [])

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
  const handleShopItemClick = (shopName: string) => {
    setShopName(shopName)
  }

  const handleOrderItemClick = (orderId: string) => {
    // @ts-ignore
    navigation.navigate('Purchase', {
      screen: 'SuccessDetail',
      params: { orderId: orderId },
    })
  }
  const renderEmptyList = () => {
    return (
      <>
        <Image style={styled.emptyImage} source={require('../../../assets/empty-state/order.png')} />
        <Text1 style={styled.emptyText}>ยังไม่มีประวัติการสั่งซื้อ</Text1>
      </>
    )
  }
  const renderSceneShop = ({ route }: SceneProp) => {
    return (
      <ShopOrderList
        statusFilter={route.key}
        date={date}
        onItemClick={handleShopItemClick}
        renderEmpty={renderEmptyList}
      />
    )
  }
  const renderSceneOrder = ({ route }: SceneProp) => {
    return (
      <OrderList
        statusFilter={route.key}
        date={date}
        onItemClick={handleOrderItemClick}
        renderEmpty={renderEmptyList}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          backgroundColor: '#FBFBFB',
          borderColor: '#EEEEEE',
          borderBottomWidth: 1,
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
      {routes.length > 0 ? (
        <View style={{ flex: 1 }}>
          <TabView
            lazy
            style={{ flex: 1 }}
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={shopName === undefined ? renderSceneShop : renderSceneOrder}
            onIndexChange={setIndex}
          />
        </View>
      ) : (
        renderEmptyList()
      )}
    </View>
  )
}

const styled = StyleSheet.create({
  activeTabLabel: { color: '#4C95FF', fontWeight: 'bold' },
  inactiveTabLabel: { color: '#616A7B', fontWeight: 'bold' },
  emptyImage: {
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emptyText: {
    top: -160,
    alignSelf: 'center',
    color: '#C2C6CE',
  },
})

export default ShopScene
