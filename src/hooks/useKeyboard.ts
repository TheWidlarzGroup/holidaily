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
    const listener1 = Keyboard.addListener('keyboardDidShow', onOpenKeyboard)
    const listener2 = Keyboard.addListener('keyboardWillShow', onOpenKeyboard)
    const listener3 = Keyboard.addListener('keyboardDidHide', onHideKeyboard)
    const listener4 = Keyboard.addListener('keyboardWillHide', onHideKeyboard)

    return () => {
      listener1.remove()
      listener2.remove()
      listener3.remove()
      listener4.remove()
    }
  }, [onOpenKeyboard, onHideKeyboard])

  return [keyboardOpen, keyboardEvent]
}
