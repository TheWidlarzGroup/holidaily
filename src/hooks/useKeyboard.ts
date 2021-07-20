import { useCallback, useEffect, useState } from 'react'
import { Keyboard, KeyboardEvent } from 'react-native'

export const useKeyboard = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [keyboardEvent, setKeyboardEvent] = useState<KeyboardEvent | null>(null)

  const onOpenKeyboard = useCallback((event: KeyboardEvent) => {
    setKeyboardEvent(event)
    setKeyboardOpen(true)
  }, [])
  const onHideKeyboard = useCallback((event: KeyboardEvent) => {
    setKeyboardEvent(event)
    setKeyboardOpen(false)
  }, [])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onOpenKeyboard)
    Keyboard.addListener('keyboardWillShow', onOpenKeyboard)
    Keyboard.addListener('keyboardDidHide', onHideKeyboard)
    Keyboard.addListener('keyboardWillHide', onHideKeyboard)

    return () => {
      Keyboard.removeListener('keyboardDidShow', onOpenKeyboard)
      Keyboard.removeListener('keyboardWillShow', onOpenKeyboard)
      Keyboard.removeListener('keyboardDidHide', onHideKeyboard)
      Keyboard.removeListener('keyboardWillHide', onHideKeyboard)
    }
  }, [onOpenKeyboard, onHideKeyboard])

  return [keyboardOpen, keyboardEvent]
}
