export const generateUUID = () => {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ'
  const uuid = []
  for (let i = 0; i < 32; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)])
  }
  return uuid.join('')
}
