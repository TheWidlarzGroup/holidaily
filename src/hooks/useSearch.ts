// How to manage generic function that can be async or sync?
// onClear?
// TODO: Break it down into two hooks
// TODO: Make reducer out of it
// TODO: add inital handling

import { LocationGeocodedAddress } from 'expo-location'
import { useCallback, useState } from 'react'
import { useDebouncedCallback } from './useDebounce'

type UseSearchProps<T> = {
  onQueryChange: F1<string, Promise<T>>
  onClear?: F0
  query?: string
  delay?: number
}

export const useSearch = <T>(props: UseSearchProps<T>) => {
  const { onQueryChange, onClear } = props
  const [query, setQuery] = useState(props.query || '')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<LocationGeocodedAddress | null>(null)
  const [error, setError] = useState(null)

  const clearSearch = useCallback(() => {
    onClear?.()
    setQuery('')
    setData(null)
    setError(null)
  }, [onClear])

  const handleQueryCallback = useCallback(async () => {
    if (query === '') return
    setLoading(true)
    try {
      const locData = await onQueryChange(query)
      setData(locData[0]?.addresses[0])
    } catch (error) {
      setData(null)
      // setError(error) FIXME
    } finally {
      setLoading(false)
    }
  }, [onQueryChange, query])

  useDebouncedCallback(handleQueryCallback, props.delay)

  return { query, setQuery, loading, data, error, clearSearch }
}
