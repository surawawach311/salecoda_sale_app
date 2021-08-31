import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Subheading2Props {
  style?: StyleProp<TextStyle>
}

const Subheading2: React.FC<Subheading2Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiSemiBold', fontSize: 16 }, style]}>{children}</Text>
}
export default Subheading2
