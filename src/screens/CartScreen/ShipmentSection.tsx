import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { ModalDeliveryMethod } from "../../components/ModalDeliveryMethod";
import { SHIPPING_METHOD_MAPPING } from "../../definitions/ShippingMethod";
import { CartDataSource } from "../../datasource/CartDataSource";
import { ShipmentEntity, Shipment as AvailableShipment } from "../../entities/ShipmentEntity";

export interface Shipment {
  id: string;
  method: string;
  name: string;
  telephone: string;
  address: string;
  district: string;
  subDistrict: string;
  province: string;
  postCode: string;
  remark: string;
}

interface Props {
  shopId: string;
  onChange?: (value?: Shipment) => void;
}

const ShipmentSection: React.FC<Props> = ({ shopId, onChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ShipmentEntity>();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [methods, setMethods] = useState<string[]>([]);
  const [selected, setSelected] = useState<Shipment>();
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    CartDataSource.getShipment(shopId).then((d) => {
      const availableMethods: string[] = d.available_shipments.map((s) => s.shipping_method);
      const availableShipments: Shipment[] = d.available_shipments.flatMap((s) => {
        return s.addresses.map((a, i) => ({
          id: `${s.shipping_method}-${i}`,
          method: s.shipping_method,
          name: a.name,
          telephone: a.telephone,
          address: a.address,
          district: a.district,
          subDistrict: a.sub_district,
          province: a.province,
          postCode: a.post_code,
          remark: "",
        }));
      });
      setMethods(availableMethods);
      setShipments(availableShipments);
      setIsLoading(false);
    });
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderRemark = (s: Shipment) => {
    return s.remark ? (
      <>
        <View style={styled.line} />
        <View style={{ marginTop: 8 }}>
          <Text style={styled.textHeaderPayment}>หมายเหตุ</Text>
          <Text style={styled.textRemark}>{s.remark}</Text>
        </View>
      </>
    ) : null;
  };

  return (
    <>
      <ModalDeliveryMethod visible={showModal} onClose={handleCloseModal} />
      <View style={styled.container}>
        <View style={styled.headerDeliveryMethodtContainer}>
          <Text style={styled.textHeaderPayment}>สถานที่รับสินค้า/สถานที่จัดส่ง</Text>
          {selected ? (
            <TouchableOpacity onPress={handleOpenModal}>
              <Text style={styled.textChageDeliveryMethod}>เปลี่ยน</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styled.line} />
        {isLoading ? (
          <View style={[styled.container, { paddingVertical: 16 }]}>
            <ActivityIndicator size="large" color="#4C95FF" />
          </View>
        ) : selected ? (
          <>
            <View style={styled.deliveryPointContainer}>
              <Image style={styled.iconLocation} source={require("../../../assets/location.png")} />
              <View style={styled.deliveryMethodtContainer}>
                <Text style={styled.textDeliveryMethod}>
                  {shippingMethod
                    ? SHIPPING_METHOD_MAPPING[shippingMethod]
                    : "unkown shipping method"}
                </Text>
                <Text style={styled.textDeliveryPoint}>
                  <Text style={styled.deliveryTextShopName}>{`${selected.name}\n`}</Text>
                  <Text>{`${selected.address} ${selected.subDistrict}\n`}</Text>
                  <Text>{`${selected.district} ${selected.province} ${selected.postCode}`}</Text>
                </Text>
              </View>
            </View>
            {renderRemark(selected)}
          </>
        ) : (
          <TouchableOpacity style={styled.buttonDelivery} onPress={handleOpenModal}>
            <Image style={styled.iconDelivery} source={require("../../../assets/delivery.png")} />
            <Text style={styled.textButtonDelivery}> เลือกการจัดส่ง</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default ShipmentSection;

const styled = StyleSheet.create({
  container: {
    padding: 10,
  },
  textHeaderPayment: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDelivery: {
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    padding: 10,
    marginTop: 20,
    margin: 10,
    alignItems: "center",
  },
  iconDelivery: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  iconLocation: { width: 20, height: 20, resizeMode: "contain" },
  textButtonDelivery: { color: "#4C95FF", fontSize: 14, fontWeight: "bold" },
  line: {
    marginTop: 10,
    borderBottomColor: "#EBEFF2",
    borderBottomWidth: 2,
    borderRadius: 3,
  },
  deliveryPointContainer: {
    margin: 20,
    flexDirection: "row",
    marginBottom: 10,
  },
  deliveryTextShopName: { fontWeight: "bold" },
  textChageDeliveryMethod: {
    color: "#4C95FF",
    fontWeight: "bold",
    fontSize: 14,
  },
  textDeliveryPoint: {
    color: "#616A7B",
    fontSize: 16,
  },
  textRemark: {
    color: "#616A7B",
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  deliveryMethodtContainer: { marginLeft: 10 },
  textDeliveryMethod: {
    color: "#616A7B",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerDeliveryMethodtContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconPin: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#4C95FF",
    width: 20,
    height: 20,
    marginRight: 5,
  },
  iconUnPin: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    width: 20,
    height: 20,
    marginRight: 5,
  },
  methodChoiceContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
});
