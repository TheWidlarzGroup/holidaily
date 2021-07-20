import { useRef, useEffect } from 'react'

export const usePrevSelection = (selection: number | string) => {
  const ref = useRef<number | string | undefined>()
  useEffect(() => {
    ref.current = selection
  }, [selection])
  return ref.current
}
