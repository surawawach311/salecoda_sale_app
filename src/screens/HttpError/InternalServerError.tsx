import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'

import Heading2 from '../../components/Font/Heading2'
import Paragraph1 from '../../components/Font/Paragraph1'
import { AppAuthParamList } from '../../navigations/AppAuthNavigator'

type InternalServerErrorRouteProp = RouteProp<AppAuthParamList, 'InternalServerError'>

type InternalServerErrorNavigationProp = StackNavigationProp<AppAuthParamList, 'InternalServerError'>
type Props = {
  route: InternalServerErrorRouteProp
  navigation: InternalServerErrorNavigationProp
}
const InternalServerError: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true)

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{ width: 120, height: 120, resizeMode: 'contain', marginBottom: 20 }}
              source={require('../../../assets/500.png')}
            />
            <Heading2>ขณะนี้ระบบขัดข้อง </Heading2>
            <Paragraph1 style={{ color: '#6B7995', textAlign: 'center', marginBottom: 20 }}>
              ขณะนี้ระบบขัดข้องกรุณา “ลองใหม่อีกครั้ง” {'\n'} หรือ “ ติดต่อเจ้าหน้าที่ ”
            </Paragraph1>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ borderColor: '#E1E7F7', borderWidth: 1, flex: 1, flexDirection: 'row' }} />
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)
                navigation.pop()
              }}
            >
              <Heading2 style={{ color: '#4C95FF', bottom: -20 }}>ยืนยัน</Heading2>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default InternalServerError
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    textAlign: 'center',
  },
})
