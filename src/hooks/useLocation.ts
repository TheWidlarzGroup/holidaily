/* eslint-disable no-continue */
import { useCallback, useMemo } from 'react'
import {
  geocodeAsync,
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  getLastKnownPositionAsync,
  LocationAccuracy,
  LocationGeocodedAddress,
  LocationGeocodedLocation,
  LocationLastKnownOptions,
  LocationObject,
  LocationOptions,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
  PermissionStatus,
  hasServicesEnabledAsync,
  enableNetworkProviderAsync,
} from 'expo-location'

export type UseLocationProps = {
  lastKnownLocationOptions?: LocationLastKnownOptions
  currentKnownLocationOptions?: LocationOptions
}
export type CompoundLocation = {
  position: Maybe<LocationGeocodedLocation>
  addresses: LocationGeocodedAddress[]
}

const cachedLocations: Map<string, Maybe<LocationGeocodedAddress[]>> = new Map()

export const useLocation = (options?: UseLocationProps) => {
  const lastLocationOptions = useMemo(
    () => ({
      ...defaultLastLocationOptions,
      ...(options?.lastKnownLocationOptions || {}),
    }),
    [options]
  )

  const currentLocationOptions = useMemo(
    () => ({
      ...defaultCurrentLocationOptions,
      ...(options?.currentKnownLocationOptions || {}),
    }),
    [options]
  )

  const requestForegroundPermission = useCallback(async () => {
    const isLocationEnabled = await hasServicesEnabledAsync()
    if (!isLocationEnabled) await enableNetworkProviderAsync().catch((err) => console.log(err))

    const permission = await getForegroundPermissionsAsync()
    if (__DEV__) console.log(permission)

    if (permission.status !== PermissionStatus.GRANTED && permission.canAskAgain)
      return requestForegroundPermissionsAsync()

    return permission
  }, [])

  const requestPosition = useCallback(async () => {
    const permission = await requestForegroundPermission()
    if (permission.status !== PermissionStatus.GRANTED) return null

    const lastLocation = await getLastKnownPositionAsync(lastLocationOptions)
    if (lastLocation) return lastLocation

    const currentLocation = await getCurrentPositionAsync(currentLocationOptions)
    return currentLocation
  }, [requestForegroundPermission, lastLocationOptions, currentLocationOptions])

  const requestLocation = useCallback(async (): Promise<Maybe<CompoundLocation>> => {
    const dynamicPosition = await requestPosition()
    if (!dynamicPosition) return null

    const position = makeGeocodedPosition(dynamicPosition)

    const locationKey = makeLocationKey(position)
    const addressesFromCache = cachedLocations.get(locationKey)
    if (addressesFromCache) return { position, addresses: addressesFromCache }

    const addresses = await reverseGeocodeAsync(position)
    cachedLocations.set(locationKey, addresses)

    return { position, addresses }
  }, [requestPosition])

  const requestAddresses = useCallback(async (query: string): Promise<CompoundLocation[]> => {
    const positions = await geocodeAsync(query)

    const combinedAddresses = []

    for (const position of positions) {
      if (!position) continue

      const locationKey = makeLocationKey(position)
      const addressesFromCache = cachedLocations.get(locationKey)

      if (addressesFromCache) {
        combinedAddresses.push({ position, addresses: addressesFromCache })
        continue
      }

      const addresses = await reverseGeocodeAsync(position)
      if (addresses) {
        cachedLocations.set(locationKey, addresses)
        combinedAddresses.push({ position, addresses })
      }
    }

    return combinedAddresses
  }, [])

  return { requestLocation, requestPosition, requestAddresses }
}

const defaultLastLocationOptions: LocationLastKnownOptions = {
  maxAge: 1000 * 60 * 2,
  requiredAccuracy: 50,
}

const defaultCurrentLocationOptions: LocationOptions = {
  accuracy: LocationAccuracy.High,
}

const makeGeocodedPosition = (location: LocationObject) => {
  const { latitude, longitude, altitude, accuracy } = location.coords
  return { latitude, longitude, altitude: altitude || undefined, accuracy: accuracy || undefined }
}

// TODO: Proper key for caching
const makeLocationKey = (location: LocationGeocodedLocation) => {
  const key = Object.entries(location).reduce((result, prop) => result + propToKey(prop), '')
  return key
}

const propToKey = ([key, val]: [string?, number?]) => {
  if (key === undefined || val === undefined) return ''
  return `[${key}:${val}]`
}
