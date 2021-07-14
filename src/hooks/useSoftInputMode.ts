import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { isAndroid } from 'utils/layout'
import SoftInputMode, { SoftInputModes, defaultInputMode } from '../modules/SoftInputMode'

export const useSoftInputMode = (mode: SoftInputModes) => {
  const { addListener } = useNavigation()
  useEffect(() => {
    const handleFocus = () => isAndroid && SoftInputMode.set(mode)
    const handleBlur = () => isAndroid && SoftInputMode.set(defaultInputMode)
    const removeFocusListener = addListener('focus', handleFocus)
    const removeBlurListener = addListener('blur', handleBlur)
    return () => {
      removeBlurListener()
      removeFocusListener()
    }
  }, [addListener, mode])
}

export { SoftInputModes }
