import { useMemo, useState } from 'react'

type StateHandlers = {
  setTrue: () => void
  setFalse: () => void
  reset: () => void
  toggle: () => void
}
type UseBooleanState = [boolean, StateHandlers]

export const useBooleanState = (initialValue: boolean): UseBooleanState => {
  const [state, setState] = useState(initialValue)

  const handlers = useMemo(
    () => ({
      setFalse: () => setState(false),
      setTrue: () => setState(true),
      toggle: () => setState((prev) => !prev),
      reset: () => setState(initialValue),
    }),
    [initialValue]
  )

  return [state, handlers]
}
