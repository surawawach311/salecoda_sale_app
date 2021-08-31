import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Heading4Props {
  style?: StyleProp<TextStyle>
}

const Heading4: React.FC<Heading4Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiBold', fontSize: 12 }, style]}>{children}</Text>
}
export default Heading4
