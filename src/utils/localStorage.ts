import AsyncStorage from '@react-native-async-storage/async-storage'

export type StorageKeys =
  | 'photo'
  | 'occupation'
  | 'lastName'
  | 'firstName'
  | 'userColor'
  | 'seenNotificationsIds'
  | 'language'
  | 'seenTeamsModal'
  | 'userSettings'
  | 'userId'
  | 'draftPost'
  | 'pickedCalendarDate'

type Callback = F1<Error | null | undefined>
type MultiCallback = F1<readonly (Error | null)[] | null | undefined>

// TODO: add withEncryption flag that enforces usage of expo secureStorage
// TODO: add more functions when neeeded
// These functions are type-secure and make sure that only valid keys are used
export const getItem = async (key: StorageKeys, cb?: Callback) => AsyncStorage.getItem(key, cb)
export const removeItem = async (key: StorageKeys, cb?: Callback) =>
  AsyncStorage.removeItem(key, cb)
export const setItem = async (key: StorageKeys, value: string, cb?: Callback) =>
  AsyncStorage.setItem(key, value, cb)
export const removeMany = async (keys: StorageKeys[], cb?: MultiCallback) =>
  AsyncStorage.multiRemove(keys, cb)
