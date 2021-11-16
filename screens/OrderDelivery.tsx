import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps'

import {
  Map,
  DestinationHeader,
  DeliveryInfo,
  Buttons,
} from '../components/order-delivery'
import {
  IBottomTabNavigatorParams,
  IGps,
  IRegion,
  IRestaurant,
  IRootStackNavigatorParams,
} from '../types'

export default function OrderDelivery({
  route,
  navigation,
}: {
  route: RouteProp<IRootStackNavigatorParams, 'OrderDelivery'>
  navigation: CompositeNavigationProp<
    StackNavigationProp<IBottomTabNavigatorParams, 'Home'>,
    StackNavigationProp<IRootStackNavigatorParams>
  >
}) {
  const mapView = useRef<MapView | null>(null)
  const [restaurant, setRestaurant] = React.useState<IRestaurant | null>(null)
  const [fromLocation, setFromLocation] = useState<IGps | null>(null)
  const [toLocation, setToLocation] = useState<IGps | null>(null)
  const [region, setRegion] = useState<IRegion | null>(null)
  const [angle, setAngle] = useState<number>(0)
  const [duration, setDuration] = useState(0)
  const [isReady, setIsReady] = useState<boolean>(false)
  const [streetName, setStreetName] = useState('')

  React.useEffect(() => {
    let { restaurant, currentLocation } = route.params

    let fromLoc = currentLocation!.gps
    let street = currentLocation!.streetName
    let toLoc = restaurant.location

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    }

    setRestaurant(restaurant)
    setStreetName(street)
    setFromLocation(fromLoc)
    setToLocation(toLoc)
    setRegion(mapRegion)
  }, [])

  function calculateAngle(coordinates: Array<IGps>) {
    let startLat = coordinates[0]['latitude']
    let startLng = coordinates[0]['longitude']
    let endLat = coordinates[1]['latitude']
    let endLng = coordinates[1]['longitude']
    let dx = endLat - startLat
    let dy = endLng - startLng

    return (Math.atan2(dy, dx) * 180) / Math.PI
  }

  function zoomIn() {
    if (!region) return

    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta! / 2,
      longitudeDelta: region.longitudeDelta! / 2,
    }

    setRegion(newRegion)
    mapView?.current?.animateToRegion(newRegion, 200)
  }

  function zoomOut() {
    if (!region) return

    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta! * 2,
      longitudeDelta: region.longitudeDelta! * 2,
    }

    setRegion(newRegion)
    mapView?.current?.animateToRegion(newRegion, 200)
  }

  return (
    <View style={{ flex: 1 }}>
      <Map
        ref={mapView}
        fromLocation={fromLocation!}
        toLocation={toLocation!}
        region={region!}
        angle={angle}
        calculateAngle={calculateAngle}
        isReady={isReady}
        setIsReady={setIsReady}
        setAngle={setAngle}
        setDuration={setDuration}
        setFromLocation={setFromLocation}
      />
      <DestinationHeader streetName={streetName} duration={duration} />
      <DeliveryInfo restaurant={restaurant} navigation={navigation} />
      <Buttons zoomIn={zoomIn} zoomOut={zoomOut} />
    </View>
  )
}
