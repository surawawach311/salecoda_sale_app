import React from 'react'
import { View, StyleSheet, Image, Platform } from 'react-native'
import PromoTag from '../../assets/svg/promotion-tag.svg'
import { currencyFormat } from '../utilities/CurrencyFormat'
import Heading3 from './Font/Heading3'
import Paragraph2 from './Font/Paragraph2'

interface ProductCardProps {
  imagePath: string
  thName: string
  enName: string
  productInfo: string
  price: number
  havePromo: boolean
  unit: string
  saleUnitPrice: number
}

const ProductCard: React.FC<ProductCardProps> = ({
  imagePath,
  thName,
  enName,
  productInfo,
  price,
  havePromo,
  unit,
  saleUnitPrice,
}) => {
  return (
    <View style={styleds.container}>
      <View style={styleds.border}>
        <View style={styleds.warpImage}>
          {imagePath != '' ? (
            <>
              <Image
                source={{ uri: imagePath }}
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
          <Heading3 numberOfLines={1} style={styleds.textThName}>
            {thName}
          </Heading3>
          <Paragraph2 numberOfLines={1} style={styleds.textEnName}>
            {enName}
          </Paragraph2>
          <Paragraph2 style={styleds.textEnName}>
            {productInfo}
            {saleUnitPrice != price ? ' | ' + currencyFormat(Math.trunc(saleUnitPrice)) + '/' + unit : null}
          </Paragraph2>
        </View>
        <View style={styleds.warpPrice}>
          <Heading3 style={styleds.textPrice}>{currencyFormat(Math.trunc(price))}</Heading3>
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
    height: 230,
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
})
export default ProductCard
