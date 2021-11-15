import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, View, TouchableOpacity, Image } from 'react-native'

import { icons, COLORS, SIZES, FONTS } from '../../constants'
import { IRestaurant, ILocation, IRootStackNavigatorParams } from '../../types'

export default function Order({
  restaurant,
  currentLocation,
  navigation,
  getBasketItemCount,
  sumOrder,
}: {
  restaurant: IRestaurant
  currentLocation: ILocation | null
  navigation: StackNavigationProp<IRootStackNavigatorParams>
  getBasketItemCount: () => number
  sumOrder: () => string
}) {
  return (
    <View>
      <View
        style={{
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
            borderBottomColor: COLORS.lightGray2,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>
            {getBasketItemCount()} items in Cart
          </Text>
          <Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.pin}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.darkgray,
              }}
            />
            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
              Location
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.master_card}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.darkgray,
              }}
            />
            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
          </View>
        </View>

        <View
          style={{
            padding: SIZES.padding * 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.9,
              padding: SIZES.padding,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              borderRadius: SIZES.radius,
            }}
            onPress={() =>
              navigation.navigate('OrderDelivery', {
                restaurant,
                currentLocation,
              })
            }
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
