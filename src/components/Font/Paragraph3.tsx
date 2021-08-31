import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Paragraph3Props {
  style?: StyleProp<TextStyle>
}

const Paragraph3: React.FC<Paragraph3Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'THSarabun', fontSize: 8 }, style]}>{children}</Text>
}
export default Paragraph3
