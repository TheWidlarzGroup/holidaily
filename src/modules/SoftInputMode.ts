import { NativeModules } from 'react-native'

const { SoftInputMode } = NativeModules

export enum SoftInputModes {
  ADJUST_NOTHING = SoftInputMode?.ADJUST_NOTHING,
  ADJUST_PAN = SoftInputMode?.ADJUST_PAN,
  ADJUST_RESIZE = SoftInputMode?.ADJUST_RESIZE,
}

export const defaultInputMode = SoftInputModes.ADJUST_PAN

export default NativeModules.SoftInputMode
