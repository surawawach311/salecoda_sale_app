import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { paymentCartEntity } from "../../entities/CartEntity";

interface PaymentSectionProps {
  onChange: (method: string) => void;
  payments: paymentCartEntity[];
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  payments,
  onChange,
}) => {
  const [payment, setPayment] = useState<string>();

  useEffect(() => {
    initailPayment();
  }, []);

  const initailPayment = () => {
    if (payments.length <= 1) {
      payments.map((item) => setPayment(item.id));
    }
  };

  return (
    <View style={styled.paymentContainer}>
      {}
      <Text style={styled.textHeaderPayment}>วิธีชำระเงิน</Text>
      <View style={styled.paymentMethod}>
        {payments.map((method: paymentCartEntity) => {
          return method.name == "เงินสด" ? (
            <View key={method.name} style={styled.methodChoiceContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setPayment("cash");
                  onChange("cash");
                }}
              >
                {payment == "cash" ? (
                  <View style={styled.iconPin} />
                ) : (
                  <View style={styled.iconUnPin} />
                )}
              </TouchableWithoutFeedback>
              <Text style={styled.textBodyPayment}>
                {method.name}
                {method.discount_rate
                  ? `(รับส่วนลดเพิ่ม ${method.discount_rate} %)`
                  : null}
              </Text>
            </View>
          ) : (
            <View key={method.name} style={styled.methodChoiceContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setPayment("credit");
                  onChange("credit");
                }}
              >
                {payment == "credit" ? (
                  <View style={styled.iconPin} />
                ) : (
                  <View style={styled.iconUnPin} />
                )}
              </TouchableWithoutFeedback>

              <Text style={styled.textBodyPayment}>
                {method.name}
                {/* (คงเหลือ{" "}
              {currencyFormat(method.remain_credit, 2)}) */}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PaymentSection;

const styled = StyleSheet.create({
  paymentContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "white",
  },
  textHeaderPayment: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentMethod: {
    marginTop: 10,
    borderBottomColor: "#EBEFF2",
    borderBottomWidth: 2,
    borderTopColor: "#EBEFF2",
    borderTopWidth: 2,
    borderRadius: 3,
    padding: 20,
  },
  methodChoiceContainer: {
    flexDirection: "row",
    marginBottom: 5,
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
  textBodyPayment: {
    fontSize: 16,
    color: "#616A7B",
  },
});
