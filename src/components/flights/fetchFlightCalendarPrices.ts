'use server'

import axios from 'axios'

// Define types for the function parameters
type Source = {
  ids: string[]
}

type Destination = {
  ids: string[]
}

type Dates = {
  start: string
  end?: string
}

type Passengers = {
  adults: number
  children: number
  infants: number
  adultsHoldBags: number[]
  adultsHandBags: number[]
  childrenHoldBags: number[]
  childrenHandBags: number[]
}

// Define the return type for the API response
export type CalendarPrice = {
  date: string
  ratedPrice: {
    price: {
      amount: number
    }
    rating: number
  }
}

type ApiResponse = {
  data: {
    itineraryPricesCalendar:
      | {
          calendar: CalendarPrice[]
        }
      | {
          error: string
        }
  }
}

// Create the main function to fetch flight calendar prices
export async function fetchFlightCalendarPrices(
  source: Source,
  destination: Destination,
  dates: Dates,
  passengers: Passengers
): Promise<CalendarPrice[] | null> {
  const endpoint =
    'https://api.skypicker.com/umbrella/v2/graphql?featureName=CalendarPricesFetcherQuery'

  const query = `
    query CalendarPricesFetcherQuery(
      $search: SearchPricesCalendarInput
      $filter: ItinerariesFilterInput
      $options: ItinerariesOptionsInput
    ) {
      itineraryPricesCalendar(search: $search, filter: $filter, options: $options) {
        __typename
        ... on ItineraryPricesCalendar {
          calendar {
            date
            ratedPrice {
              price {
                amount
              }
              rating
            }
          }
        }
        ... on AppError {
          error: message
        }
      }
    }
  `

  const variables = {
    search: {
      source,
      destination,
      dates,
      passengers,
      cabinClass: {
        cabinClass: 'ECONOMY',
        applyMixedClasses: false,
      },
    },
    filter: {
      allowChangeInboundDestination: true,
      allowChangeInboundSource: true,
      allowDifferentStationConnection: true,
      enableSelfTransfer: true,
      enableThrowAwayTicketing: true,
      enableTrueHiddenCity: true,
      transportTypes: ['FLIGHT'],
      contentProviders: ['KIWI'],
      flightsApiLimit: 1,
    },
    options: {
      sortBy: 'PRICE',
      mergePriceDiffRule: 'INCREASED',
      currency: 'eur',
      userEmail: 'antonio21213@gmail.com',
      apiUrl: null,
      locale: 'en',
      market: 'md',
      partner: 'skypicker',
      partnerMarket: 'md',
      affilID: 'crm',
      storeSearch: false,
      searchStrategy: 'REDUCED',
      abTestInput: {
        kiwiGuaranteeABTest: 'ENABLE',
        kiwiGuaranteeEsABTest: 'DISABLE',
      },
    },
  }

  try {
    const response = await axios.post<ApiResponse>(
      endpoint,
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const result = response.data.data.itineraryPricesCalendar
    if ('calendar' in result) {
      return result.calendar
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching flight calendar prices:', error)
    return null
  }
}
