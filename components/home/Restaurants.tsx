import React, { useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'

import {
  IBottomTabNavigatorParams,
  ICategory,
  ILocation,
  IRestaurant,
  IRootStackNavigatorParams,
} from '../../types'
import { icons, SIZES, FONTS, COLORS } from '../../constants'
import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp } from '@react-navigation/native'

function RestaurantRenderItem({
  item,
  currentLocation,
  navigation,
  getCategoryNameById,
}: {
  item: IRestaurant
  currentLocation: ILocation
  navigation: CompositeNavigationProp<
    StackNavigationProp<IBottomTabNavigatorParams, 'Home'>,
    StackNavigationProp<IRootStackNavigatorParams>
  >
  getCategoryNameById: (id: number) => string
}) {
  return (
    <TouchableOpacity
      style={{ marginBottom: SIZES.padding * 2 }}
      onPress={() =>
        navigation.navigate('Restaurant', {
          item,
          currentLocation,
        })
      }
    >
      <View
        style={{
          marginBottom: SIZES.padding,
        }}
      >
        <Image
          source={item.photo}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: SIZES.radius,
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: SIZES.width * 0.3,
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
        </View>
      </View>

      <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
        }}
      >
        <Image
          source={icons.star}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.primary,
            marginRight: 10,
          }}
        />

        <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          {item.categories.map(categoryId => {
            return (
              <View style={{ flexDirection: 'row' }} key={categoryId}>
                <Text style={{ ...FONTS.body3 }}>
                  {getCategoryNameById(categoryId)}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
              </View>
            )
          })}
          {[1, 2, 3].map(priceRating => (
            <Text
              key={priceRating}
              style={{
                ...FONTS.body3,
                color:
                  priceRating <= item.priceRating
                    ? COLORS.black
                    : COLORS.darkgray,
              }}
            >
              $
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function Restaurants({
  restaurants,
  currentLocation,
  navigation,
  categories,
}: {
  restaurants: Array<IRestaurant>
  currentLocation: ILocation
  navigation: CompositeNavigationProp<
    StackNavigationProp<IBottomTabNavigatorParams, 'Home'>,
    StackNavigationProp<IRootStackNavigatorParams>
  >
  categories: Array<ICategory>
}) {
  const getCategoryNameById = useCallback(
    (id: number) => {
      let category = categories.filter(a => a.id == id)

      if (category.length > 0) return category[0].name

      return ''
    },
    [categories],
  )

  return (
    <FlatList
      data={restaurants}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => (
        <RestaurantRenderItem
          getCategoryNameById={getCategoryNameById}
          item={item}
          currentLocation={currentLocation}
          navigation={navigation}
        />
      )}
      contentContainerStyle={{
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30,
      }}
    />
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
})
