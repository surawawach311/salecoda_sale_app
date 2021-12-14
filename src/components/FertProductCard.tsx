import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import PromoTag from '../../assets/svg/promotion-tag.svg'
import { currencyFormat } from '../utilities/CurrencyFormat'
import Heading3 from './Font/Heading3'
import Text2 from './Font/Text2'

interface FertProductCardProps {
  image: string
  title: string
  packing_size: string
  price: number
  havePromo: boolean
  unit: string
  saleUnitPrice: number
  quantity: number | undefined
  minQty?: number
  onIncrease?: () => void
  onDecrease?: () => void
  onAdd?: () => void
}

const FertProductCard: React.FC<FertProductCardProps> = ({
  image,
  title,
  packing_size,
  price,
  havePromo,
  unit,
  saleUnitPrice,
  quantity,
  onIncrease,
  onDecrease,
  onAdd,
  minQty,
}) => {
  const isMin = quantity && minQty && quantity <= minQty ? true : false

  return (
    <View style={styleds.container}>
      <View style={styleds.border}>
        <View style={styleds.warpImage}>
          {image != '' ? (
            <>
              <Image
                source={{ uri: image }}
                style={styleds.imageProduct}
                resizeMethod={Platform.OS === 'android' ? 'resize' : 'auto'}
              />
            </>
          ) : (
            <>
              <Image style={styleds.imageNotFound} source={require('../../assets/empty-product.png')} />
            </>
          )}
        </View>
        <View style={styleds.warpInfo}>
          <Heading3 numberOfLines={2} style={styleds.textThName}>
            {title}
          </Heading3>
        </View>
        <Text style={styleds.warpPrice}>
          <Heading3 style={styleds.textPrice}>{`${currencyFormat(Math.trunc(price))}`}</Heading3>
          <Text2 style={{ color: '#8F9EBC' }}>{`/${packing_size}`}</Text2>
        </Text>
        <View style={styleds.btnWrapper}>
          {quantity ? (
            <TouchableOpacity style={styleds.editableBtnWrapper} activeOpacity={1}>
              <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                <TextInput
                  style={[styleds.numBtnText, { borderWidth: 1, flex: 1, paddingVertical: 5 }]}
                  keyboardType="decimal-pad"
                >
                  {quantity}
                </TextInput>
              </View>
              <View
                style={{
                  backgroundColor: '#FFF',
                  width: 143,
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={[styleds.minusBtn, styleds.adjustBtn, isMin ? styleds.disableBtn : null]}
                  onPress={() => !isMin && onDecrease?.()}
                  disabled={isMin ? true : false}
                >
                  {console.log(isMin)}
                  <Text style={[styleds.btnText, isMin ? styleds.disableBtnText : null, { fontSize: 24 }]}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styleds.adjustBtn, styleds.addBtn]} onPress={onIncrease}>
                  <Text style={[styleds.btnText, { fontSize: 24 }]}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styleds.btn} onPress={onAdd}>
              <Text style={styleds.btnText}>+ เพิ่มเข้าตะกร้า</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {havePromo && (
        <View style={styleds.warpPromoTag}>
          <PromoTag width={48} height={32} />
        </View>
      )}
    </View>
  )
}

const styleds = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  border: {
    borderColor: '#EFF3FD',
    borderWidth: 1,
    height: 310,
    width: 160,
    borderRadius: 10,
    marginRight: 7,
    marginTop: 10,
    marginLeft: 7,
    marginBottom: 10,
  },
  imageProduct: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  imageNotFound: {
    height: 80,
    resizeMode: 'contain',
  },
  warpImage: {
    marginTop: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warpInfo: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textThName: {
    alignSelf: 'flex-start',
    color: '#181725',
  },
  textEnName: {
    alignSelf: 'flex-start',
    color: '#333333',
  },
  warpPrice: {
    marginTop: 7,
    marginLeft: 10,
  },
  textPrice: {
    color: '#333333',
  },
  textInfo: { fontSize: 14, color: '#616A7B' },
  warpPromoTag: {
    position: 'absolute',
    top: 12,
    right: 14,
  },
  btnWrapper: {
    padding: 8,
    alignItems: 'center',
    // borderWidth: 1,
  },
  editableBtnWrapper: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0F8FF',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 46,
  },
  disableBtnText: { fontSize: 14, fontWeight: 'bold', color: '#CAE6FF', textAlign: 'center' },
  disableBtn: {
    backgroundColor: 'red',
    borderWidth: 1,
  },
  adjustBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#BFE0FF',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    right: -63,
  },
  minusBtn: {
    // left: -49,
  },
  btnText: { fontSize: 14, fontWeight: 'bold', color: '#4C95FF', textAlign: 'center' },
  numBtnText: { fontSize: 20, fontWeight: 'bold', color: '#616A7B', textAlign: 'center' },
})
export default FertProductCard
