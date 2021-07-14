import { useState, useEffect } from 'react'
import { ColorSchemeName, Appearance } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLOR_SCHEME } from 'utils/storage/asyncStorageKeys'

export type ColorScheme = NonNullable<ColorSchemeName> | 'device'
export type ColorSchemeSetter = () => void

let globalColorScheme: ColorScheme = Appearance.getColorScheme() ?? 'device'
const listeners = new Set<ColorSchemeSetter>()

const setGlobalColorScheme = async (nextColorScheme: ColorScheme) => {
  const settledColorScheme = nextColorScheme ?? 'device'
  await AsyncStorage.setItem(COLOR_SCHEME, settledColorScheme)
  globalColorScheme = settledColorScheme
  listeners.forEach((listener) => listener())
}

export const useAppColorScheme = (): [ColorScheme, typeof setGlobalColorScheme] => {
  const [state, setState] = useState<ColorScheme>(globalColorScheme)

  useEffect(() => {
    const listener = () => setState(globalColorScheme)
    listeners.add(listener)
    listener()
    return () => {
      listeners.delete(listener)
    }
  }, [state])

  return [getColorScheme(state), setGlobalColorScheme]
}

export const useInitColorScheme = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      // TODO: I'd really like to make typed AS getters/setters
      const theme = (await AsyncStorage.getItem(COLOR_SCHEME)) as ColorScheme
      setGlobalColorScheme(theme)
    })()
  }, [])
  return useAppColorScheme()
}

const getColorScheme = (colorScheme: ColorScheme) =>
  colorScheme === 'device' ? Appearance.getColorScheme() ?? 'light' : colorScheme
