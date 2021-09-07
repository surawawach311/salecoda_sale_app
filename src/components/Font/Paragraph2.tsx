import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Paragraph2Props {
  style?: StyleProp<TextStyle>
  numberOfLines?: number
}

const Paragraph2: React.FC<Paragraph2Props> = ({ style, children, numberOfLines }) => {
  return (
    <Text style={[{ fontFamily: 'THSarabun', fontSize: 12, fontWeight: '400' }, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  )
}
export default Paragraph2
