import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Heading1Props {
  style?: StyleProp<TextStyle>
}

const Heading1: React.FC<Heading1Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiBold', fontSize: 32 }, style]}>{children}</Text>
}
export default Heading1
