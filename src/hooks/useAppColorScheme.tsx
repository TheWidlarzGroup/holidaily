import { useState, useEffect } from 'react'
import { ColorSchemeName } from 'react-native'

export type ColorScheme = ColorSchemeName | 'device'
export type ColorSchemeSetter = () => void

let globalColorScheme: ColorScheme = 'device'
const listeners = new Set<ColorSchemeSetter>()

const setGlobalColorScheme = (nextColorScheme: ColorScheme) => {
  globalColorScheme = nextColorScheme
  listeners.forEach((listener) => listener())
}

export const useAppColorScheme = (): [ColorScheme, typeof setGlobalColorScheme] => {
  // TODO: Persist chosen colorScheme and retrieve from storage
  const [state, setState] = useState<ColorScheme>(globalColorScheme)

  useEffect(() => {
    const listener = () => setState(globalColorScheme)
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [state])

  return [state, setGlobalColorScheme]
}
