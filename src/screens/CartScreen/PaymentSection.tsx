import React, { useEffect, useState } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Heading3 from '../../components/Font/Heading3'
import Text1 from '../../components/Font/Text1'
import { paymentCartEntity } from '../../entities/CartEntity'

interface PaymentSectionProps {
  onChange: (method: string) => void
  payments: paymentCartEntity[]
  selectPayment?: string
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ payments, onChange, selectPayment }) => {
  useEffect(() => {
    initailPayment()
  }, [])

  const initailPayment = () => {
    if (payments.length <= 1) {
      payments.map((item) => onChange(item.id))
    }
  }

  return (
    <View style={styled.paymentContainer}>
      <Heading3>วิธีชำระเงิน</Heading3>
      <View style={styled.paymentMethod}>
        {payments.map((method: paymentCartEntity) => {
          return method.name == 'เงินสด' ? (
            <TouchableOpacity
              key={method.name}
              style={styled.methodChoiceContainer}
              onPress={() => {
                onChange('cash')
              }}
            >
              <TouchableWithoutFeedback>
                {selectPayment == 'cash' ? <View style={styled.iconPin} /> : <View style={styled.iconUnPin} />}
              </TouchableWithoutFeedback>
              <Text1 style={{ color: '#616A7B' }}>
                {method.name}
                {method.discount_rate ? `(รับส่วนลดเพิ่ม ${method.discount_rate}%)` : null}
              </Text1>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                onChange('credit')
              }}
              key={method.name}
              style={styled.methodChoiceContainer}
            >
              {selectPayment == 'credit' ? <View style={styled.iconPin} /> : <View style={styled.iconUnPin} />}

              <Text1 style={{ color: '#616A7B' }}>
                {method.name}
                {/* (คงเหลือ{" "}
              {currencyFormat(method.remain_credit, 2)}) */}
              </Text1>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default PaymentSection

const styled = StyleSheet.create({
  paymentContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'white',
  },
  paymentMethod: {
    marginTop: 10,
    borderBottomColor: '#EBEFF2',
    borderBottomWidth: 2,
    borderTopColor: '#EBEFF2',
    borderTopWidth: 2,
    borderRadius: 3,
    padding: 20,
  },
  methodChoiceContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    padding: 5,
    // backgroundColor:"red"
  },
  iconPin: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#4C95FF',
    width: 20,
    height: 20,
    marginRight: 5,
  },
  iconUnPin: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    width: 20,
    height: 20,
    marginRight: 5,
  },
})
