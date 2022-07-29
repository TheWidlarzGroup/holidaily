import { useCallback, useEffect, useRef } from 'react'

export const useMemoizedNonNullValue = <T>(
  valueToMemoize: T | null = null,
  fallbackValue = null
): [T | null, () => void] => {
  const nonNullValue = useRef<T | null>(fallbackValue)

  const resetMemoizedValue = useCallback(() => {
    nonNullValue.current = fallbackValue
  }, [fallbackValue])

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (true) {
      case Array.isArray(valueToMemoize):
        if ((valueToMemoize as unknown as Array<any>).length) {
          nonNullValue.current = valueToMemoize
        }
        break
      case !!valueToMemoize:
        nonNullValue.current = valueToMemoize
        break
    }
  }, [valueToMemoize])

  return [nonNullValue.current, resetMemoizedValue]
}
