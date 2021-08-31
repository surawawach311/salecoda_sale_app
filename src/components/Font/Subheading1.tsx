import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Subheading1Props {
  style?: StyleProp<TextStyle>
}

const Subheading1: React.FC<Subheading1Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiSemiBold', fontSize: 20 }, style]}>{children}</Text>
}
export default Subheading1
