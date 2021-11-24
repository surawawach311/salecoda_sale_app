import { View, Text, StatusBar, StyleSheet, SafeAreaView, Animated, useWindowDimensions } from 'react-native'
import React, { useContext } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { HomeStackParamList } from '../../navigations/HomeNavigator'
import { NavigationState, SceneMap, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view'
import TerritoryScene from './TerritoryScene'
import ShopScene from './ShopScene'
import Subheading2 from '../../components/Font/Subheading2'
import { Entypo } from '@expo/vector-icons'
import Search from '../../components/Search'
import { UserDataContext } from '../../provider/UserDataProvider'
type NotificationScreenRouteProp = StackScreenProps<HomeStackParamList, 'History'>

type TabBarProp = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string
    title: string
  }>
}

type TabBarIndicatorProp = TabBarProp & {
  getTabWidth: (i: number) => number
}

const HistoryScreen: React.FC<NotificationScreenRouteProp> = ({ navigation }) => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState<
    {
      key: string
      title: string
    }[]
  >([
    { key: 'territory', title: 'รายเขต' },
    { key: 'shop', title: 'รายร้าน' },
  ])
  const userDataStore = useContext(UserDataContext)
  const { userData } = userDataStore

  const layout = useWindowDimensions()

  const renderTabBar = (props: TabBarProp) => {
    return (
      <TabBar
        scrollEnabled
        {...props}
        renderLabel={({ focused, route }) => (
          <Subheading2 style={[focused ? styled.activeTabLabel : styled.inactiveTabLabel]}>
            {route.key === 'territory' ? `${route.title} (${userData.territory})` : route.title}
          </Subheading2>
        )}
        renderIndicator={renderIndicator}
        renderIcon={({ route, focused, color }) => (
          <Entypo
            style={{ marginRight: 6 }}
            name={route.key === 'territory' ? 'location' : 'shop'}
            color={focused ? '#4C95FF' : '#616A7B'}
            size={24}
          />
        )}
        pressColor="transparent"
        tabStyle={{ width: 'auto', flexDirection: 'row' }}
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
          marginVertical: 8,
          width: getTabWidth(navigationState.index),
          transform: [{ translateX }],
        }}
      />
    )
  }

  const Territory = () => <TerritoryScene />
  const Shop = () => <ShopScene />

  const renderScene = SceneMap({
    territory: Territory,
    shop: Shop,
  })

  return (
    <View style={styled.container}>
      <SafeAreaView style={styled.headerSafeArea}>
        <View style={styled.headerWraper}>
          <Text style={styled.headerText}>ประวัติการสั่งซื้อ</Text>
        </View>
        <Search placeholder="ค้นหาเลขใบสั่งซื้อ, ร้านค้า..." />
      </SafeAreaView>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  )
}

export default HistoryScreen

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  activeTabLabel: { color: '#4C95FF', fontWeight: 'bold' },
  inactiveTabLabel: { color: '#616A7B', fontWeight: 'bold' },
})
