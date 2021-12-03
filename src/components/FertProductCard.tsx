import React from 'react'
import { View, StyleSheet, Image, Text, Platform, TouchableOpacity, TextInput } from 'react-native'
import PromoTag from '../../assets/svg/promotion-tag.svg'
import { currencyFormat } from '../utilities/CurrencyFormat'
import Heading3 from './Font/Heading3'
import Text2 from './Font/Text2'

interface FertProductCardProps {
  image: string
  title: string
  // enName: string
  packing_size: string
  price: number
  havePromo: boolean
  unit: string
  saleUnitPrice: number
}

const FertProductCard: React.FC<FertProductCardProps> = ({
  image,
  title,
  // enName,
  packing_size,
  price,
  havePromo,
  unit,
  saleUnitPrice,
}) => {
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
          {/* {qty ? ( */}
          {/* <TouchableOpacity style={styleds.editableBtnWrapper} activeOpacity={1}>
            <TouchableOpacity
              style={[styleds.btn, styleds.adjustBtn]}
              onPress={() => alert('-')}
              onPress={() => !isMin && onDecrease?.()}
            >
              <Text style={[styleds.btnText, { fontSize: 24 }]}>-</Text>
            </TouchableOpacity>
            <TextInput style={styleds.numBtnText}>{999}</TextInput>
            <TouchableOpacity style={[styleds.btn, styleds.adjustBtn]} onPress={() => alert('+')}>
              <Text style={[styleds.btnText, { fontSize: 24 }]}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity> */}
          {/* ) : ( */}
          {/* <TouchableOpacity
            style={styleds.btn}
            //  onPress={onAdd}
          >
            <Text style={styleds.btnText}>+ เพิ่มเข้าตะกร้า</Text>
          </TouchableOpacity> */}
          {/* )} */}
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
    // height: 230,
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
  },
  editableBtnWrapper: {
    flexDirection: 'row',
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
  },
  disableBtn: {
    backgroundColor: '#F0F8FF',
  },
  adjustBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#BFE0FF',
  },
  btnText: { fontSize: 14, fontWeight: 'bold', color: '#4C95FF', textAlign: 'center' },
  numBtnText: { fontSize: 20, fontWeight: 'bold', color: '#616A7B', textAlign: 'center' },
})
export default FertProductCard
