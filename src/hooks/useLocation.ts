import { useCallback } from 'react'
import Geo, { GeoPosition } from 'react-native-geolocation-service'

type Maybe<T> = T | null

type UseLocationReturnType = [() => Promise<Maybe<GeoPosition>>]

export const useLocation = (options?: Geo.GeoOptions): UseLocationReturnType => {
  const requestLocation = useCallback(async (): Promise<Maybe<GeoPosition>> => {
    const permissionStatus = await Geo.requestAuthorization('whenInUse')
    if (permissionStatus !== 'granted') return null
    return new Promise((resolve) => {
      Geo.getCurrentPosition(
        (position) => {
          console.log(position)
          resolve(position)
        },
        (error) => {
          console.log(error)
          return resolve(null)
        },
        {
          ...defaultOptions,
          ...options,
        }
      )
    })
  }, [options])

  return [requestLocation]
}

const defaultOptions: Partial<Geo.GeoOptions> = {
  timeout: 1000,
  accuracy: {
    ios: 'hundredMeters',
    android: 'balanced',
  },
}
