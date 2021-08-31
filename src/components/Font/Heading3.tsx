import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Heading3Props {
  style?: StyleProp<TextStyle>
}

const Heading3: React.FC<Heading3Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiBold', fontSize: 16 }, style]}>{children}</Text>
}
export default Heading3
