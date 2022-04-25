/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

/**
 * WIP
 * @param callback
 * @param delay
 * @param deps
 */
export const useDebouncedCallbackWithDeps = (callback: F0, delay?: number, deps?: any[]) => {
  let depsChanged = false

  useEffect(() => {
    depsChanged = true
  }, deps)

  useEffect(() => {
    if (!depsChanged) return
    if (!delay) return callback()
    const timeout = setTimeout(callback, delay)

    return () => clearTimeout(timeout)
  }, [callback, delay, depsChanged])
}

/**
 * Callback will fire when there is no re-render within specified time
 * @param callback Callback
 * @param delay Delay in ms
 */

export const useDebouncedCallback = (callback: F0, delay?: number) => {
  useEffect(() => {
    if (!delay) return callback()
    const timeout = setTimeout(callback, delay)

    return () => clearTimeout(timeout)
  }, [callback, delay])
}
