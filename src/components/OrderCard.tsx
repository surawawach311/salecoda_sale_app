import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { ThaiDateFormat, ThaiTimeFormat } from "../utilities/ThaiDateFormat";

interface OrderCardProps {
  orderNumber: string;
  createDatetime: string;
  quantity: number;
  address: any;
  status: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderNumber,
  createDatetime,
  quantity,
  address,
  status,
}) => {
  return (
    <View style={styled.orderCard}>
      <View style={styled.headerCard}>
        <View style={styled.innerheaderLeftCard}>
          <Image
            style={styled.iconInvoice}
            source={require("../../assets/invoice.png")}
          />
          <Text style={styled.textOrderNumber}>{orderNumber}</Text>
        </View>
        <View style={styled.innerheaderRightCard}>
          <Text style={styled.detail}>ดูรายละเอียด</Text>
          <Text style={styled.textDate}>{`${ThaiDateFormat(createDatetime)} ${ThaiTimeFormat(createDatetime)}`}</Text> 
          <View />
        </View>
      </View>
      <View style={styled.breakLine} />
      <View>
        <View style={styled.bodyCard}>
          <Image
            style={styled.iconPackage}
            source={require("../../assets/package.png")}
          />
          <Text style={styled.itemQuantity}>{`${quantity} รายการ`}</Text>
        </View>
        <View style={styled.companyAdress}>
          <Image
            style={styled.iconLocation}
            source={require("../../assets/location3.png")}
          />
          <Text style={styled.textCompanyAddress}>
            {`${address.name} \n${address.address} ตำบล${address.sub_district} อำเภอ${address.district} ${address.province} ${address.post_code} `}
          </Text>
        </View>
        <View style={styled.statusContainer}>
          <View style={styled.statusBadge}>
            <Text style={styled.textStatusBadge}>รออนุมัติวงเงิน</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 30, height: 30, resizeMode: "contain" }}
              source={require("../../assets/correct.png")}
            />
            <Text style={{ color: "#69D200", marginLeft: 5 }}>
              ข้อมูลจัดส่งครบ
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

const styled = StyleSheet.create({
  orderCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 20,
    padding: 20,
  },
  headerCard: { flexDirection: "row", justifyContent: "space-between" },
  textOrderNumber: { fontSize: 14, fontWeight: "bold", marginLeft: 4 },
  iconInvoice: { height: 20, width: 16, resizeMode: "contain" },
  detail: {
    color: "#4C95FF",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  breakLine: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginVertical: 10,
  },
  innerheaderLeftCard: { flexDirection: "row" },
  innerheaderRightCard: { alignItems: "flex-end" },
  textDate: { color: "#6B7995", fontWeight: "bold", fontSize: 12 },
  bodyCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconPackage: { height: 13, width: 14, resizeMode: "contain" },
  itemQuantity: { color: "#6B7995", marginLeft: 5 },
  companyAdress: {
    flexDirection: "row",
    marginBottom: 10,
  },
  iconLocation: {
    height: 15,
    width: 14,
    resizeMode: "contain",
  },
  textCompanyAddress: { color: "#6B7995", marginLeft: 5 },
  statusBadge: {
    width: 100,
    height: 36,
    backgroundColor: "#FFE9D8",
    borderRadius: 18,
    padding: 7,
    marginLeft: 15,
  },
  statusContainer: { flexDirection: "row", justifyContent: "space-between" },
  textStatusBadge: { color: "#FF8824" },
});
