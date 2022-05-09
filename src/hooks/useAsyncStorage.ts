import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAsyncStorage = (
  key: string,
  initialValue: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [storedValue, setStoredValue] = useState(initialValue)
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => {
        if (value === null) {
          return initialValue
        }
        return JSON.parse(value)
      })
      .then(setStoredValue)
  }, [key, initialValue])

  const setValue = (value: SetStateAction<string>) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(value)
    AsyncStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [storedValue, setValue]
}
