import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, StyleSheet, Animated, Image } from 'react-native'
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view'
import Subheading3 from '../../components/Font/Subheading3'
import Text1 from '../../components/Font/Text1'
import OrderList from '../../components/OrderList'
import { OrderDataSource } from '../../datasource/OrderDataSource'
import { ResponseEntity } from '../../entities/ResponseEntity'

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

export interface TerritorySceneProps {
  date: { startDate: string; endDate: string }
}

const TerritoryScene: React.FC<TerritorySceneProps> = ({ date }) => {
  const [index, setIndex] = React.useState(0)
  const [routes, setRoutes] = React.useState<
    {
      key: string
      title: string
    }[]
  >([])
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
  const handleItemClick = (orderId: string) => {
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
  const renderScene = ({ route }: SceneProp) => {
    return (
      <OrderList statusFilter={route.key} date={date} onItemClick={handleItemClick} renderEmpty={renderEmptyList} />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {routes.length > 0 ? (
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
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

export default TerritoryScene
