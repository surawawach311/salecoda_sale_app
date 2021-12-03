import React, { useEffect, useState } from 'react'
import { View, ViewStyle, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Prop {
  data: { id: string; title: string }[]
  active: string
  style?: ViewStyle
  onPress?: (id: string) => void
}

const TabSwitcher: React.FC<Prop> = ({ data, active, style, onPress }) => {
  return (
    <View style={[{ height: 40, backgroundColor: '#EEEEEF', borderRadius: 8, flexDirection: 'row' }, style]}>
      {data.map((i) => {
        return (
          <TouchableOpacity
            style={[active === i.id ? styles.activeTab : styles.inactiveTab]}
            key={i.id}
            onPress={() => onPress?.(i.id)}
          >
            <Text style={[active === i.id ? styles.activeText : styles.inactiveText]}>{i.title}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default TabSwitcher

const styles = StyleSheet.create({
  activeTab: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  inactiveTab: {
    flex: 1,
    margin: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: { fontSize: 15, fontWeight: 'bold', color: '#616A7B' },
  inactiveText: { fontSize: 15, fontWeight: 'normal', color: '#6B7995' },
})
