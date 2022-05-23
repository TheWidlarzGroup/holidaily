import { entries, keys } from './manipulation'

type NewRelicSimpleType = boolean | number | string

export const parseObjectToNewRelicSimpleType = <T extends Record<PropertyKey, unknown>>(obj: T) => {
  const pairs = entries(obj)
  const parsedObject: Record<PropertyKey, NewRelicSimpleType> = {}

  for (const [key, value] of pairs) {
    if (typeof value === 'boolean') parsedObject[key] = value.toString()
    else if (typeof value === 'string' || typeof value === 'number') parsedObject[key] = value
  }

  return parsedObject
}

export const makePrefixKeys = (obj: Record<string, unknown>, prefix = 'Holidaily_') => {
  const prefixedObject: Record<string, unknown> = {}
  keys(obj).forEach((key) => {
    const prefixedKey = prefix + key
    prefixedObject[prefixedKey] = obj[key]
  })
  return prefixedObject
}
