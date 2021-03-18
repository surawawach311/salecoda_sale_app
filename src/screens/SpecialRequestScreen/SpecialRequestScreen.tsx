import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AccrodingPrice from "../../components/AccrodingPrice";
import SpecialRequestProductCard from "../../components/SpecialProductCard";
import { CartDataSource } from "../../datasource/CartDataSource";
import { CartEntity } from "../../entities/CartEntity";
import { CartFacade } from "../../facade/CartFacade";
import { AccrodionPriceModel } from "../../models/AccrodionPriceModel";
import {
  ItemSpecialRequest,
  ProductSpecialRequestModel,
} from "../../models/SpecialRequestModel";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import { currencyFormat } from "../../utilities/CurrencyFormat";

type SpecialRequestScreennRouteProp = StackScreenProps<
  PurchaseStackParamList,
  "SpecialRequest"
>;

const SpecialRequestScreen: React.FC<SpecialRequestScreennRouteProp> = ({
  navigation,
  route,
}) => {
  const [products, setProducts] = useState<ProductSpecialRequestModel[]>([]);
  const [request, setRequest] = useState<ItemSpecialRequest[]>([]);
  const [cart, setCart] = useState<CartEntity>(route.params.cart);
  const [discoutPromo, setDiscoutPromo] = useState<AccrodionPriceModel[]>([]);
  const [specialRequest, setSpecialRequest] = useState<AccrodionPriceModel[]>([]);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    formatData();
  }, []);
  const formatData = () => {
    const productSpecialRequest: ProductSpecialRequestModel[] = route.params.cart.items.map(
      (item) => ({
        id: item.id,
        name: item.title,
        image: item.image,
        quantity: item.quantity,
        sale_unit: item.sale_unit,
        promotion_discount: route.params.cart.received_discounts.find(
          (a) => a.item_id == item.id
        )?.price,
        total_price: item.total_price,
        discount: undefined,
      })
    );
    const itemRequest: ItemSpecialRequest[] = route.params.cart.items.map(
      (item) => ({
        price_id: item.id,
        amount: 0,
      })
    );
    setProducts(productSpecialRequest);
    setRequest(itemRequest);
    let promo = formatAccrodion(
      route.params.cart.received_discounts.filter(
        (item) => item.item_id != null && item.item_id != ""
      )
    );
    let request = formatAccrodion(
      route.params.cart.received_special_request_discounts
    );
    setDiscoutPromo(promo);
    setSpecialRequest(request);
  };

  const formatAccrodion = (data: any[]): AccrodionPriceModel[] => {
    let arrayOutput: any[] = [];
    data.map((item: any) => {
      arrayOutput.push({
        item: `${item.name} (${item.price}฿ x ${item.quantity} ลัง)`,
        price: item.price,
        quantity: item.quantity,
      });
    });
    return arrayOutput;
  };

  const propsCallback = (e: ItemSpecialRequest) => {
    let productRequestDiscount: ItemSpecialRequest[] = request?.map(
      (item: ItemSpecialRequest) => {
        return item.price_id == e.price_id
          ? {
              ...item,
              amount: e.amount,
            }
          : item;
      }
    );

    let productCardRequestDiscount = products.map(
      (item: ProductSpecialRequestModel) => {
        return item.id == e.price_id
          ? {
              ...item,
              discount: e.amount,
            }
          : item;
      }
    );
    let special_request = formatAccrodion(
      products
        .filter((item) => item.id == e.price_id)
        .map((item) => {
          return {
            name: item.name,
            price: e.amount,
            quantity: item.quantity,
          };
        })
    );
    setSpecialRequest(special_request);
    setRequest(productRequestDiscount);
    setProducts(productCardRequestDiscount);

    CartDataSource.calculateSpecialRequest(
      route.params.shop.id,
      productRequestDiscount
    ).then((res) => {
      setCart(res);
    });
  };

  const createSpecialRequest = () => {
    CartFacade.createSpecialRequest(route.params.shop.id, request, remark).then(
      (res) => {
        CartDataSource.addSpecialRequest(route.params.shop.id, res).then(
          (res: CartEntity) => {
            navigation.navigate("Cart", {
              shop: route.params.shop,
            });
          }
        );
      }
    );
  };

  const handleConfirmSpecialRequest = () => {
    createSpecialRequest();
  };

  return (
    <>
      <ScrollView style={styled.container}>
        <View style={styled.specialLabel}>
          <Text style={styled.specialLabelFont}>สินค้าที่ขอลดราคา</Text>
        </View>
        {products
          ? products.map((product) => {
              return (
                <SpecialRequestProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  image={product.image}
                  quantity={product.quantity}
                  sale_unit={product.sale_unit}
                  total_price={product.total_price}
                  promotion_discount={product.promotion_discount}
                  callback={propsCallback}
                  discountRequest={product.discount}
                />
              );
            })
          : null}
        <View style={styled.remarkWrapper}>
          <Text style={styled.specialLabelFont}>หมายเหตุ</Text>
          <TextInput 
            style={styled.remarkTextInput} 
            value={remark} 
            placeholder="ใส่หมายเหตุ..." 
            onChangeText={setRemark} 
          />
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 20,
          paddingBottom: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 11.14,
          elevation: 17,
        }}
      >
        <View
          style={{
            padding: 10,
          }}
        >
          <View style={styled.warpSummary}>
            <Text style={styled.fontBottomSumary}>ราคาก่อนลด</Text>
            <Text style={styled.fontBottomSumary}>
              {currencyFormat(cart?.before_discount, 2)}
            </Text>
          </View>

          <AccrodingPrice
            title="ส่วนลดรายการ"
            total={discoutPromo
              .filter((item) => item.item != "")
              .reduce((sum, item) => sum + item.quantity * item.price, 0)}
            detail={discoutPromo}
            price_color={"#3AAE49"}
          />
          <AccrodingPrice
            title="ขอส่วนลดพิเศษเพิ่ม"
            total={specialRequest.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
            detail={specialRequest}
            price_color={"#BB6BD9"}
          />
          {/* <View style={styled.warpSummary}>
            <Text style={styled.fontBottomSumary}>ส่วนลดจากรายการ</Text>
            <Text style={styled.fontBottomSumary}>
              {currencyFormat(
                cart?.received_discounts
                  .filter((item) => item.item_id != null)
                  .reduce((sum, item) => sum + item.total, 0)
              )}
            </Text>
          </View> */}
          {/* <View style={styled.warpSummary}>
            <Text style={styled.fontBottomSumary}>ขอส่วนลดพิเศษเพิ่ม</Text>
            <Text style={styled.fontBottomSumary}>
              {currencyFormat(cart?.total_received_special_request_discount)}
            </Text>
          </View> */}
          <View
            style={{
              borderWidth: 1,
              borderColor: "#EBEFF2",
              marginVertical: 10,
            }}
          />
          <View style={styled.warpSummary}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: "#616A7B" }}
            >
              ราคารวม
            </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#4C95FF" }}
            >
              {currencyFormat(cart?.total_price)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styled.confirmOrderButton}
          onPress={() => handleConfirmSpecialRequest()}
        >
          <Text style={styled.textconfirmOrderButton}>บันทึกส่วนลดพิเศษ</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SpecialRequestScreen;

const styled = StyleSheet.create({
  container: {},
  specialLabel: { padding: 16, backgroundColor: "#FFFFFF", marginBottom: 5 },
  remarkWrapper: { 
    padding: 16, 
    backgroundColor: "#FFFFFF",
    marginBottom: 5 
  },
  remarkTextInput: {
    height: 128,
    padding: 16,
    borderWidth: 1, 
    borderRadius: 12, 
    borderColor: "#E1E7F6",
    marginTop: 12,
    textAlignVertical: "top",
  },
  specialLabelFont: { fontSize: 17, fontWeight: "bold" },
  confirmOrderButton: {
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#4C95FF",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textconfirmOrderButton: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  fontBottomSumary: { color: "#6B7995", fontSize: 16, fontWeight: "400" },
  warpSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
