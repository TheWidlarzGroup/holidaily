import React from 'react'

const isCallbackRef = <T>(ref: React.Ref<T>): ref is React.RefCallback<T> =>
  ref !== null && typeof ref === 'function'
const isMutableRef = <T>(ref: React.Ref<T>): ref is React.MutableRefObject<T> =>
  ref !== null && typeof ref !== 'function' && 'current' in ref

export const useCombinedRefs = <T>(refs: React.Ref<T | null>[]) => {
  const targetRef = React.useRef<T>(null)

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return
      if (isCallbackRef(ref)) ref(targetRef.current)
      else if (isMutableRef(ref)) ref.current = targetRef.current
    })
  }, [refs])

  return targetRef
}
