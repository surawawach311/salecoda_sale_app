import React, { useEffect, useState } from "react";
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
import { SHIPPING_METHOD_MAPPING } from "../../definitions/ShippingMethod";
import { Shipment } from "./Shipment";

const ICONS: { [key: string]: any } = {
  delivery: require("../../../assets/home.png"),
  factory: require("../../../assets/factory.png"),
};

interface Props {
  onClose?: () => void;
  onOk?: (value: Shipment) => void;
  availableMethods: string[];
  availableShipments: Shipment[];
  activeShipment?: Shipment;
  defaultRemark?: string;
}

export const ModalDeliveryMethod: React.FC<Props> = ({
  onClose,
  onOk,
  availableMethods,
  availableShipments,
  activeShipment,
  defaultRemark,
}) => {
  const [remark, setRemark] = useState("");
  const [method, setMethod] = useState("");
  const [active, setActive] = useState<Shipment>();

  useEffect(() => {
    if (availableMethods.length > 0) {
      setMethod(availableMethods[0]);
    }
    if (activeShipment) {
      setActive(activeShipment);
      setMethod(activeShipment.method);
    }
    if (defaultRemark !== undefined) {
      setRemark(defaultRemark);
    }
  }, []);

  const handleConfirm = () => {
    if (active) {
      const value = availableShipments.find((s) => s.id === active.id);
      value && onOk?.({ ...value, remark });
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  const handleSelectMethod = (m: string) => {
    setMethod(m);
  };

  const handleSelectShipment = (s: Shipment) => {
    setActive(s);
  };

  const renderMethodIcon = (m: string) => {
    const activeOpac = m === method ? 1 : 0.5;
    return (
      <TouchableOpacity key={m} onPress={() => handleSelectMethod(m)}>
        <View style={{ marginRight: 8, opacity: activeOpac }}>
          <Image style={styled.iconClose} source={ICONS[m]} />
          <Text style={styled.deliveryTextIcon}>{SHIPPING_METHOD_MAPPING[m]}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAddressList = () => {
    const shipments = availableShipments.filter((s) => s.method === method);

    if (shipments.length === 0) {
      return (
        <View style={styled.deliveryAddressInnnerContainer}>
          <View style={styled.textAddress}>
            <Text>ไม่พบที่อยู่ที่รองรับ</Text>
          </View>
        </View>
      );
    }

    return shipments.map((a) => (
      <TouchableOpacity key={a.id} onPress={() => handleSelectShipment(a)}>
        <View style={styled.deliveryAddressInnnerContainer}>
          <View style={active?.id === a.id ? styled.iconPin : styled.iconUnPin} />
          <View style={styled.textAddress}>
            <Text style={styled.deliveryTextShopName}>{a.name}</Text>
            <Text>
              {`${a.address} ${a.subDistrict}\n${a.district} ${a.province} ${a.postCode}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styled.container}
      >
        <View style={styled.centerSubContainer}>
          <View style={styled.deliveryHeader}>
            <TouchableOpacity onPress={handleClose}>
              <Image style={styled.iconClose} source={require("../../../assets/close.png")} />
            </TouchableOpacity>
            <View style={styled.deliveryHeaderContainer}>
              <Text style={styled.deliveryTextHeader}>เลือกการจัดส่ง</Text>
            </View>
          </View>
          <View style={styled.deliveryMethodIcon}>{availableMethods.map(renderMethodIcon)}</View>
          <View style={styled.deliveryAddressContainer}>
            <Text style={styled.textHeaderPayment}>ที่อยู่จัดส่ง</Text>
            {renderAddressList()}
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
              style={active ? styled.deliveryButton : styled.disabbledDeliveryButton}
              onPress={handleConfirm}
              disabled={!active}
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
  disabbledDeliveryButton: {
    height: 50,
    backgroundColor: "#4C95FF",
    justifyContent: "center",
    borderRadius: 8,
    opacity: 0.5,
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
  iconUnPin: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    width: 20,
    height: 20,
  },
  textAddress: { marginHorizontal: 10 },
});
