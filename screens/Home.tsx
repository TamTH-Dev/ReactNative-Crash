import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

import { COLORS } from '../constants'
import { currentLocation, categoryData, restaurantData } from '../__mock__/home'
import { ICategory, ILocation, IRestaurant } from '../types'

const Home = () => {
  const categories = useMemo<Array<ICategory>>(() => categoryData, [])
  const location = useMemo<ILocation>(() => currentLocation, [])
  const [restaurants, setRestaurants] = useState<Array<IRestaurant>>([])

  return <SafeAreaView style={styles.container}></SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
})

export default Home
