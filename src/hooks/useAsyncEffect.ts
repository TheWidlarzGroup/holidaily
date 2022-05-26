import { useEffect } from 'react'

export const useAsyncEffect = (cb: () => Promise<any>, deps: React.DependencyList = []) =>
  useEffect(() => {
    cb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
