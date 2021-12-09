import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native'
import React, { useContext, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { HomeStackParamList } from '../../navigations/HomeNavigator'
import { NavigationState, SceneMap, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view'
import TerritoryScene from './TerritoryScene'
import ShopScene from './ShopScene'
import Subheading2 from '../../components/Font/Subheading2'
import { Entypo } from '@expo/vector-icons'
import Search from '../../components/Search'
import { UserDataContext } from '../../provider/UserDataProvider'
import { EvilIcons } from '@expo/vector-icons'
import Text2 from '../../components/Font/Text2'
import CustomHeader from '../../components/CustomHeader'
import { AntDesign } from '@expo/vector-icons'
import CalendarPicker from 'react-native-calendar-picker'
import Heading3 from '../../components/Font/Heading3'
import Subheading3 from '../../components/Font/Subheading3'

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
  const userDataStore = useContext(UserDataContext)
  const { userData } = userDataStore
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState<{ key: string; title: string }[]>([
    { key: 'territory', title: 'รายเขต' },
    { key: 'shop', title: 'รายร้าน' },
  ])
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(undefined)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(undefined)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  const startDate = selectedStartDate
    ? new Date(selectedStartDate).toLocaleDateString('th-TH', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
    : ''

  const endDate = selectedEndDate
    ? new Date(selectedEndDate).toLocaleDateString('th-TH', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
    : ''

  const layout = useWindowDimensions()

  const renderTabBar = (props: TabBarProp) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFF',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: '#E5E5E5',
        }}
      >
        <TabBar
          scrollEnabled
          {...props}
          renderLabel={({ focused, route }) => (
            <Subheading3 style={[focused ? styled.activeTabLabel : styled.inactiveTabLabel]}>
              {route.key === 'territory' ? `${route.title} (${userData.territory})` : route.title}
            </Subheading3>
          )}
          renderIndicator={renderIndicator}
          renderIcon={({ route, focused, color }) =>
            route.key === 'territory' ? (
              focused ? (
                <Image
                  style={{ width: 24, height: 24, resizeMode: 'contain' }}
                  source={require('../../../assets/location2-active.png')}
                />
              ) : (
                <Image
                  style={{ width: 24, height: 24, resizeMode: 'contain' }}
                  source={require('../../../assets/location2-inactive.png')}
                />
              )
            ) : focused ? (
              <Image
                style={{ width: 24, height: 24, resizeMode: 'contain' }}
                source={require('../../../assets/shop2-active.png')}
              />
            ) : (
              <Image
                style={{ width: 24, height: 24, resizeMode: 'contain' }}
                source={require('../../../assets/shop2-inactive.png')}
              />
            )
          }
          pressColor="transparent"
          tabStyle={{ width: 'auto', flexDirection: 'row' }}
          style={{
            backgroundColor: '#FFF',
          }}
        />
        {startDate ? (
          <TouchableOpacity
            style={{
              height: 'auto',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: '#4C95FF',
              borderRadius: 32,
              paddingHorizontal: 9,
              paddingVertical: 6,
              marginRight: 2,
            }}
            onPress={() => setShowCalendar(true)}
          >
            <Text2 style={{ color: '#FFF' }}>{startDate}</Text2>

            <Text2 style={{ color: '#FFF' }}> {endDate ? `- ${endDate}` : null}</Text2>

            <EvilIcons name="calendar" size={24} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row', marginRight: 7, backgroundColor: '#FFF' }}
            onPress={() => setShowCalendar(true)}
          >
            <Text2 style={{ color: '#616A7B' }}>วันที่ทั้งหมด</Text2>
            <EvilIcons name="calendar" size={24} color="#616A7B" />
          </TouchableOpacity>
        )}
      </View>
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

  const Territory = () => <TerritoryScene date={{ startDate, endDate }} />
  const Shop = () => <ShopScene date={{ startDate, endDate }} />

  const renderScene = SceneMap({
    territory: Territory,
    shop: Shop,
  })

  const onDateChange = (date: any, type: string) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date)
    } else {
      setSelectedStartDate(date)
      setSelectedEndDate(undefined)
    }
  }

  const onClearDate = () => {
    setSelectedStartDate(undefined)
    setSelectedEndDate(undefined)
  }
  return (
    <View style={styled.container}>
      <SafeAreaView style={styled.headerSafeArea}>
        <CustomHeader title={'ประวัติการสั่งซื้อ'} />
        <Search placeholder="ค้นหาเลขใบสั่งซื้อ, ร้านค้า..." />
      </SafeAreaView>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={showCalendar}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styled.modalContainer}>
          <View style={styled.centerSubContainer}>
            <CustomHeader
              title={'เลือกวันที่ต้องการ'}
              headerRight={() => (
                <TouchableOpacity onPress={() => setShowCalendar(false)}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              )}
            />
            <View>
              <CalendarPicker
                allowRangeSelection={true}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    height: 50,
                    // backgroundColor: '#4C95FF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                  }}
                  onPress={onClearDate}
                >
                  <Heading3>ล้างข้อมูล</Heading3>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    height: 50,
                    alignItems: 'center',
                    backgroundColor: '#4C95FF',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}
                  onPress={() => setShowCalendar(false)}
                >
                  <Heading3 style={{ color: '#FFF' }}>ตกลง</Heading3>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centerSubContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})
