import React, { FC } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'

import { icons, SIZES, COLORS, FONTS } from '../../constants'
import { ILocation } from 'types'

const Header: FC<{ currentLocation: ILocation }> = ({ currentLocation }) => {
  return (
    <View style={{ flexDirection: 'row', height: 50 }}>
      <TouchableOpacity
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: 'center',
        }}
      >
        <Image
          source={icons.nearby}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            width: '70%',
            height: '80%',
            backgroundColor: COLORS.lightGray3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
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
          source={icons.basket}
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

export default Header
