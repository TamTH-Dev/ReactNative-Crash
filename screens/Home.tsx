import React, { useMemo, useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp } from '@react-navigation/native'

import { COLORS } from '../constants'
import { categoryData, currentLocation, restaurantData } from '../__mock__/home'
import {
  ICategory,
  ILocation,
  IRestaurant,
  IBottomTabNavigatorParams,
  IRootStackNavigatorParams,
} from '../types'
import { Header, MainCategories, Restaurants } from '../components/home'

const Home = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    StackNavigationProp<IBottomTabNavigatorParams, 'Home'>,
    StackNavigationProp<IRootStackNavigatorParams>
  >
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  )
  const categories = useMemo<Array<ICategory>>(
    () => categoryData,
    [categoryData],
  )
  const location = useMemo<ILocation>(() => currentLocation, [])
  const [restaurants, setRestaurants] =
    useState<Array<IRestaurant>>(restaurantData)

  function onSelectCategory(category: ICategory) {
    let restaurantList = restaurantData.filter(r =>
      r.categories.includes(category.id),
    )

    setRestaurants(restaurantList)

    setSelectedCategory(category)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header currentLocation={location} />
      <MainCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <Restaurants
        navigation={navigation}
        categories={categories}
        currentLocation={currentLocation}
        restaurants={restaurants}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
})

export default Home
