import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'

import { SIZES, FONTS, COLORS } from '../../constants'
import { ICategory } from '../../types'

function MainCategoryRenderItem({
  item,
  onSelectCategory,
  selectedCategory,
}: {
  item: ICategory
  onSelectCategory: (item: ICategory) => void
  selectedCategory: ICategory | null
}) {
  return (
    <TouchableOpacity
      style={{
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        backgroundColor:
          selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.padding,
        ...styles.shadow,
      }}
      onPress={() => onSelectCategory(item)}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            selectedCategory?.id == item.id ? COLORS.white : COLORS.lightGray,
        }}
      >
        <Image
          source={item.icon}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </View>

      <Text
        style={{
          marginTop: SIZES.padding,
          color: selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
          ...FONTS.body5,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}

export default function MainCategories({
  categories,
  onSelectCategory,
  selectedCategory,
}: {
  categories: Array<ICategory>
  onSelectCategory: (category: ICategory) => void
  selectedCategory: ICategory | null
}) {
  return (
    <View style={{ padding: SIZES.padding * 2 }}>
      <Text style={{ ...FONTS.h2 }}>Main Categories</Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <MainCategoryRenderItem
            item={item}
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
          />
        )}
        contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
      />
    </View>
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
