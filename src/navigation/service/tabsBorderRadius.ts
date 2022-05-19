export const tabsBorderRadius = (p: {
  key: number
  side: 'left' | 'right'
  buttonIdx?: number
}) => {
  if (p.key === 0 && p.side === 'left') return 'm'
  if (p.key === 4 && p.side === 'right') return 'm'
  if (p.buttonIdx && p.key === p.buttonIdx + 1 && p.side === 'left') return 's'
  if (p.buttonIdx && p.key === p.buttonIdx - 1 && p.side === 'right') return 's'
  return undefined
}
