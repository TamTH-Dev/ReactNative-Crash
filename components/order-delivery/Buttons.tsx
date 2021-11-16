import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { COLORS, FONTS, SIZES } from '../../constants'

export default function Buttons({
  zoomIn,
  zoomOut,
}: {
  zoomIn: () => void
  zoomOut: () => void
}) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: SIZES.height * 0.35,
        right: SIZES.padding * 2,
        width: 60,
        height: 130,
        justifyContent: 'space-between',
      }}
    >
      {/* Zoom In */}
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => zoomIn()}
      >
        <Text style={{ ...FONTS.body1 }}>+</Text>
      </TouchableOpacity>

      {/* Zoom Out */}
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => zoomOut()}
      >
        <Text style={{ ...FONTS.body1 }}>-</Text>
      </TouchableOpacity>
    </View>
  )
}
