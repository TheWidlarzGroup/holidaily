import { useState } from 'react'
import { isIos } from 'react-native-calendars/src/expandableCalendar/commons'
import { HandlerStateChangeEvent } from 'react-native-gesture-handler'

export const useRecognizeSwipe = (actionOnSwipe: F0) => {
  const [touchStart, setTouchStart] = useState(0)

  type NewType = HandlerStateChangeEvent<Record<string, any>>

  const onTouchStart = (e: NewType) => {
    setTouchStart(0)
    setTouchStart(e.nativeEvent.x)
  }

  const onTouchMove = (e: HandlerStateChangeEvent<Record<string, any>>) => {
    const touchMove = e.nativeEvent.x
    const minSwipeDistance = isIos ? 30 : 12
    if (touchMove - touchStart > minSwipeDistance) actionOnSwipe()
  }

  return { onTouchStart, onTouchMove }
}
