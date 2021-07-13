import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { isIos } from 'utils/layout'
import SoftInputMode, { SoftInputModes, defaultInputMode } from '../modules/SoftInputMode'

export const useSoftInputMode = (mode: SoftInputModes) => {
  const { addListener } = useNavigation()
  useEffect(() => {
    const handleFocus = () => {
      if (!isIos) {
        SoftInputMode.set(mode)
      }
    }
    const handleBlur = () => {
      if (!isIos) {
        SoftInputMode.set(defaultInputMode)
      }
    }
    const onFocus = addListener('focus', handleFocus)
    const onBlur = addListener('blur', handleBlur)
    return () => {
      onFocus()
      onBlur()
    }
  }, [addListener, mode])
}

export { SoftInputModes }
