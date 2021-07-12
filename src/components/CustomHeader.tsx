import React from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, ViewProps } from 'react-native'

interface Prop {
  title?: string
  showBackBtn?: boolean
  onPressBack?: () => void
  headerRight?: () => JSX.Element
  headerLeft?: () => JSX.Element
  style?: ViewProps
}

const CustomHeader: React.FC<Prop> = ({ style, title, showBackBtn, onPressBack, headerLeft, headerRight }) => {
  return (
    <SafeAreaView style={[styles.headerSafeArea, style]}>
      <View style={styles.headerWraper}>
        <View style={styles.headerLeftWrapper}>
          {showBackBtn && (
            <TouchableOpacity style={{ flex: 1, padding: 16 }} onPress={onPressBack}>
              <Image
                style={{ width: 10, height: 18, resizeMode: 'contain' }}
                source={require('../../assets/left.png')}
              />
            </TouchableOpacity>
          )}
          {headerLeft?.()}
        </View>
        <View style={styles.headerTitleWraper}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.headerRightWrapper}>{headerRight?.()}</View>
      </View>
    </SafeAreaView>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  headerSafeArea: {
    backgroundColor: '#FFF',
    paddingTop: StatusBar.currentHeight,
  },
  headerWraper: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 54,
  },
  headerTitleWraper: {
    flex: 2,
    justifyContent: 'center',
  },
  headerLeftWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightWrapper: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
