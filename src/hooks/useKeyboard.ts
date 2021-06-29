import { useCallback, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export const useKeyboard = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false)

  const onOpenKeyboard = useCallback(() => setKeyboardOpen(true), [])
  const onHideKeyboard = useCallback(() => setKeyboardOpen(false), [])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onOpenKeyboard)
    Keyboard.addListener('keyboardWillShow', onOpenKeyboard)
    Keyboard.addListener('keyboardDidHide', onHideKeyboard)
    Keyboard.removeListener('keyboardWillHide', onHideKeyboard)

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', onOpenKeyboard)
      Keyboard.addListener('keyboardWillShow', onOpenKeyboard)
      Keyboard.removeListener('keyboardDidHide', onHideKeyboard)
      Keyboard.removeListener('keyboardWillHide', onHideKeyboard)
    }
  }, [onOpenKeyboard, onHideKeyboard])

  return [keyboardOpen]
}
