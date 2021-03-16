import React from "react";
import { Accordion, Icon } from "native-base";
import { View, Text, StyleSheet } from "react-native";
import { currencyFormat } from "../utilities/CurrencyFormat";

export interface AccrodingPriceProps {
  title: string;
  total: number;
  price_color?: string;
  detail: {
    item: string;
    price: number;
    quantity: number;
  }[];
}

const AccrodingPrice: React.FC<AccrodingPriceProps> = ({
  title,
  total,
  detail,
  price_color,
}) => {
  const props = [
    {
      header: title,
      total: total,
      detail: detail,
    },
  ];
  const _renderHeader = (
    item: { header: React.ReactNode; total: number | undefined },
    expanded: any
  ) => {
    return (
      <View style={styled.HeaderContainer}>
        <View style={styled.textHeaderContainer}>
          <Text style={{ fontSize: 14, color: "#6B7995" }}>{title}</Text>

          {expanded ? (
            <Icon style={styled.iconAccording} type="AntDesign" name="up" />
          ) : (
            <Icon style={styled.iconAccording} type="AntDesign" name="down" />
          )}
        </View>
        <Text
          style={[
            styled.textContentName,
            price_color ? { color: price_color } : { color: "#6B7995" },
          ]}
        >
          {currencyFormat(item.total)}
        </Text>
      </View>
    );
  };

  const _renderDetail = (item: {
    header: string;
    total: number;
    detail: [
      {
        item: string;
        price: number;
        quantity: number;
      }
    ];
  }) => {
    return item.detail.map(
      (
        item: { item: React.ReactNode; price: number; quantity: number },
        index: number
      ) => {
        return (
          <View key={index} style={styled.textDetailContainer}>
            <Text style={styled.textDetail}>{item.item}</Text>
            <Text style={styled.textDetail}>{currencyFormat(item.price * item.quantity)}</Text>
          </View>
        );
      }
    );
  };
  return (
    <Accordion
      dataArray={props}
      renderHeader={_renderHeader}
      renderContent={_renderDetail}
      style={{ borderWidth: 0, paddingVertical: 5 }}
    />
  );
};

export default AccrodingPrice;

const styled = StyleSheet.create({
  textContentName: {
    color: "#6B7995",
    fontSize: 14,
    fontWeight: "bold",
  },
  textDetailContainer: {
    backgroundColor: "#FBFBFB",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  HeaderContainer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  textHeaderContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  iconAccording: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(107, 121, 149, 1)",
  },
  textDetail: {
    fontSize: 14,
    color: "rgba(156, 169, 197, 1)",
  },
});
