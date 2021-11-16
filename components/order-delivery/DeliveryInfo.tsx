import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp } from '@react-navigation/native'

import {
  IBottomTabNavigatorParams,
  IRestaurant,
  IRootStackNavigatorParams,
} from '../../types'
import { icons, SIZES, COLORS, FONTS } from '../../constants'

export default function DeliveryInfo({
  restaurant,
  navigation,
}: {
  restaurant: IRestaurant | null
  navigation: CompositeNavigationProp<
    StackNavigationProp<IBottomTabNavigatorParams, 'Home'>,
    StackNavigationProp<IRootStackNavigatorParams>
  >
}) {
  if (!restaurant) return <Text></Text>

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: SIZES.width * 0.9,
          paddingVertical: SIZES.padding * 3,
          paddingHorizontal: SIZES.padding * 2,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={restaurant.courier.avatar}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          />

          <View style={{ flex: 1, marginLeft: SIZES.padding }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={icons.star}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: COLORS.primary,
                    marginRight: SIZES.padding,
                  }}
                />
                <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
              </View>
            </View>
            <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
              {restaurant?.name}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding * 2,
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              height: 50,
              marginRight: 10,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              height: 50,
              backgroundColor: COLORS.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
