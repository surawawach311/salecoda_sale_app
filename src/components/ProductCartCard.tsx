import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ViewPagerAndroidBase,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { currencyFormat } from "../utilities/CurrencyFormat";

interface ProductCartCardProps {
  children?: React.ReactNode;
  title: string;
  pricePerUnit: number;
  pricePerVolume?: number;
  volumeUnit?: string;
  saleUnit?: string;
  priceTotal: number;
  image: string;
  quantity: number;
  packingSize?: string;
  onDelete?: () => void;
  mode: string;
  discount?: number;
  originalPrice?: number;
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
        {image != "" ? (
          <Image style={styles.img} source={{ uri: image }} />
        ) : (
          <Image
            style={styles.img}
            source={require("../../assets/empty-product.png")}
          />
        )}
      </View>
      <View style={styles.warpInfo}>
        <View style={styles.warpTitle}>
          <Text style={styles.textTitle}>{title}</Text>
          {mode != "show" ? (
            <TouchableOpacity onPress={onDelete}>
              <Image
                style={styles.imgDelete}
                source={require("../../assets/delete.png")}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {mode != "show" ? (
          <Text style={styles.textPerVolum}>
            {pricePerVolume
              ? `${currencyFormat(pricePerVolume)}/${volumeUnit}`
              : null}
          </Text>
        ) : null}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.textTotal}>{`${packingSize} | ${currencyFormat(
            pricePerUnit
          )}/${saleUnit}`}</Text>
          {mode != "show" ? null : <Text>{`${quantity}x(${saleUnit})`}</Text>}
        </View>
        {mode != "show" ? (
          <Text>
            <Text style={styles.textPriceUnit}>
              {`${currencyFormat(pricePerUnit)} x ${quantity} ${saleUnit}`}
            </Text>{'  '}
            <Text style={styles.textDiscount}>
              {discount ? `ส่วนลด ${currencyFormat(discount)}` : ''} 
            </Text>
          </Text>
        ) : null}

        <View style={styles.warpQuantity}>
          {children}
          <View>
            <Text style={styles.textOriginalPrice}>
              {originalPrice && originalPrice !== priceTotal ? currencyFormat(originalPrice) : ''}
            </Text>
            <Text style={styles.textPriceTotal}>
              {currencyFormat(priceTotal)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: { flexDirection: "row" },
  warpImg: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    flexWrap: "wrap",
  },
  img: { width: "100%", height: 60, resizeMode: "contain" },
  warpInfo: { padding: 10, flex: 1 },
  warpTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#181725",
  },
  textPriceUnit: {
    fontSize: 10,
    fontWeight: "500",
  },
  textDiscount: {
    fontSize: 10,
    fontWeight: "500",
    color: "#3AAE49",
  },
  textOriginalPrice: {
    textAlign: "right",
    fontSize: 14,
    fontWeight: "500",
    color: "#616A7B",
    textDecorationLine: "line-through",
  },
  textPerVolum: {
    fontSize: 12,
    color: "#181725",
    fontWeight: "bold",
  },
  textPriceTotal: { 
    textAlign: "right",
    fontSize: 18, 
    color: "#181725", 
    fontWeight: "bold" 
  },
  warpQuantity: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTotal: { fontSize: 12, fontWeight: "500", color: "#616A7B" },
  imgDelete: { width: 25, height: 25 },
});

export default ProductCartCard;
