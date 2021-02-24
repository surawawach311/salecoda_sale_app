import React from "react";
import { View, Text, StyleSheet } from "react-native";
interface badgeStatusProps {
  status: string;
}

const BadgeStatus: React.FC<badgeStatusProps> = ({ status }) => {
  return (
    <>
      {status == "waiting_confirm" ? (
        <View style={styled.badgeStatus}>
          <Text style={styled.textStatus}>รอยืนยันคำสั่งซื้อ</Text>
        </View>
      ) : null}
    </>
  );
};
export default BadgeStatus;
const styled = StyleSheet.create({
  badgeStatus: {
    backgroundColor: "#FFE9D8",
    padding: 8,
    paddingVertical: 5,
    borderRadius: 15,
  },
  textStatus: { color: "#FF8824" },
});
