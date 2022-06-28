import { MutableRefObject, Ref, RefCallback, useEffect, useRef } from 'react'

const isCallbackRef = <T>(ref: Ref<T>): ref is RefCallback<T> =>
  ref !== null && typeof ref === 'function'
const isMutableRef = <T>(ref: Ref<T>): ref is MutableRefObject<T> =>
  ref !== null && typeof ref !== 'function' && 'current' in ref

export const useCombinedRefs = <T>(refs: Ref<T | null>[]) => {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return
      if (isCallbackRef(ref)) ref(targetRef.current)
      else if (isMutableRef(ref)) ref.current = targetRef.current
    })
  }, [refs])

  return targetRef
}
