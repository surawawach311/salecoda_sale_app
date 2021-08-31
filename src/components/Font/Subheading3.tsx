import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Subheading3Props {
  style?: StyleProp<TextStyle>
}

const Subheading3: React.FC<Subheading3Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiSemiBold', fontSize: 14 }, style]}>{children}</Text>
}
export default Subheading3
