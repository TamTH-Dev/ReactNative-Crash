export interface ICategory {
  id: number
  name: string
  icon: string
}

export interface ILocation {
  streetName: string
  gps: {
    latitude: number
    longitude: number
  }
}

export interface IRestaurant {
  id: number
  name: string
  rating: number
  categories: Array<number>
  priceRating: number
  photo: string
  duration: string
  location: {
    latitude: string
    longitude: string
  }
  courier: {
    avatar: string
    name: string
  }
  menu: Array<{
    menuId: number
    name: string
    photo: string
    description: string
    calories: number
    price: number
  }>
}
