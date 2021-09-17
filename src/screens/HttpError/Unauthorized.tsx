import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'

import Heading2 from '../../components/Font/Heading2'
import Paragraph1 from '../../components/Font/Paragraph1'
import * as RootNavigation from '../../navigations/RootNavigation'
const Unauthorized = () => {
  const [modalVisible, setModalVisible] = useState(true)

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{ width: 120, height: 120, resizeMode: 'contain', marginBottom: 20 }}
              source={require('../../../assets/401.png')}
            />
            <Heading2>การเข้าใช้งานระบบหมดอายุ </Heading2>
            <Paragraph1 style={{ color: '#6B7995', textAlign: 'center', marginBottom: 20 }}>
              เวลาใช้งานของคุณหมดอายุกรุณาลงชื่อเข้าใช้อีกครั้งนึง{'\n'}หรือติดต่อเจ้าหน้าที่
            </Paragraph1>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ borderColor: '#E1E7F7', borderWidth: 1, flex: 1, flexDirection: 'row' }} />
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)
                RootNavigation.navigate('Auth', {
                    screen: 'InputTelNumber',
                  })
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
export default Unauthorized
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
