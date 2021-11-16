import { ImageSourcePropType } from 'react-native'

export interface ICategory {
  id: number
  name: string
  icon: ImageSourcePropType
}

export interface IGps {
  latitude: number
  longitude: number
}

export interface IRegion extends IGps {
  latitudeDelta: number
  longitudeDelta: number
}

export interface ILocation {
  streetName: string
  gps: IGps
}

export interface IMenuItem {
  menuId: number
  name: string
  photo: ImageSourcePropType
  description: string
  calories: number
  price: number
}

export interface IRestaurant {
  id: number
  name: string
  rating: number
  categories: Array<number>
  priceRating: number
  photo: ImageSourcePropType
  duration: string
  location: {
    latitude: number
    longitude: number
  }
  courier: {
    avatar: ImageSourcePropType
    name: string
  }
  menu: Array<IMenuItem>
}

export type IRootStackNavigatorParams = {
  Tabs: undefined
  Restaurant: {
    item: IRestaurant
    currentLocation: ILocation
  }
  OrderDelivery: {
    restaurant: IRestaurant
    currentLocation: ILocation | null
  }
}

export type IBottomTabNavigatorParams = {
  Home: undefined
  Search: undefined
  Like: undefined
  User: undefined
}
