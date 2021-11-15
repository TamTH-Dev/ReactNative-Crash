import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, Animated } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { Header, FoodInfo, Order } from '../components/restaurant'
import { COLORS } from '../constants'
import { ILocation, IRestaurant, IRootStackNavigatorParams } from '../types'

export default function Restaurant({
  route,
  navigation,
}: {
  route: RouteProp<IRootStackNavigatorParams, 'Restaurant'>
  navigation: StackNavigationProp<IRootStackNavigatorParams, 'Restaurant'>
}) {
  const scrollX = new Animated.Value(0)
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null)
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(null)
  const [orderItems, setOrderItems] = useState<
    Array<{
      menuId: number
      qty: number
      total: number
      price: number
    }>
  >([])

  useEffect(() => {
    let { item, currentLocation } = route.params

    setRestaurant(item)
    setCurrentLocation(currentLocation)
  }, [])

  function getOrderQty(menuId: number) {
    let orderItem = orderItems.filter(a => a.menuId == menuId)

    if (orderItem.length === 0) return 0

    return orderItem[0].qty
  }

  function editOrder(action: string, menuId: number, price: number) {
    let orderList = [...orderItems]
    let item = orderList.filter(a => a.menuId == menuId)

    if (action === '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1
        item[0].qty = newQty
        item[0].total = item[0].qty * price
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        }
        orderList.push(newItem)
      }
    } else {
      if (item.length > 0 && item[0]?.qty > 0) {
        let newQty = item[0].qty - 1
        item[0].qty = newQty
        item[0].total = newQty * price
      }
    }

    setOrderItems(orderList)
  }

  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)
    return itemCount
  }

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)
    return total.toFixed(2)
  }

  if (!restaurant) return <View></View>

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} restaurantName={restaurant.name} />
      <FoodInfo
        restaurant={restaurant}
        scrollX={scrollX}
        getOrderQty={getOrderQty}
        editOrder={editOrder}
      />
      <Order
        sumOrder={sumOrder}
        getBasketItemCount={getBasketItemCount}
        restaurant={restaurant}
        currentLocation={currentLocation}
        navigation={navigation}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
})
