import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, View, TouchableOpacity, Image } from 'react-native'

import { icons, SIZES, COLORS, FONTS } from '../../constants'
import { IRootStackNavigatorParams } from 'types'

export default function Header({
  restaurantName,
  navigation,
}: {
  restaurantName: string
  navigation: StackNavigationProp<IRootStackNavigatorParams, 'Restaurant'>
}) {
  return (
    <View style={{ flexDirection: 'row', height: 50 }}>
      <TouchableOpacity
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: 'center',
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: SIZES.padding * 3,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray3,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>{restaurantName}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: 'center',
        }}
      >
        <Image
          source={icons.list}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  )
}
