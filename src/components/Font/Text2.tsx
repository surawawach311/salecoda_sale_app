import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Text2Props {
  style?: StyleProp<TextStyle>
}

const Text2: React.FC<Text2Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiMedium', fontSize: 12 }, style]}>{children}</Text>
}
export default Text2
