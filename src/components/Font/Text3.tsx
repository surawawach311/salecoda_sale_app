import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'

interface Text3Props {
  style?: StyleProp<TextStyle>
  numberOfLines?: number
}

const Text3: React.FC<Text3Props> = ({ style, children, numberOfLines }) => {
  return (
    <Text numberOfLines={numberOfLines} style={[{ fontFamily: 'NotoSansThaiMedium', fontSize: 12 }, style]}>
      {children}
    </Text>
  )
}
export default Text3
