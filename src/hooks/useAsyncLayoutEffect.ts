import { DependencyList, useLayoutEffect } from 'react'

export const useAsyncLayoutEffect = (cb: () => Promise<any>, deps: DependencyList = []) =>
  useLayoutEffect(() => {
    cb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
