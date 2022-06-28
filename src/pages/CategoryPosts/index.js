import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function CategoryPosts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts de uma categoria</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 24
  }
})