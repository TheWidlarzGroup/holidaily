export const checkIfPasswordsMatch = (password1: string, password2: string) => {
  if (password1?.length < 8 && password2?.length < 8) {
    return true
  }

  return password1 === password2
}
