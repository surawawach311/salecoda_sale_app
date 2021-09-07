import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Text1Props {
  style?: StyleProp<TextStyle>
  numberOfLines?: number
}

const Text1: React.FC<Text1Props> = ({ style, children, numberOfLines }) => {
  return (
    <Text numberOfLines={numberOfLines} style={[{ fontFamily: 'NotoSansThaiMedium', fontSize: 16 }, style]}>
      {children}
    </Text>
  )
}
export default Text1
