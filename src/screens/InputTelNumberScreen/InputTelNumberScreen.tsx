import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native'
import { InputPhone } from '../../components/InputPhone'
import { VerifiesDataSource } from '../../datasource/VerifiesDataSource'
import { StackScreenProps } from '@react-navigation/stack'
import { AppAuthParamList } from '../../navigations/AppAuthNavigator'
import { bypassTelephone } from '../../definitions/BypassDataTest'
import Heading2 from '../../components/Font/Heading2'
import Paragraph1 from '../../components/Font/Paragraph1'
import Subheading2 from '../../components/Font/Subheading2'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ResponseEntity } from '../../entities/ResponseEntity'
import { OtpRequestEntity } from '../../entities/OtpRequestEntity'
type InputOtpScreenNavigationProp = StackScreenProps<AppAuthParamList, 'InputTelNumber'>

const InputTelNumberScreen: React.FC<InputOtpScreenNavigationProp> = ({ navigation }) => {
  const [value, setValue] = React.useState<string>('')
  const [isError, setIsError] = React.useState(false)

  const [message, setMessage] = React.useState<string>('')

  const fillZero = (tel: string) => {
    if (tel.length < 10) {
      return `0${tel}`
    } else {
      return tel
    }
  }

  const verifyPhoneNo = (tel: string) => {
    if (tel === '') {
      alert('กรุณาใส่หมายเลขโทรศัพท์')
    } else {
      const telephoneNo = fillZero(tel)
      VerifiesDataSource.verifyPhoneNo(telephoneNo).then((res: ResponseEntity<OtpRequestEntity>) => {
        if (res.success) {
          setIsError(false)
          if (bypassTelephone.includes(tel)) {
            navigation.navigate('LoginSuccess', { userProfile: res })
          } else {
            navigation.navigate('InputOtp', { data: res.responseData })
          }
        } else {
          setIsError(true)
          setMessage(res.userMessage)
        }
      })
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image style={styles.backgroundImage} source={require('../../../assets/bgOtp.png')} />
          <View style={styles.wrapText}>
            <Heading2 style={styles.title}>เข้าสู่ระบบพนักงานขาย</Heading2>
            <Paragraph1 style={styles.text}>ใส่หมายเลขโทรศัพท์ของคุณเพื่อรับ รหัส OTP ยืนยันการลงทะเบียน</Paragraph1>
            <InputPhone
              value={value}
              onChangeText={(e: string) => setValue(e)}
              maxLength={10}
              autoFocus={true}
              onError={isError}
              errorMessage={message}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Keyboard.dismiss()
                verifyPhoneNo(value)
              }}
            >
              <Subheading2 style={styles.textButton}>ขอรหัสOTP</Subheading2>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#FBFBFB',
  },
  backgroundImage: {
    top: -10,
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  wrapText: { flex: 1, padding: 20, top: -50 },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    color: '#000000',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  text: {
    color: '#828282',
    textAlign: 'left',
  },
  textButton: {
    color: '#FFFFFF',
  },
  button: {
    width: '100%',
    color: '#FFFFFF',
    backgroundColor: '#4C95FF',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    height: 50,
  },
})

export default InputTelNumberScreen
