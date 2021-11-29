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

  const startDate = selectedStartDate ? selectedStartDate.toString() : ''
  const endDate = selectedEndDate ? selectedEndDate.toString() : ''

  // const startDate = selectedStartDate
  //   ? selectedStartDate.toLocaleDateString('th-TH', {
  //       year: '2-digit',
  //       month: '2-digit',
  //       day: '2-digit',
  //     })
  //   : ''
  // const endDate = selectedEndDate
  //   ? selectedEndDate.toLocaleDateString('th-TH', {
  //       year: '2-digit',
  //       month: '2-digit',
  //       day: '2-digit',
  //     })
  //   : ''

  const layout = useWindowDimensions()

  const renderTabBar = (props: TabBarProp) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#FFF' }}>
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
        {startDate && startDate ? (
          <TouchableOpacity
            style={{
              height: 'auto',
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: '#4C95FF',
              borderRadius: 32,
              padding: 4,
            }}
            onPress={() => setShowCalendar(true)}
          >
            <Text2 style={{ color: '#FFF' }}>{startDate + '-' + endDate}</Text2>
            <EvilIcons name="calendar" size={24} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row', marginRight: 7 }}
            onPress={() => setShowCalendar(true)}
          >
            <Text2 style={{ color: '#616A7B' }}>ค้นหาด้วยวันที่</Text2>
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

  const Territory = () => <TerritoryScene />
  const Shop = () => <ShopScene />

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
                startFromMonday={true}
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
                  // onPress={handleConfirm}
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
