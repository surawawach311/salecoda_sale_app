import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserLocalStorageService } from '../../services/UserLocalStorageService'
import { HomeStackParamList } from '../../navigations/HomeNavigator'
import { VerifiesDataSource } from '../../datasource/VerifiesDataSource'
import { UserEntity } from '../../entities/userEntity'
import AppLoading from 'expo-app-loading'
import NotificationFacade from '../../facade/NotificationFacade'
import { NotificationResponseEntity } from '../../entities/MessageResponseEntity'
import * as Notifications from 'expo-notifications'
import { OrderDataSource } from '../../datasource/OrderDataSource'
import { OrderEntity } from '../../entities/OrderEntity'
import Heading2 from '../../components/Font/Heading2'
import Text2 from '../../components/Font/Text2'
import Text1 from '../../components/Font/Text1'

type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'Home'>

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>
type Props = {
  route: HomeScreenRouteProp
  navigation: HomeScreenNavigationProp
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [profile, setProfile] = useState<UserEntity>()

  useEffect(() => {
    checkAuthToken()
    getProfile()
  }, [])

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  })

  NotificationFacade.setOnResponse((response: NotificationResponseEntity) => {
    OrderDataSource.getOrderDetail(response.company, response.buyer_id, response.order_no).then(
      (order: OrderEntity) => {
        navigation.navigate('Purchase', {
          screen: 'SuccessDetail',
          params: { data: order },
        })
      },
    )
  })

  const checkAuthToken = async () => {
    const auth = await UserLocalStorageService.haveAccessToken().then((res) => {
      return res
    })
    if (!auth) {
      // @ts-ignore
      navigation.navigate('Auth', {
        screen: 'InputTelNumber',
      })
    }
  }

  const getProfile = async () => {
    await VerifiesDataSource.getProfile().then((respone: UserEntity) => {
      setProfile(respone)
    })
  }

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <View style={styles.profileWarp}>
            <Image style={styles.bgImage} source={require('../../../assets/bgShop.png')} />
            <View style={styles.innerTextContainer}>
              <Heading2 style={styles.WelcomeHeader}>{`Hello, ${profile.name}`}</Heading2>
              <Text2 style={styles.positionText}>{profile.position}</Text2>
            </View>
            <View style={styles.innerImgContainer}>
              <Image style={styles.imageProfile} source={require('../../../assets/image-profile-default.png')} />
            </View>
          </View>
          <View style={styles.menuWarp}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Purchase', {
                  screen: 'ShopList',
                  params: {
                    territory: profile.territory,
                    company: profile.company,
                  },
                })
              }}
            >
              <Image style={styles.menuIcon} source={require('../../../assets/menu-icon/icon-shopping.png')} />
              <Text1 style={styles.textMenu}>สั่งสินค้า</Text1>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('History')
              }}
            >
              <Image style={styles.menuIcon} source={require('../../../assets/menu-icon/IconHistory.png')} />
              <Text1 style={styles.textMenu}>ประวัติ</Text1>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Order')
              }}
            >
              <Image style={styles.menuIcon} source={require('../../../assets/menu-icon/IconConfirmOrder.png')} />
              <Text1 style={styles.textMenu}>ยืนยันคำสั่งซื้อ</Text1>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <AppLoading />
      )}
    </View>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileWarp: {
    // flex: 0.4,
    height: '30%',
    backgroundColor: '#4C95FF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerImgContainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  innerTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },

  WelcomeHeader: {
    color: '#FFFFFF',
  },
  positionText: {
    color: '#FFFFFF',
  },
  imageProfile: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  menuWarp: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
    top: -20,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  menuIcon: {
    width: 64,
    height: 64,
    padding: 50,
    margin: 10,
  },
  textMenu: {
    color: '#616A7B',
    marginTop: -20,
    alignSelf: 'center',
  },
})
