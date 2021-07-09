import { View } from 'native-base'
import React from 'react'
import { Text, Image, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native'

interface Prop {
  itemCount?: number
  onPress?: () => void
  style?: ViewStyle
  theme?: 'light' | 'dark'
}

const MiniCart: React.FC<Prop> = ({ itemCount, onPress, style, theme }) => {
  const mTheme = theme ? theme : 'light'
  return (
    <TouchableOpacity style={[{ padding: 16 }, style]} onPress={onPress} disabled={!onPress}>
      <View>
        {mTheme === 'dark' ? (
          <Image style={styles.iconImage} source={require('../../assets/shopping-cart.png')} />
        ) : (
          <Image style={styles.iconImage} source={require('../../assets/shopping-cart.png')} />
        )}
        <View style={mTheme === 'dark' ? styles.darkBadge : styles.lightBadge}>
          <Text style={mTheme === 'dark' ? styles.darkBadgeText : styles.lightBadgeText}>
            {itemCount ? itemCount : 0}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MiniCart

const styles = StyleSheet.create({
  iconImage: { width: 24, height: 24, resizeMode: 'contain' },
  lightBadge: {
    backgroundColor: '#4C95FF',
    minWidth: 20,
    height: 20,
    position: 'absolute',
    top: -10,
    right: -4,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  lightBadgeText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold' },
  darkBadge: {
    backgroundColor: '#FFF',
    minWidth: 20,
    height: 20,
    position: 'absolute',
    top: -6,
    right: -6,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: '#4C95FF',
  },
  darkBadgeText: { color: '#4C95FF', textAlign: 'center', fontWeight: 'bold' },
})
