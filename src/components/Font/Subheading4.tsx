import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Subheading4Props {
  style?: StyleProp<TextStyle>
}

const Subheading4: React.FC<Subheading4Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiSemiBold', fontSize: 12 }, style]}>{children}</Text>
}
export default Subheading4
