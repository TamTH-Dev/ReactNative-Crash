import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'

import {
  Map,
  DestinationHeader,
  DeliveryInfo,
  Buttons,
} from '../components/order-delivery'
import { IRootStackNavigatorParams } from '../types'

export default function OrderDelivery({
  route,
  navigation,
}: {
  route: RouteProp<IRootStackNavigatorParams, 'OrderDelivery'>
  navigation: StackNavigationProp<IRootStackNavigatorParams, 'OrderDelivery'>
}) {
  return (
    <View style={{ flex: 1 }}>
      <Map />
      <DestinationHeader />
      <DeliveryInfo />
      <Buttons />
    </View>
  )
}
