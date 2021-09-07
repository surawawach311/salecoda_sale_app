import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Heading3Props {
  style?: StyleProp<TextStyle>
  numberOfLines?:number
}

const Heading3: React.FC<Heading3Props> = ({ style,numberOfLines, children }) => {
  return <Text style={[{ fontFamily: 'NotoSansThaiBold', fontSize: 16 }, style]} numberOfLines={numberOfLines}>{children}</Text>
}
export default Heading3
