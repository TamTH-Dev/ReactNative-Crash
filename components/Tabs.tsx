import React, { ComponentType, FC, ReactNode, MouseEvent } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  AccessibilityState,
  GestureResponderEvent,
} from 'react-native'
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
  BottomTabBarProps,
  BottomTabBar,
} from '@react-navigation/bottom-tabs'
import Svg, { Path } from 'react-native-svg'
import { isIphoneX } from 'react-native-iphone-x-helper'

import { Home } from '../screens'
import { COLORS, icons } from '../constants'

const Tab = createBottomTabNavigator()

const TabBarCustomButton: FC<{
  accessibilityState?: AccessibilityState
  onPress?: (
    e: GestureResponderEvent | MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void
  children: ReactNode
}> = ({ accessibilityState, children, onPress }) => {
  const isSelected = accessibilityState?.selected
  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
          <Svg width={70} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
        </View>
        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 60,
        backgroundColor: COLORS.white,
      }}
      activeOpacity={1}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}

const CustomTabBar: FC<{ props: BottomTabBarProps }> = ({ props }) => {
  if (!isIphoneX()) {
    return <BottomTabBar {...props} />
  }
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
          backgroundColor: COLORS.white,
        }}
      ></View>
      <BottomTabBar {...props} />
    </View>
  )
}

export default function Tabs() {
  const tabs: Array<{
    name: string
    component: ComponentType
    icon: string
  }> = [
    {
      name: 'Home',
      component: Home,
      icon: 'cutlery',
    },
    {
      name: 'Search',
      component: Home,
      icon: 'search',
    },
    {
      name: 'Like',
      component: Home,
      icon: 'like',
    },
    {
      name: 'User',
      component: Home,
      icon: 'user',
    },
  ]

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
      tabBar={(props: BottomTabBarProps) => <CustomTabBar props={props} />}
    >
      {tabs.map(({ name, component, icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={(icons as { [key: string]: any })[icon]}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.secondary,
                }}
              />
            ),
            tabBarButton: (props: BottomTabBarButtonProps) => (
              <TabBarCustomButton {...props}></TabBarCustomButton>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  )
}
