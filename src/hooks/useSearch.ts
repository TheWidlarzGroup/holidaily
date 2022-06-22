import { LocationGeocodedAddress } from 'expo-location'
import { useCallback, useState } from 'react'
import { useDebouncedCallback } from './useDebounce'
import { CompoundLocation } from './useLocation'

type UseSearchProps = {
  onQueryChange: F1<string, Promise<CompoundLocation[]>>
  onClear?: F0
  query?: string
  delay?: number
}

export const useSearch = (props: UseSearchProps) => {
  const { onQueryChange, onClear } = props
  const [query, setQuery] = useState(props.query || '')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<LocationGeocodedAddress | null>(null)
  const [error, setError] = useState<unknown>()

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
      const locationData = await onQueryChange(query)
      setData(locationData[0]?.addresses[0])
    } catch (error) {
      setData(null)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [onQueryChange, query])

  useDebouncedCallback(handleQueryCallback, props.delay)

  return { query, setQuery, loading, data, error, clearSearch }
}
