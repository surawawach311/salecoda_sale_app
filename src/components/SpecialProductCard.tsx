import React, { useState } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { ItemSpecialRequest } from '../models/SpecialRequestModel'
import { currencyFormat } from '../utilities/CurrencyFormat'
import Heading3 from './Font/Heading3'
import Subheading2 from './Font/Subheading2'
import Subheading3 from './Font/Subheading3'
import Text1 from './Font/Text1'
import Text2 from './Font/Text2'

export interface SpecialRequestProductCardProps {
  id?: string
  title: string
  total_price: number
  image: string
  quantity: number
  sale_unit: string
  promotion_discount?: number
  callback: (data: ItemSpecialRequest) => void
  discountRequest?: number
  onDelete: (id: string | undefined) => void
}

const SpecialRequestProductCard: React.FC<SpecialRequestProductCardProps> = ({
  id,
  title,
  total_price,
  image,
  quantity,
  sale_unit,
  promotion_discount,
  callback,
  discountRequest,
  onDelete,
}) => {
  const [amount, setAmount] = useState<number | undefined>(discountRequest)
  const [editable, setEditable] = useState<boolean>()

  return (
    <View style={{ padding: 20, marginBottom: 10, backgroundColor: '#FFFFFF' }}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: 75,
              height: 75,
              backgroundColor: '#FAFAFA',
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {image != '' ? (
              <Image style={{ width: 65, height: 65, resizeMode: 'contain' }} source={{ uri: image }} />
            ) : (
              <Image
                style={{ width: 65, height: 65, resizeMode: 'contain' }}
                source={require('../../assets/empty-product.png')}
              />
            )}
          </View>
          <View style={{ justifyContent: 'space-evenly' }}>
            <Heading3 style={{ width: 200 }}>{title}</Heading3>
            <Text1 style={{ color: '#616A7B' }}>{currencyFormat(total_price)}</Text1>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 14 }}>{`${quantity} x (${sale_unit})`}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '189,189,189,0.25',
          marginVertical: 10,
          opacity: 0.5,
        }}
      />
      {promotion_discount ? (
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Subheading3 style={{ color: '#616A7B' }}>ส่วนลดจากรายการโปรโมชั่น</Subheading3>
            <Subheading2 style={{ color: '#616A7B' }}>
              {` ${currencyFormat(promotion_discount)}/${sale_unit}`}
            </Subheading2>
          </View>
        </View>
      ) : null}
      <View
        style={{
          marginTop: 10,
          borderRadius: 8,
          borderColor: '#EBEFF2',
          borderWidth: 1,
          padding: 16,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ width: 25, height: 25 }} source={require('../../assets/discount.png')} />
            <Subheading3 style={{ color: '#6B7995', fontSize: 16, marginLeft: 10 }}>ส่วนลดพิเศษ</Subheading3>
          </View>

          {editable || !amount ? (
            editable ? (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  setEditable(false)
                  amount != discountRequest && amount != undefined ? setAmount(discountRequest) : undefined
                }}
              >
                <Text2 style={{ color: '#4C95FF' }}>ยกเลิก</Text2>
              </TouchableOpacity>
            ) : null
          ) : (
            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  setEditable(true)
                }}
              >
                <Text2 style={{ color: '#4C95FF' }}>แก้ไข</Text2>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAmount(undefined)
                  setEditable(false)
                  onDelete(id)
                }}
              >
                <Image style={styled.imgDelete} source={require('../../assets/delete.png')} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {!editable ? (
          amount ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: '#E1E7F6',
                opacity: 0.5,
                borderRadius: 6,
                borderWidth: 1,
                padding: 10,
                backgroundColor: '#F5F8FF',
                marginTop: 16,
              }}
            >
              <Text1>{amount ? currencyFormat(Math.abs(amount)) : ''}</Text1>
              <Text1>{`/${sale_unit}`}</Text1>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setEditable(true)}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                paddingHorizontal: 3,
                backgroundColor: '#F0F8FF',
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4C95FF' }}>กดเพื่อระบุส่วนลด</Text>
            </TouchableOpacity>
          )
        ) : (
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: '#E1E7F6',
                opacity: 0.5,
                borderRadius: 6,
                borderWidth: 1,
                padding: 10,
                width: '80%',
              }}
            >
              <TextInput
                style={{ flex: 1, fontFamily: 'NotoSansThaiMedium', fontSize: 16 }}
                keyboardType="numeric"
                maxLength={6}
                placeholder={'ระบุส่วนลดพิเศษ'}
                onChangeText={(e) => {
                  setAmount(e)
                }}
                defaultValue={amount ? Math.abs(amount).toString() : ''}
              />
              <Text1>{`฿/${sale_unit}`}</Text1>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (amount == undefined || amount == 0) {
                  alert('กรุณาระบุส่วนลด')
                } else {
                  setEditable(false)
                  callback({ price_id: id, amount })
                }
              }}
              style={{
                backgroundColor: '#4C95FF',
                borderRadius: 6,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                width: '20%',
                marginLeft: 5,
              }}
            >
              <Heading3 style={{ color: '#FFFFFF' }}>ยืนยัน</Heading3>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}
export default SpecialRequestProductCard

const styled = StyleSheet.create({ imgDelete: { width: 25, height: 25 } })
