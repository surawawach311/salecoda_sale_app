import React from "react";
import { Image, StyleSheet } from "react-native";
import HistoryScreen from "../screens/HistoryScreen/HistoryScreen";
import HomeScreen from "../screens/HomeScreen/HomeSrceen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import OrderScreen from "../screens/OrderScreen/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const HomeNavigator: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require("../../assets/navigator-icon/home-active.png")
                  : require("../../assets/navigator-icon/home-inactive.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require("../../assets/navigator-icon/history-active.png")
                  : require("../../assets/navigator-icon/history-inactive.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require("../../assets/navigator-icon/order-active.png")
                  : require("../../assets/navigator-icon/order-inactive.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require("../../assets/navigator-icon/noti-active.png")
                  : require("../../assets/navigator-icon/noti-inactive.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require("../../assets/navigator-icon/profile-active.png")
                  : require("../../assets/navigator-icon/profile-inactive.png")
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default HomeNavigator