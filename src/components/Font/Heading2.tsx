import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Heading2Props {
  style?: StyleProp<TextStyle>
}

const Heading2: React.FC<Heading2Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiBold', fontSize: 24 }, style]}>{children}</Text>
}
export default Heading2
