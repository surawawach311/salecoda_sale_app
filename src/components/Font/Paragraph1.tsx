import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Paragraph1Props {
  style?: StyleProp<TextStyle>
}

const Paragraph1: React.FC<Paragraph1Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'THSarabun', fontSize: 16 }, style]}>{children}</Text>
}
export default Paragraph1
