import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Text2Props {
  style?: StyleProp<TextStyle>
  numberOfLines?: number
}

const Text2: React.FC<Text2Props> = ({ style, children, numberOfLines }) => {
  return (
    <Text numberOfLines={numberOfLines} style={[{ fontFamily: 'NotoSansThaiMedium', fontSize: 12 }, style]}>
      {children}
    </Text>
  )
}
export default Text2
