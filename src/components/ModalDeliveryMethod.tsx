import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ShipmentAddress, ShipmentEntity } from "../entities/ShipmentEntity";

interface ModalDeliveryMethodProps {
  visible: boolean;
  onClose: () => void;
  onOk: (
    value: string,
    shippingAddress: ShipmentAddress | undefined,
    deliveryMethod: string | undefined
  ) => void;
  availableShipmnet?: ShipmentEntity;
}

export const ModalDeliveryMethod: React.FC<ModalDeliveryMethodProps> = ({
  visible,
  onClose,
  onOk,
  availableShipmnet,
}) => {
  const [remark, setRemark] = useState("");
  const [method, setMethod] = useState(
    availableShipmnet?.available_shipments[0].shipping_method
  );
  const [address, setAddress] = useState<ShipmentAddress>();
  const shipmentMethod = (shipment: string) => {
    if (shipment == "delivery") {
      return (
        <TouchableOpacity
          key={shipment}
          onPress={() => {
            setMethod(shipment);
            availableShipmnet?.available_shipments
              .filter((item) => item.shipping_method == shipment)
              .map((shipment) =>
                shipment.addresses.map((address) => setAddress(address))
              );
          }}
        >
          <Image
            style={styled.iconClose}
            source={require("../../assets/home.png")}
          />
          <Text style={styled.deliveryTextIcon}>จัดส่งที่ร้าน</Text>
        </TouchableOpacity>
      );
    } else if (shipment == "factory") {
      return (
        <TouchableOpacity
          onPress={() => {
            setMethod(shipment);
            availableShipmnet?.available_shipments
              .filter((item) => item.shipping_method == shipment)
              .map((shipment) =>
                shipment.addresses.map((address) => setAddress(address))
              );
          }}
          key={shipment}
          style={{ marginLeft: 15 }}
        >
          <Image
            style={{
              width: 60,
              height: 20,
              resizeMode: "contain",
              alignSelf: "center",
              marginBottom: 10,
            }}
            source={require("../../assets/factory.png")}
          />
          <Text style={styled.deliveryTextIcon}>รับที่โรงงาน</Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styled.container}
      >
        <View style={styled.centerSubContainer}>
          <View style={styled.deliveryHeader}>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
            >
              <Image
                style={styled.iconClose}
                source={require("../../assets/close.png")}
              />
            </TouchableOpacity>
            <View style={styled.deliveryHeaderContainer}>
              <Text style={styled.deliveryTextHeader}>เลือกการจัดส่ง</Text>
            </View>
          </View>
          <View style={styled.deliveryMethodIcon}>
            {availableShipmnet?.available_shipments.map((shipment) => {
              return shipmentMethod(shipment.shipping_method);
            })}
          </View>
          <View style={styled.deliveryAddressContainer}>
            <Text style={styled.textHeaderPayment}>ที่อยู่จัดส่ง</Text>
            <View style={styled.deliveryAddressInnnerContainer}>
              <View style={styled.iconPin} />
              {availableShipmnet?.available_shipments
                .filter((item) => item.shipping_method == method)
                .map((shipment) => {
                  return shipment.addresses.map((address) => {
                    return (
                      <View key={address.address} style={styled.textAddress}>
                        <Text style={styled.deliveryTextShopName}>
                          {address.name}
                        </Text>
                        <Text>
                          {`${address.address} ${address.sub_district} \n ${address.district} ${address.province} ${address.post_code}`}
                        </Text>
                      </View>
                    );
                  });
                })}
              <></>
            </View>
            <Text style={styled.textHeaderPayment}>หมายเหตุ</Text>

            <TextInput
              style={styled.deliveryInputRemark}
              multiline={true}
              placeholder="หมายเหตุ"
              onChangeText={(value) => setRemark(value)}
              value={remark}
            />
          </View>
          <View style={styled.deliveryButtonContainer}>
            <TouchableOpacity
              style={styled.deliveryButton}
              onPress={() => onOk(remark, address, method)}
            >
              <Text style={styled.deliveryButtonText}>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centerSubContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    padding: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textHeaderPayment: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconClose: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  modalBackgroundStyle: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  deliveryHeader: {
    flexDirection: "row",
  },
  deliveryTextHeader: { alignSelf: "center", fontSize: 22 },
  deliveryMethodIcon: {
    flexDirection: "row",
    marginTop: 40,
  },
  deliveryTextIcon: { color: "#4C95FF" },
  deliveryAddressContainer: { marginTop: 30 },
  deliveryHeaderContainer: {
    flex: 1,
  },
  deliveryAddressInnnerContainer: {
    margin: 15,
    backgroundColor: "#F7F9FF",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  deliveryTextShopName: { fontWeight: "bold" },
  deliveryInputRemark: {
    textAlignVertical: "top",
    height: 130,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E1E7F7",
    marginTop: 40,
    paddingTop: 15,
    padding: 10,
  },
  deliveryButtonContainer: {
    marginTop: "10%",
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  deliveryButton: {
    height: 50,
    backgroundColor: "#4C95FF",
    justifyContent: "center",
    borderRadius: 8,
  },
  deliveryButtonText: {
    color: "#FFF",
    fontSize: 18,
    alignSelf: "center",
  },
  iconPin: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#4C95FF",
    width: 20,
    height: 20,
  },
  textAddress: { marginLeft: 10 },
});
