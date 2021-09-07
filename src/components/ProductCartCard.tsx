import React from 'react'
import { View, StyleSheet, Text, Image, ViewPagerAndroidBase } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { currencyFormat } from '../utilities/CurrencyFormat'
import Heading3 from './Font/Heading3'
import Paragraph2 from './Font/Paragraph2'
import Paragraph3 from './Font/Paragraph3'
import Subheading3 from './Font/Subheading3'
import Text2 from './Font/Text2'

interface ProductCartCardProps {
  children?: React.ReactNode
  title: string
  pricePerUnit: number
  pricePerVolume?: number
  volumeUnit?: string
  saleUnit?: string
  priceTotal: number
  image: string
  quantity: number
  packingSize?: string
  onDelete?: () => void
  mode: string
  discount?: number
  originalPrice?: number
}

const ProductCartCard: React.FC<ProductCartCardProps> = ({
  children,
  title,
  pricePerUnit,
  pricePerVolume,
  volumeUnit,
  saleUnit,
  image,
  quantity,
  priceTotal,
  packingSize,
  onDelete,
  mode,
  discount,
  originalPrice,
}) => {
  return (
    <View style={styles.contianer}>
      <View style={styles.warpImg}>
        {image != '' ? (
          <Image style={styles.img} source={{ uri: image }} />
        ) : (
          <Image style={styles.img} source={require('../../assets/empty-product.png')} />
        )}
      </View>
      <View style={styles.warpInfo}>
        <View style={styles.warpTitle}>
          <Heading3 style={{ color: '#181725' }}>{title}</Heading3>
          {mode != 'show' ? (
            <TouchableOpacity onPress={onDelete}>
              <Image style={styles.imgDelete} source={require('../../assets/delete.png')} />
            </TouchableOpacity>
          ) : null}
        </View>
        {mode != 'show' ? (
          <Subheading3 style={{ color: '#181725' }}>
            {pricePerVolume ? `${currencyFormat(pricePerVolume)}/${volumeUnit}` : null}
          </Subheading3>
        ) : null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Paragraph2 style={{ color: '#616A7B' }}>{`${packingSize} | ${currencyFormat(
            pricePerUnit,
          )}/${saleUnit}`}</Paragraph2>
          {mode != 'show' ? null : <Paragraph2>{`${quantity}x(${saleUnit})`}</Paragraph2>}
        </View>
        {mode != 'show' ? (
          <Text>
            <Paragraph3>{`${currencyFormat(pricePerUnit)} x ${quantity} ${saleUnit}`}</Paragraph3>
            {'  '}
            <Paragraph3 style={{ color: '#3AAE49' }}>{discount ? `ส่วนลด ${currencyFormat(discount)}` : ''}</Paragraph3>
          </Text>
        ) : null}

        <View style={styles.warpQuantity}>
          {children}
          <View>
            {originalPrice && originalPrice !== priceTotal ? (
              <Text2 style={styles.textOriginalPrice}>{currencyFormat(originalPrice)}</Text2>
            ) : null}
            <Heading3 style={styles.textPriceTotal}>{currencyFormat(priceTotal)}</Heading3>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contianer: { flexDirection: 'row' },
  warpImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    flexWrap: 'wrap',
  },
  img: { width: '100%', height: 60, resizeMode: 'contain' },
  warpInfo: { padding: 10, flex: 1 },
  warpTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textOriginalPrice: {
    textAlign: 'right',
    color: '#616A7B',
    textDecorationLine: 'line-through',
  },
  textPerVolum: {
    color: '#181725',
  },
  textPriceTotal: {
    textAlign: 'right',
    color: '#181725',
  },
  warpQuantity: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTotal: { fontSize: 12, fontWeight: '500' },
  imgDelete: { width: 25, height: 25 },
})

export default ProductCartCard
