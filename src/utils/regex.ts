export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const minOneSignRegex = /.{1,}$/i
export const minOneWordRegex = /^(\w+).+/i
export const minTwoWordsRegex = /^(\w+\s).+/i
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
export const noEmojiRegex =
  /^((?!(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])).)*$/i

export const minMaxSignsRegex = (min: number, max: number) => new RegExp(`^.{${min},${max}}$`, 'i')
