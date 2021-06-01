import { View, Text, Image, StatusBar, StyleSheet, SafeAreaView, Animated } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { HomeStackParamList } from '../../navigations/HomeNavigator'
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view'
import OrderList, { StatusFilter } from '../../components/OrderList'
import { OrderEntity } from '../../entities/OrderEntity'
type NotificationScreenRouteProp = StackScreenProps<HomeStackParamList, 'History'>

type TabBarProp = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
};

enum Menu {
  Confirmed = 'confirmed',
  Delivered = 'delivered',
  Canceled = 'canceled',
}

type SceneProp = SceneRendererProps & {
  route: { key: string; title: string };
};

type TabBarIndicatorProp = TabBarProp & {
  getTabWidth: (i: number) => number;
};

const HistoryScreen: React.FC<NotificationScreenRouteProp> = ({ navigation }) => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: Menu.Confirmed, title: 'ยืนยันแล้ว' },
    { key: Menu.Delivered, title: 'จัดส่งสำเร็จ' },
    { key: Menu.Canceled, title: 'ยกเลิก' },
  ])

  const renderTabBar = (props: TabBarProp) => {
    return (
      <TabBar
        scrollEnabled
        {...props}
        renderLabel={({ focused, route }) => (
          <Text style={[focused ? styled.activeTabLabel : styled.inactiveTabLabel]}>
            {route.title}
          </Text>
        )}
        renderIndicator={renderIndicator}
        pressColor="transparent"
        tabStyle={{ width: "auto", padding: 16 }}
        contentContainerStyle={{ marginHorizontal: 16 }}
        indicatorContainerStyle={{ marginHorizontal: 16 }}
        style={{
          backgroundColor: "#FFF",
          borderBottomWidth: 4,
          borderColor: "#FFF",
        }}
      />
    );
  };

  const renderIndicator = (props: TabBarIndicatorProp) => {
    const { position, navigationState, getTabWidth } = props;
    const inputRange = routes.map((_, i) => i);
    const translateX = position.interpolate({
      inputRange: inputRange,
      outputRange: routes.reduce<number[]>((acc, _, i) => {
        if (i === 0) return [0];
        return [...acc, acc[i - 1] + getTabWidth(i - 1)];
      }, []),
    });

    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "#E3F0FF",
          borderRadius: 20,
          marginVertical: 8,
          width: getTabWidth(navigationState.index),
          transform: [{ translateX }],
        }}
      />
    );
  };

  const handleItemClick = (order: OrderEntity) => {
    // @ts-ignore
    navigation.navigate("Purchase", {
      screen: "SuccessDetail",
      params: { data: order },
    });
  };

  const renderEmptyList = () => {
    return (
      <>
        <Image style={styled.emptyImage} source={require("../../../assets/empty-state/order.png")} />
        <Text style={styled.emptyText}>ยังไม่มีประวัติการสั่งซื้อ</Text>
      </>
    );
  };

  const renderScene = ({ route }: SceneProp) => {
    switch (route.key) {
      case Menu.Confirmed:
        return (
          <OrderList
            statusFilter={StatusFilter.Confirmed}
            onItemClick={handleItemClick}
            renderEmpty={renderEmptyList}
          />
        );
      case Menu.Delivered:
        return (
          <OrderList
            statusFilter={StatusFilter.Delivered}
            onItemClick={handleItemClick}
            renderEmpty={renderEmptyList}
          />
        );
      case Menu.Canceled:
        return (
          <OrderList
            statusFilter={StatusFilter.Canceled}
            onItemClick={handleItemClick}
            renderEmpty={renderEmptyList}
          />
        );
    }
  };
  return (
    <View style={styled.container}>
      <SafeAreaView style={styled.headerSafeArea}>
        <View style={styled.headerWraper}>
          <Text style={styled.headerText}>ประวัติการสั่งซื้อ</Text>
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

export default HistoryScreen

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF" },
  headerSafeArea: {
    backgroundColor: "#FFF",
    paddingTop: StatusBar.currentHeight,
  },
  headerWraper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  activeTabLabel: { color: "#4C95FF", fontWeight: "bold" },
  inactiveTabLabel: { color: "#616A7B", fontWeight: "bold" },
  emptyImage: {
    width: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  emptyText: {
    top: -160,
    alignSelf: "center",
    color: "#C2C6CE",
  },
});
