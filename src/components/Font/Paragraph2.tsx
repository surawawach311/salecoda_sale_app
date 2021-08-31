import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Paragraph2Props {
  style?: StyleProp<TextStyle>
}

const Paragraph2: React.FC<Paragraph2Props> = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'THSarabun', fontSize: 12 }, style]}>{children}</Text>
}
export default Paragraph2
