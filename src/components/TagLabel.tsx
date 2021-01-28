import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle, ColorValue } from "react-native";

interface IProps {
    style?: StyleProp<ViewStyle>;
}

const TagLabel: React.FC<IProps> = ({ style, children }) => {
    const { tagLabel } = defaultStyles;
    const combineStyles = StyleSheet.flatten([tagLabel, style]);

    return (
        <View style={{ flexDirection: "row" }}>
            <View style={triangleStyle(combineStyles.height)} />
            <View style={combineStyles}>
                {children}
                <View style={holeStyle(combineStyles.height)} />
            </View>
        </View>
    );
};

const defaultStyles = StyleSheet.create({
    tagLabel: {
        width: 40,
        height: 24,
        backgroundColor: "#6D3DEF",
        justifyContent: "center",
        borderRadius: 4,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
});

const triangleStyle: StyleProp<any> = (height: number) => {
    return {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: height / 2,
        borderRightWidth: height / 2,
        borderBottomWidth: height / 2,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#6D3DEF",
        transform: [{ rotate: "-90deg" }],
        right: -(height / 4),
        bottom: -(height / 4),
    };
};

const holeStyle: StyleProp<any> = (height: number, holeRadius: number = 2) => {
    return {
        position: "absolute",
        left: -holeRadius * 2,
        top: height / 2 - holeRadius,
        width: holeRadius * 2,
        height: holeRadius * 2,
        borderRadius: holeRadius,
        backgroundColor: "#fff",
    };
};

export default TagLabel;
