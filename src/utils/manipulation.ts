export const fcast = <T = void>() => ({} as T)

export const keys = <T>(t: T): Array<keyof T> =>
  t && typeof t === 'object' ? (Object.keys(t) as any) : []
export const values = <T>(t: T) => keys(t || ({} as any as T)).map((k) => t[k])
export const entries = <T>(t: T): [keyof T, T[keyof T]][] =>
  keys(t || ({} as any as T)).map((k) => [k, t[k]])
