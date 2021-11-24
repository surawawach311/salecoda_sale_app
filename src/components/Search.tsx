import React from 'react'
import {
  StyleSheet,
  TextInput,
  Image,
  View,
} from 'react-native'

interface SearchProps {
  placeholder?: string
  onChange?: (text: string) => void
}

const Search: React.FC<SearchProps> = ({ placeholder, onChange }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/search.png')} />
      <TextInput
        style={{ fontFamily: 'NotoSansThaiMedium', fontSize: 16, flex: 1 }}
        placeholder={placeholder ? placeholder : ''}
        onChangeText={onChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EBEFF2',
    padding: 15,
    margin: 10,
    flexDirection: 'row',
  },
  placeholder: {
    color: '#6B7995',
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
})

export default Search
