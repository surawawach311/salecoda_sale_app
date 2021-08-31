import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Text1Props {
  style?: StyleProp<TextStyle>
}

const Text1: React.FC<Text1Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiMedium', fontSize: 16 }, style]}>{children}</Text>
}
export default Text1
