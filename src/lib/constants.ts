export const locale = 'ro_RO'

export const CHECK_IN_PRICE = 8.99

export interface Location {
  key: number
  city: string
  code: string
  country: string
  cityId: string
}

export interface SearchFields {
  fly_from: Location
  fly_to: Location
  date_from: string
  return_to: string
  adults: number
  children: number
  infants: number
  phone?: string
}

export const searchFields: SearchFields = {
  fly_from: {
    key: 0,
    city: '',
    code: '',
    country: '',
    cityId: '',
  },
  fly_to: {
    key: 0,
    city: '',
    code: '',
    country: '',
    cityId: '',
  },
  date_from: '',
  return_to: '',
  adults: 1,
  children: 0,
  infants: 0,
}
