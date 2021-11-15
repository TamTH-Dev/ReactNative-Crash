import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Tabs from './components/Tabs'
import { Restaurant, OrderDelivery } from './screens'
import { IRootStackNavigatorParams } from './types'

const Stack = createStackNavigator<IRootStackNavigatorParams>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Tabs"
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
