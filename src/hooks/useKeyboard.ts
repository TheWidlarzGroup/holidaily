import { useCallback, useEffect, useRef, useState } from 'react'
import { EmitterSubscription, Keyboard, KeyboardEvent } from 'react-native'

export const useKeyboard = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [keyboardEvent, setKeyboardEvent] = useState<KeyboardEvent | null>(null)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height)
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0)
  }

  const willMount = useRef(true)

  const onOpenKeyboard = useCallback((event: KeyboardEvent) => {
    setKeyboardEvent(event)
    setKeyboardOpen(true)
  }, [])

  const onHideKeyboard = useCallback((event: KeyboardEvent) => {
    setKeyboardEvent(event)
    setKeyboardOpen(false)
  }, [])

  useEffect(() => {
    let keyboardDidShow
    let keyboardDidHide

    if (willMount.current) {
      keyboardDidShow = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
      keyboardDidHide = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide)
      willMount.current = false
    }
    const listener1 = Keyboard.addListener('keyboardDidShow', onOpenKeyboard)
    const listener2 = Keyboard.addListener('keyboardWillShow', onOpenKeyboard)
    const listener3 = Keyboard.addListener('keyboardDidHide', onHideKeyboard)
    const listener4 = Keyboard.addListener('keyboardWillHide', onHideKeyboard)

    return () => {
      listener1.remove()
      listener2.remove()
      listener3.remove()
      listener4.remove()

      keyboardDidShow?.remove('keyboardDidShow', onKeyboardDidShow)
      keyboardDidHide?.remove('keyboardDidHide', onKeyboardDidHide)
    }
  }, [onOpenKeyboard, onHideKeyboard])

  return { keyboardOpen, keyboardEvent, keyboardHeight }
}
